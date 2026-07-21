const { VenueType,VenueApprovalStatus } = require("@prisma/client");
const prisma = require('../../config/prisma');
const AppError = require('../../utils/AppError');
const {validateStringField} = require('../../utils/validators');


const create = async (venueDetails,userId,file)=>{
    const {
        name,
        description,
        address,
        city,
        district,
        state,
        latitude,
        longitude,
        capacity,
        pricePerHour,
        venueType,
        amenities
    } = venueDetails;

    const ownerId = userId;
    const normalizedName = name?.trim();
    const normalizedDescription = description?.trim();
    const normalizedAddress = address?.trim();
    const normalizedCity = city?.trim();
    const normalizedDistrict = district?.trim();
    const normalizedState = state?.trim();
    const normalizedCapacity = Number(capacity);
    const normalizedPrice = Number(pricePerHour);
    const normalizedLatitude = latitude !== undefined && latitude !== null ? Number(latitude): null;
    
    const normalizedVenueType = venueType?.trim()?.toUpperCase();
    const normalizedLongitude = longitude !== undefined && longitude !== null ? Number(longitude): null;
    
    const normalizedAmenities = Array.isArray(amenities)
    ? amenities
        .filter(a => typeof a === "string")
        .map(a => a.trim())
        .filter(Boolean)
    : [];
    
    if(!normalizedName || !normalizedDescription || !normalizedAddress || !normalizedCity || !normalizedDistrict ||
    !normalizedState || !normalizedVenueType || capacity == null || capacity === "" || pricePerHour == null || pricePerHour === "")
    {
        throw new AppError("Please fill all the required fields",400);
    }
    if(!Object.values(VenueType).includes(normalizedVenueType))
    {
        throw new AppError(
            "Invalid venue type",
            400
        );
    }
    if((normalizedLatitude === null && normalizedLongitude !== null) || (normalizedLatitude !== null && normalizedLongitude === null))
    {
        throw new AppError(
            "Latitude and longitude must be provided together",
            400
        );
    }
    if(!Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
    {
        throw new AppError("Invalid capacity",400);
    }
    if (isNaN(normalizedPrice) || normalizedPrice <= 0)
    {
        throw new AppError(
            "Invalid price per hour",
            400
        );
    }
    if(normalizedLatitude !== null && (isNaN(normalizedLatitude) || normalizedLatitude < -90 || normalizedLatitude > 90))
    {
        throw new AppError(
            "Invalid latitude",
            400
        );
    }

    if(normalizedLongitude !== null && (isNaN(normalizedLongitude) || normalizedLongitude < -180 || normalizedLongitude > 180))
    {
        throw new AppError(
            "Invalid longitude",
            400
        );
    }
    if(normalizedAmenities.length === 0)
    {
        throw new AppError(
            "At least one amenity is required",
            400
        );
    }
    if(!file)
    {
        throw new AppError(
            "Venue image is required",
            400
        );
    }
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const imageUrl = `${baseUrl}/uploads/venues/${file.filename}`;
    const newVenue = await prisma.venue.create({
        data:{
            name:normalizedName,
            description:normalizedDescription,
            address:normalizedAddress,
            city:normalizedCity,
            district: normalizedDistrict,
            state: normalizedState,
            latitude: normalizedLatitude,
            longitude: normalizedLongitude,
            capacity:normalizedCapacity,
            pricePerHour: normalizedPrice,
            venueType: normalizedVenueType,
            amenities: normalizedAmenities,
            imageUrl,
            ownerId
        },
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            latitude: true,
            longitude: true,
            venueType: true,
            amenities: true,
            imageUrl: true,
            approvalStatus: true,
            createdAt: true
        }
    });
    return {
            "success":true,
            "message":"Venue submitted successfully and is pending admin approval",
            "venue":newVenue
        }

}

const getAll = async (query)=>{
    const { city, district, state, name, capacity, venueType, page = 1, limit = 10} = query;
    const where = {
        approvalStatus: "APPROVED",
        isActive: true,
        isDeleted: false
    };
    if (venueType?.trim())
    {
        const normalizedVenueType =
            venueType.trim().toUpperCase();

        if(!Object.values(VenueType).includes(normalizedVenueType))
        {
            throw new AppError(
                "Invalid venue type",
                400
            );
        }

        where.venueType = normalizedVenueType;
    }
    if(city?.trim())
    {
        where.city = {
            equals: city.trim(),
            mode:"insensitive"
        };
    }
    if(district?.trim())
    {
        where.district = {
            equals: district.trim(),
            mode: "insensitive"
        };
    }
    if(state?.trim())
    {
        where.state = {
            equals: state.trim(),
            mode: "insensitive"
        };
    }
    // Name Filter
    if(name?.trim())
    {
        where.name = {
            contains: name.trim(),
            mode:"insensitive"
        };
    }
    // Capacity Filter
    if(capacity !== undefined && capacity !== "")
    {
        const normalizedCapacity=Number(capacity);
        if(!Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
        {
            throw new AppError("Invalid capacity",400);
        }
        where.capacity={
            gte:normalizedCapacity
        };
    }

    const normalizedPage = Number(page);
    const normalizedLimit = Number(limit);
    if (!Number.isInteger(normalizedPage) || normalizedPage <= 0) 
    {
        throw new AppError(
            "Invalid page number",
            400
        );
    }
    if (!Number.isInteger(normalizedLimit) || normalizedLimit <= 0)
    {
        throw new AppError(
            "Invalid limit",
            400
        );
    }
    if(normalizedLimit > 100)
    {
        throw new AppError(
            "Maximum limit is 100",
            400
        );
    }
    const skip = (normalizedPage - 1) * normalizedLimit;
    const venues  = await prisma.venue.findMany(
        {
            where,
            skip,
            take: normalizedLimit,
            select:{
                id: true,
                name: true,
                description: true,
                city: true,
                district: true,
                state: true,
                capacity: true,
                pricePerHour: true,
                imageUrl: true,
                venueType: true,
                amenities: true,
                latitude: true,
                longitude: true,
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
            createdAt: "desc"
            }
        }
    );
    const totalRecords =
    await prisma.venue.count({
        where
    });

    const totalPages =
        Math.ceil(
            totalRecords /
            normalizedLimit
        );
    return {
        success: true,
        page: normalizedPage,
        limit: normalizedLimit,
        totalRecords,
        totalPages,
        count: venues.length,
        venues
    };
}

const getFilters = async ()=>
{
    const stateRecords = await prisma.venue.findMany({
        where:{
            approvalStatus:VenueApprovalStatus.APPROVED,
            isDeleted: false
        },
        select:{
            state:true
        },
        distinct: ["state"],
        orderBy: {
            state: "asc"
        }
    });
    const states = stateRecords.map(item => item.state);
    const venueTypes = Object.values(VenueType);
    return{
        success:true,
        filters: {
            states,
            venueTypes
        }
    }
}

const getMyVenues = async(ownerId,query)=>{
    const {page = 1, limit = 10}=query;
    const normalizedPage = Number(page);
    const normalizedLimit = Number(limit);
    if (!Number.isInteger(normalizedPage) || normalizedPage <= 0) 
    {
        throw new AppError(
            "Invalid page number",
            400
        );
    }
    if (!Number.isInteger(normalizedLimit) || normalizedLimit <= 0)
    {
        throw new AppError(
            "Invalid limit",
            400
        );
    }
    if(normalizedLimit > 100)
    {
        throw new AppError(
            "Maximum limit is 100",
            400
        );
    }
    const skip = (normalizedPage - 1) * normalizedLimit;
    const where = {ownerId};
    const venues = await prisma.venue.findMany({
        where,
        skip,
        take: normalizedLimit,
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            approvalStatus: true,
            isActive: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    bookings: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const totalRecords = await prisma.venue.count({where});
    const totalPages =Math.ceil(totalRecords / normalizedLimit);
    return{
        success:true,
        page: normalizedPage,
        limit: normalizedLimit,
        totalRecords,
        totalPages,
        count:venues.length,
        venues
    }
}

const getById = async (id)=>
{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError(
            "Invalid venue id",
            400
        );
    }
    const venue = await prisma.venue.findFirst({
        where:{ 
            id:normalizedId,
            approvalStatus: "APPROVED",
            isActive: true,
            isDeleted: false
        },
        select:{
            id: true,
            name: true,
            description: true,
            address: true,
            city: true,
            district: true,
            state: true,
            latitude: true,
            longitude: true,
            capacity: true,
            pricePerHour: true,
            imageUrl: true,
            venueType: true,
            amenities: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    bookings: true
                }
            },
            owner:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    });
    if(!venue){
        throw new AppError("Venue not found",404)
    }

    return {
        success:true,
        venue
    };
}

const getAllPendingApprovalVenues = async(page = 1,limit = 10)=>{
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
    const venues = await prisma.venue.findMany({
        where:{
            approvalStatus:"PENDING"
        },
        skip,
        take: normalizedLimit,
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            imageUrl: true,
            amenities: true,
            approvalStatus: true,
            ownerId: true,
            owner:{
                select:{
                     id: true,
                    name: true,
                    email: true
                }
            },
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const totalRecords = await prisma.venue.count({
        where: {
            approvalStatus: "PENDING"
        }
    });

    const totalPages = Math.ceil( totalRecords / normalizedLimit );
    return {
        success: true,
        page: normalizedPage,
        limit: normalizedLimit,
        totalRecords,
        totalPages,
        count: venues.length,
        venues
    };
}

const approveVenue = async(id)=>{
    const normalizedId=Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError("Invalid venue id",400);
    }
    const venue = await prisma.venue.findUnique({
        where:{
            id:normalizedId
        }
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.approvalStatus === "APPROVED")
    {
        throw new AppError(
            "Venue already approved",
            409
        );
    }
    if (venue.approvalStatus === "REJECTED")
    {
        throw new AppError(
            "Rejected venue cannot be approved",
            409
        );
    }
    const approvedVenue = await prisma.venue.update({
        where:{
            id:normalizedId
        },
        data:{
            approvalStatus:"APPROVED"
        },
        select:
        {
            id: true,
            name: true,
            approvalStatus: true,
            ownerId: true,
            updatedAt: true
        }
    });
    return{
        success:true,
        message:"Venue approved successful",
        venue:approvedVenue
    }
}


const rejectVenue = async(id)=>{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError(
            "Invalid venue id",
            400
        );
    }
    const venue = await prisma.venue.findUnique({
        where:{
            id:normalizedId
        }
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404)
    }
    if(venue.approvalStatus==="APPROVED")
    {
        throw new AppError(
            "Approved venue cannot be rejected",
            409
        );
    }
    if(venue.approvalStatus==="REJECTED")
    {
        throw new AppError(
            "Venue already rejected",
            409
        );
    }
    const rejectedVenue = await prisma.venue.update({
        where:{
            id:normalizedId
        },
        data:{
            approvalStatus:"REJECTED"
        },
        select:
        {
            id: true,
            name: true,
            approvalStatus: true,
            ownerId: true,
            updatedAt: true
        }
    });
    return{
        success:true,
        message:"Venue rejected successfully",
        venue:rejectedVenue
    }
}
const updateVenue = async (id,user,venueDetails,image)=>{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError("Invalid venue id",400);
    }
    const venue = await prisma.venue.findFirst({
        where:{
            id:normalizedId,
            isDeleted:false
        }
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    //const {name,description,address,city,capacity,pricePerHour} = venueDetails;
    const {
        name,
        description,
        address,
        city,
        district,
        state,
        latitude,
        longitude,
        capacity,
        pricePerHour,
        venueType,
        amenities
    } = venueDetails;
    const updateData = {};
    if(image)
    {
        updateData.imageUrl = image.path;
    }
    if(name!==undefined)
    {
        updateData.name = validateStringField(name,"Name");
    }
    if(description!==undefined)
    {
        updateData.description = validateStringField(description,"Description");
    }
    if(address!==undefined)
    {
        updateData.address = validateStringField(address,"Address");
    }
    if(city!==undefined)
    {
        updateData.city = validateStringField(city,"City");
    }
    if(district !== undefined)
    {
        updateData.district = validateStringField(
            district,
            "District"
        );
    }
    if(state !== undefined)
    {
        updateData.state = validateStringField(
            state,
            "State"
        );
    }
    const isLatitudeProvided = latitude !== undefined && latitude !== null;
    const isLongitudeProvided = longitude !== undefined && longitude !== null;

    if(isLatitudeProvided !== isLongitudeProvided)
    {
        throw new AppError("Latitude and longitude must be provided together",400);
    }
    if(isLatitudeProvided)
    {
        const normalizedLatitude = Number(latitude);

        if(isNaN(normalizedLatitude) || normalizedLatitude < -90 || normalizedLatitude > 90)
        {
            throw new AppError(
                "Invalid latitude",
                400
            );
        }

        updateData.latitude = normalizedLatitude;
    }

    if(isLongitudeProvided)
    {
        const normalizedLongitude = Number(longitude);

        if(isNaN(normalizedLongitude) || normalizedLongitude < -180 || normalizedLongitude > 180)
        {
            throw new AppError(
                "Invalid longitude",
                400
            );
        }

        updateData.longitude = normalizedLongitude;
    }
    if(venueType !== undefined)
    {
        if(typeof venueType !== "string")
        {
            throw new AppError(
                "Invalid venue type",
                400
            );
        }

        const normalizedVenueType = venueType.trim().toUpperCase();

        if(
            !Object.values(VenueType)
                .includes(normalizedVenueType)
        )
        {
            throw new AppError(
                "Invalid venue type",
                400
            );
        }

        updateData.venueType =
            normalizedVenueType;
    }
    if(amenities !== undefined)
    {
        if(!Array.isArray(amenities))
        {
            throw new AppError(
                "Amenities should be an array",
                400
            );
        }

        const normalizedAmenities =
            amenities
                .filter(
                    a => typeof a === "string"
                )
                .map(
                    a => a.trim()
                )
                .filter(Boolean);

        if(normalizedAmenities.length === 0)
        {
            throw new AppError(
                "At least one amenity is required",
                400
            );
        }

        updateData.amenities = normalizedAmenities;
    }
    if(capacity !== undefined){
        const normalizedCapacity = Number(capacity);
        if(!Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
        {
            throw new AppError("Invalid capacity",400);
        }
        updateData.capacity = normalizedCapacity;
    }
    if(pricePerHour !==undefined)
    {
        const normalizedPricePerHour = Number(pricePerHour);
        if(isNaN(normalizedPricePerHour) || normalizedPricePerHour <= 0)
        {
            throw new AppError("Invalid price per hour",400);
        }
        updateData.pricePerHour = normalizedPricePerHour;
    }
    if(Object.keys(updateData).length === 0)
    {
        throw new AppError("No fields provided for update",400)
    }
    if(user.role === "OWNER" && venue.approvalStatus === "APPROVED")
    {
        updateData.approvalStatus = "PENDING";
    }
    const updatedVenue  = await prisma.venue.update({
        where:{ 
            id:normalizedId
        },
        data:updateData,
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            isActive: true,
            approvalStatus: true,
            updatedAt: true
        }
    });
    const message =
    updateData.approvalStatus === "PENDING"
        ? "Venue updated successfully and submitted for re-approval"
        : "Venue updated successfully";
    return {
            success:true,
            message,
            venue:updatedVenue
     }
    
}

const deleteVenue = async (id,user)=>{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError("Invalid venue id",400);
    }
    const venue = await prisma.venue.findUnique({
    where:{id:normalizedId}
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    if(venue.isDeleted)
    {
        throw new AppError("Venue is already deleted",409);
    }
    const bookingCount = await prisma.booking.count({
        where:{
            venueId: normalizedId
        }
    });

    if(bookingCount > 0)
    {
        throw new AppError(
            "Cannot delete venue with existing bookings",
            409
        );
    }
    const deletedVenue = await prisma.venue.update({
        where:{
            id:normalizedId
        },
        data:{
            isDeleted: true,
            isActive: false
        },
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            isActive: true,
            isDeleted: true,
            approvalStatus: true,
            updatedAt: true
        }
    });
    return {
        success:true,
        message:"Venue deleted successfully",
        venue:deletedVenue
    }
}

const activate = async(id,user)=>{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError("Invalid venue id",400);
    }
    const venue = await prisma.venue.findUnique({
        where:{
            id:normalizedId
        }
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    if(venue.isActive)
    {
        throw new AppError(
            "Venue is already active",
            409
        );
    }
    const activatedVenue = await prisma.venue.update({
        where:{
            id: normalizedId
        },
        data:{
            isActive: true
        },
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            isActive: true,
            approvalStatus: true,
            updatedAt: true
        }
    });
    return {
            success:true,
            message:"Venue activated successfully",
            venue:activatedVenue
     }
}

const deactivate = async(id,user)=>{
    const normalizedId = Number(id);
    if(!Number.isInteger(normalizedId) || normalizedId<=0)
    {
        throw new AppError("Invalid venue id",400);
    }
    const venue = await prisma.venue.findUnique({
        where:{
            id:normalizedId
        }
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    if(!venue.isActive)
    {
        throw new AppError(
           "Venue is already inactive",
            409
        );
    }
    const deactivatedVenue = await prisma.venue.update({
        where:{
            id: normalizedId
        },
        data:{
            isActive: false
        },
        select:{
            id: true,
            name: true,
            city: true,
            district: true,
            state: true,
            venueType: true,
            capacity: true,
            pricePerHour: true,
            isActive: true,
            approvalStatus: true,
            updatedAt: true
        }
    });
    return {
            success:true,
            message:"Venue deactivated successfully",
            venue:deactivatedVenue
     }
}

module.exports={
    create,
    getAll,
    getFilters,
    getMyVenues,
    getById,
    getAllPendingApprovalVenues,
    approveVenue,
    rejectVenue,
    updateVenue,
    deleteVenue,
    activate,
    deactivate
}