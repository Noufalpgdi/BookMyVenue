const prisma = require('../../config/prisma');

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
    
    if(!normalizedName || !normalizedDescription || !normalizedAddress || !normalizedCity ||  !Number.isInteger(normalizedCapacity) || normalizedCapacity <= 0)
    {
        return {
            success:false,
            message:"Please Fill all the required field"
        }
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
            "venue":{
                "id":newVenue.id,
                "name":newVenue.name,
                "address":newVenue.address,
                "city":newVenue.city,
                "ownerId":newVenue.ownerId,
                "capacity":newVenue.capacity
            }
        }

}

const getAll = async ()=>{
    const venues  = await prisma.venue.findMany();
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
        return {
            success:false,
            message:"Venue not found"
        };
    }

    return {
        success:true,
        venue
    };
}

module.exports={
    create,
    getAll,
    getById
}