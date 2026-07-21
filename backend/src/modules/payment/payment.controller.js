const paymentService = require('./payment.service');
const createOrder =async (req,res,next)=>{
    try
    {
        const result = await paymentService.createOrder(req.body,req.user.userId);
        return res.status(201).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const verifyPayment = async (req,res,next)=>
{
    try
    {
        const result = await paymentService.verifyPayment(req.body,req.user.userId);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}

const webhook = async (req,res,next)=>
{
    try
    {
        const signature = req.headers["x-razorpay-signature"];
        const result = await paymentService.webhook(req.body, signature, req.rawBody);
        return res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
    }
}
module.exports = {
    createOrder,
    verifyPayment,
    webhook
}