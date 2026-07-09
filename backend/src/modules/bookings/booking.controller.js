const bookingService = require('./booking.service');

const bookVenue = async (req,res,next)=>{
    try
    {
        
        const result = await bookingService.bookVenue(req.body,req.user.userId);
        return res.status(201).json(result);
    }
    catch(error)
    {
        next(error);
    }
    
} 

const getMyBookings  = async (req,res,next)=>{
    try
    {
        const { page, limit } = req.query;
        const result = await bookingService.getMyBookings(req.user.userId,page,limit);
        return res.status(200).json(result);
    } catch (error) 
    {
        next(error);
    }
}

const getBookingById  = async (req,res,next)=>{
    try
    {
        const id = req.params.id;
        const result = await bookingService.getBookingById(id,req.user);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const cancelBooking = async(req,res,next)=>{
    try
    {
        const result = await bookingService.cancelBooking(req.params.id,req.user);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const getBookingsByVenueId = async(req,res,next)=>{
    try
    {
        const { page, limit } = req.query;
        const result = await bookingService.getBookingsByVenueId(req.params.venueId,req.user,page,limit);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

module.exports={
    bookVenue,
    getMyBookings,
    getBookingById,
    cancelBooking,
    getBookingsByVenueId
}