const AppError = require('../../utils/AppError');
const prisma = require('../../config/prisma');
const { Prisma } = require('@prisma/client');

const MAX_RETRIES = 3;

const bookVenue = async (bookingDetails,userId)=>
{
    const {venueId,startTime,endTime} = bookingDetails;
    const normalizedVenueId = Number(venueId);
    const normalizedStartTime = new Date(startTime);
    const normalizedEndTime = new Date(endTime);
    if(!Number.isInteger(normalizedVenueId) || normalizedVenueId <= 0)
    {
        throw new AppError("Invalid venue id",400);
    }
    if(isNaN(normalizedStartTime.getTime()) || isNaN(normalizedEndTime.getTime()))
    {
        throw new AppError("Invalid date",400);
    }
    const now = new Date();
    if(normalizedStartTime < now)
    {
        throw new AppError("Start time must be in future",400);
    }
    if(normalizedStartTime >= normalizedEndTime)
    {
        throw new AppError("Start time must be less than end time",400);
    }
    let retryCount = 0;
    while (retryCount < MAX_RETRIES)
    {
        try
        {
            const booking = await prisma.$transaction(async(tx)=>{
            // Check Venue Exists
            const venue = await tx.venue.findUnique({
                where:
                {
                    id: normalizedVenueId
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
                throw new AppError("Venue already booked",400);
            }

            // Calculate Duration
            const durationInMilliseconds = normalizedEndTime - normalizedStartTime;
            const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
            // Calculate Total Amount
            const totalAmount = Number((durationInHours * Number(venue.pricePerHour)).toFixed(2));

            const newBooking = await tx.booking.create({
            data:
            {
                venueId:normalizedVenueId,
                startTime:normalizedStartTime,
                endTime: normalizedEndTime,
                totalAmount:totalAmount,
                userId
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
module.exports={
    bookVenue
}