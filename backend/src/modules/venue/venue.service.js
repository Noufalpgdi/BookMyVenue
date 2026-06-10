const prisma = require('../../config/prisma');
const AppError = require('../../utils/AppError');
const {validateStringField} = require('../../utils/validators');
const { get } = require('./venue.router');


const create = async (venueDetails,userId)=>{
    const {
        name,
        description,
        address,
        city,
        capacity
    } = venueDetails;

    const ownerId = userId;
    const normalizedName = name?.trim();
    const normalizedDescription = description?.trim();
    const normalizedAddress = address?.trim();
    const normalizedCity = city?.trim();
    const normalizedCapacity = Number(capacity);
    
    if(!normalizedName || !normalizedDescription || !normalizedAddress || !normalizedCity )
    {
        throw new AppError("Please fill all the required fields",400);
    }
    if(!Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
    {
        throw new AppError("Invalid capacity",400);
    }
    const newVenue = await prisma.venue.create({
        data:{
            name:normalizedName,
            description:normalizedDescription,
            address:normalizedAddress,
            city:normalizedCity,
            capacity:normalizedCapacity,
            ownerId
        }
    });
    return {
            "success":true,
            "message":"Venue created successfully",
            "venue":newVenue
        }

}

const getAll = async (query)=>{
    const { city, name, capacity } = query;
    const where = {};
    if(city?.trim())
    {
        where.city = {
            equals: city.trim(),
            mode:"insensitive"
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
    if(capacity !== undefined)
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
    const venues  = await prisma.venue.findMany({where});
    return{
        success:true,
        count:venues.length,
        venues 
    }
}

const getById = async (id)=>
{
    
    const venue = await prisma.venue.findUnique({
        where:{
            id
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

const updateVenue = async (id,user,venueDetails)=>{
    const venue = await prisma.venue.findUnique({
        where:{id}
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    const {name,description,address,city,capacity} = venueDetails;
    const updateData = {};
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
        updateData.city = validateStringField(city,"City")
    }
    if(capacity !== undefined){
        const normalizedCapacity = Number(capacity);
        if(!Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
        {
            throw new AppError("Invalid capacity",400);
        }
        updateData.capacity = normalizedCapacity;
    }
    if(Object.keys(updateData).length === 0)
    {
        throw new AppError("No fields provided for update",400)
    }
    const updatedVenue  = await prisma.venue.update({
        where:{ id },
        data:updateData
    });
    return {
            success:true,
            message:"Venue update successful",
            venue:updatedVenue
     }
    
}

const deleteVenue = async (id,user)=>{
    const venue = await prisma.venue.findUnique({
    where:{id}
    });
    if(!venue)
    {
        throw new AppError("Venue not found",404);
    }
    if(venue.ownerId !== user.userId && user.role !=="ADMIN")
    {
        throw new AppError("Permission denied",403);
    }
    const deletedVenue = await prisma.venue.delete({
        where:{id}
    });
    return {
        success:true,
        message:"Venue deleted successful"
    }
}

module.exports={
    create,
    getAll,
    getById,
    updateVenue,
    deleteVenue
}