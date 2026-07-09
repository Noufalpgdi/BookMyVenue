const AppError = require('../../utils/AppError');
const prisma = require('../../config/prisma');
const { Prisma } = require('@prisma/client');
//const { useId } = require('react');

const MAX_RETRIES = 3;

const bookVenue = async (bookingDetails,userId)=>
{
    const {venueId,startTime,endTime} = bookingDetails;
    const normalizedVenueId = Number(venueId);
    if(!startTime || !endTime)
    {
        throw new AppError("Start time and end time are required",400);
    }
    const normalizedStartTime = new Date(startTime);
    const normalizedEndTime = new Date(endTime);
    if(!Number.isInteger(normalizedVenueId) || normalizedVenueId <= 0)
    {
        throw new AppError("Invalid venue id",400);
    }
    if(isNaN(normalizedStartTime.getTime()) || isNaN(normalizedEndTime.getTime()))
    {
        throw new AppError("Invalid start time or end time format",400);
    }
    const now = new Date();
    if(normalizedStartTime <= now)
    {
        throw new AppError("Start time must be in future",400);
    }
    if(normalizedStartTime >= normalizedEndTime)
    {
        throw new AppError("End time must be after start time",400);
    }
    let retryCount = 0;
    while (retryCount < MAX_RETRIES)
    {
        try
        {
            const booking = await prisma.$transaction(async(tx)=>{
            // Check Venue Exists
            const venue = await tx.venue.findFirst({
                where:
                {
                    id: normalizedVenueId,
                    approvalStatus: "APPROVED",
                    isActive: true,
                    isDeleted: false
                },
                select: {
                    id: true,
                    ownerId: true,
                    pricePerHour: true
                }
            });
            if(!venue)
            {
                throw new AppError( "Venue not found",404);
            }

            const conflictingBooking = await tx.booking.findFirst({
                where:
                {
                    venueId: normalizedVenueId,
                    isDeleted: false,
                    status:{
                            in:["PENDING","CONFIRMED"]
                    },
                    startTime:{
                        lt: normalizedEndTime
                    },

                    endTime:{
                        gt: normalizedStartTime
                    }
                }
            });
            if(conflictingBooking)
            {
                throw new AppError("The selected time slot is already booked",409);
            }

            // Calculate Duration
            const durationInMilliseconds = normalizedEndTime - normalizedStartTime;
            const durationInMinutes = durationInMilliseconds / (1000 * 60);
            
            if(durationInMinutes < 60)
            {
                throw new AppError("Minimum booking duration is 1 hour",400);
            }
           
            if(durationInMinutes % 60 !== 0)
            {
                throw new AppError("Booking duration must be in full hours",400);
            }
            const durationInHours = durationInMinutes / 60;
            // Calculate Total Amount
            const totalAmount = Number((durationInHours * Number(venue.pricePerHour)).toFixed(2));

            const isOwnerBooking = venue.ownerId === userId;
            const newBooking = await tx.booking.create({
            data:
            {
                venueId:normalizedVenueId,
                startTime:normalizedStartTime,
                endTime: normalizedEndTime,
                totalAmount:totalAmount,
                userId,
                isOwnerBooking
            },
            include:{
                venue:{
                    select:{
                        id: true,
                        pricePerHour:true
                    }
                }
            }
            });
                return newBooking; 
            },
            {
                isolationLevel:Prisma.TransactionIsolationLevel.Serializable
            });
            return{
                success:true,
                message:"Booking created successfully",
                booking
            }
        }
        catch(error)
        {
            // Prisma Serialization Failure
            //const isSerializationError = error.code === 'P2034';
            const isSerializationError = error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034';
            if (isSerializationError && retryCount < MAX_RETRIES - 1) 
            {
                retryCount++;
                await new Promise(
                    resolve => setTimeout(
                        resolve,
                        100 * retryCount
                    )
                );
                continue;
            }

            throw error;
        }
    }
    throw new AppError("Booking failed due to high concurrency. Please try again.",500);
    
}

const getMyBookings = async (userId,page = 1,limit = 10)=>{

    const normalizedPage = Number(page || 1);
    const normalizedLimit = Number(limit || 10);
    if (!Number.isInteger(normalizedPage) || normalizedPage <= 0)
    {
        throw new AppError("Invalid page number", 400);
    }

    if (!Number.isInteger(normalizedLimit) || normalizedLimit <= 0) 
    {
        throw new AppError("Invalid limit", 400);
    }

    if (normalizedLimit > 100) 
    {
        throw new AppError("Maximum limit is 100", 400);
    }
    const skip =(normalizedPage - 1) * normalizedLimit;

    const bookings = await prisma.booking.findMany({
        where: {
            userId,
            isDeleted: false
        },
        skip,
        take: normalizedLimit,
        select: {
            id: true,
            startTime: true,
            endTime: true,
            totalAmount: true,
            status: true,
            cancelledAt: true,
            isOwnerBooking: true,
            createdAt: true,
            updatedAt: true,
            venue: {
                select: {
                    id: true,
                    name: true,
                    city: true,
                    imageUrl: true
                }
            }
        },
        orderBy: {
            startTime: "desc"
        }
    });
    const totalRecords = await prisma.booking.count({
        where: 
        {
            userId,
            isDeleted: false
        }
    });

    const totalPages =Math.ceil(totalRecords / normalizedLimit);
    return{
        success: true,
        page: normalizedPage,
        limit: normalizedLimit,
        totalRecords,
        totalPages,
        count: bookings.length,
        bookings
    } 
}

const getBookingById = async (id,user)=>{
   const normalizedId = Number(id);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) 
    {
        throw new AppError(
            "Invalid booking id",
            400
        );
    }
    const booking = await prisma.booking.findFirst({
        where:{
            id:normalizedId,
            isDeleted: false
        },
        include:{
            venue:{
                select:{
                    id: true,
                    name: true,
                    city: true,
                    imageUrl: true,
                    ownerId: true
                }
            },
            user:{
                select:{
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    if (!booking) {
        throw new AppError(
            "Booking not found",
            404
        );
    }
    if (booking.userId !== user.userId && booking.venue.ownerId !== user.userId && user.role !== "ADMIN") 
    {
        throw new AppError(
            "Permission denied",
            403
        );
    }
    delete booking.venue.ownerId;
    return {
        success:true,
        booking
    }
}

const cancelBooking =async(id,user)=>{
    const normalizedId = Number(id);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) 
    {
        throw new AppError(
            "Invalid booking id",
            400
        );
    }
    const booking = await prisma.booking.findFirst({
        where:{
            id:normalizedId,
            isDeleted: false
        },
        include:{
            venue:{
                select:{
                    id: true,
                    ownerId: true
                }
            }
        }
    });
    if (!booking) 
    {
        throw new AppError(
            "Booking not found",
            404
        );
    }
    if (booking.userId !== user.userId && booking.venue.ownerId !== user.userId && user.role !== "ADMIN") 
    {
        throw new AppError(
            "Permission denied",
            403
        );
    }
    if (booking.status === "CANCELLED") 
    {
        throw new AppError(
            "Booking already cancelled",
            409
        );
    }
    if (booking.status === "COMPLETED") 
    {
        throw new AppError(
            "Completed bookings cannot be cancelled",
            409
        );
    }
    if (booking.startTime <= new Date()) 
    {
        throw new AppError(
            "Booking cannot be cancelled after it has started",
            409
        );
    }
    const updatedBooking = await prisma.booking.update({
        where: {
            id: normalizedId
        },
        data: {
            status: "CANCELLED",
            cancelledAt: new Date()
        },
        include:{
            venue:{
                select:{
                    id: true,
                    name: true,
                    city: true,
                    imageUrl: true
                }
            }
        }
    });

    return {
        success: true,
        message: "Booking cancelled successfully",
        booking: updatedBooking
    };

}

const getBookingsByVenueId =async (venueId,user,page = 1,limit = 10)=>{
    const normalizedVenueId = Number(venueId);
    if (!Number.isInteger(normalizedVenueId) || normalizedVenueId <= 0) 
    {
        throw new AppError(
            "Invalid venue id",
            400
        );
    }
    const normalizedPage = Number(page || 1);
    const normalizedLimit = Number(limit || 10);
    if (!Number.isInteger(normalizedPage) || normalizedPage <= 0)
    {
        throw new AppError("Invalid page number", 400);
    }

    if (!Number.isInteger(normalizedLimit) || normalizedLimit <= 0) 
    {
        throw new AppError("Invalid limit", 400);
    }

    if (normalizedLimit > 100) 
    {
        throw new AppError("Maximum limit is 100", 400);
    }
    const skip =(normalizedPage - 1) * normalizedLimit;
    const venue = await prisma.venue.findFirst({
        where: {
            id: normalizedVenueId,
            isDeleted: false
        },
        select: {
            ownerId: true
        }
    });
    if (!venue)
    {
        throw new AppError(
            "Venue not found",
            404
        );
    }
    if (venue.ownerId !== user.userId && user.role !== "ADMIN")
    {
        throw new AppError(
            "Permission denied",
            403
        );
    }
    const bookings = await prisma.booking.findMany({
        where: {
            venueId: normalizedVenueId,
            isDeleted: false
        },
        skip,
        take: normalizedLimit,
        select:{
            id: true,
            startTime: true,
            endTime: true,
            totalAmount: true,
            status: true,
            cancelledAt: true,
            isOwnerBooking: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
        },
        orderBy: {
            startTime: "desc"
        }
    });
    const totalRecords = await prisma.booking.count({
        where: {
            venueId: normalizedVenueId,
            isDeleted: false
        }
    });

    const totalPages = Math.ceil( totalRecords / normalizedLimit );
    return {
        success: true,
        page: normalizedPage,
        limit: normalizedLimit,
        totalRecords,
        totalPages,
        count: bookings.length,
        bookings
    };
}
module.exports={
    bookVenue,
    getMyBookings,
    getBookingById,
    cancelBooking,
    getBookingsByVenueId
}