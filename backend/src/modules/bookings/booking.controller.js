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

module.exports={
    bookVenue
}