const crypto = require("crypto");
const prisma = require('../../config/prisma');
const razorpay = require('../../config/razorpay');


const { PaymentProvider, BookingStatus, PaymentStatus } = require("@prisma/client");

const AppError = require('../../utils/AppError');

async function markPaymentSuccessful(tx, bookingId, providerPaymentId) {
    // Update payment
    await tx.payment.update({
        where: {
            bookingId
        },
        data: {
            status: PaymentStatus.SUCCESS,
            providerPaymentId,
            transactionId: providerPaymentId
        }
    });
    // Update booking
    await tx.booking.update({
        where: {
            id: bookingId
        },
        data: {
            status: BookingStatus.CONFIRMED
        }
    });
}
function validateSignature(secretKey,body,signature)
{
    const generatedSignature = crypto.createHmac("sha256",secretKey).update(body).digest("hex");
    //verify the signature
    const generatedBuffer = Buffer.from(generatedSignature, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");
    if (generatedBuffer.length !== receivedBuffer.length) 
    {
        throw new AppError("Invalid payment signature", 400);
    }
    const isValid = crypto.timingSafeEqual(
        generatedBuffer,
        receivedBuffer
    );
    if(!isValid)
    {
        throw new AppError("Invalid payment signature", 400);
    }
}
const createOrder = async (bookingDetails,userId)=>{
    const {bookingId} = bookingDetails;
    const normalizedBookingId = Number(bookingId);
    if(!Number.isInteger(normalizedBookingId) || normalizedBookingId<=0)
    {
        throw new AppError("Invalid bookingId",400);
    }
    const booking = await prisma.booking.findUnique({
        where:{
            id: normalizedBookingId
        },
        include:{
            payment:true
        }
    });
    if(!booking)
    {
        throw new AppError("booking not found",404);
    }
    if(booking.userId!==userId)
    {
        throw new AppError("permission denied",403);
    }
    if(booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.COMPLETED)
    {
        throw new AppError("Payment has already been completed for this booking",409);
    }
    if(booking.status === BookingStatus.CANCELLED)
    {
        throw new AppError("Booking is already canceled",409);
    }
    const payment = booking.payment;
    if(!payment)
    {
        throw new AppError("Payment record not found",500);
    }
    const amountInPaise = Number(payment.amount) * 100;
    if(payment.providerOrderId)
    {
        return {
            success: true,
            key: process.env.RAZORPAY_KEY_ID,
            orderId: payment.providerOrderId,
            amount: amountInPaise,
            currency: payment.currency
        };
    }
    if(payment.status === PaymentStatus.REFUNDED)
    {
        throw new AppError("Payment has already been refunded",409);
    }
    //create new razorpay order
    let order;
    try
    {
        order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: payment.currency,
            receipt: `booking_${booking.id}`
        });
    }
    catch(error)
    {
        console.error("Razorpay create order failed", {
            bookingId: normalizedBookingId,
            error
        });
        throw new AppError(
            "Unable to create payment order. Please try again later.",
            502
        );
    }
    
    await prisma.payment.update({
        where:{
            bookingId:normalizedBookingId
        },
        data: {
            providerOrderId: order.id,
            provider: PaymentProvider.RAZORPAY
        }
    });
    return{
        success: true,
        key: process.env.RAZORPAY_KEY_ID,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
    };
}

const verifyPayment =async (paymentDetails,userId)=>
{
    const {bookingId,razorpay_order_id,razorpay_payment_id,razorpay_signature} = paymentDetails;
    const normalizedBookingId = Number(bookingId);
    if(!Number.isInteger(normalizedBookingId) || normalizedBookingId<=0)
    {
        throw new AppError("Invalid bookingId",400);
    }
    if(!razorpay_order_id)
    {
        throw new AppError("razorpay_order_id is required",400);
    }
    if(!razorpay_payment_id)
    {
        throw new AppError("razorpay_payment_id is required",400);
    }
    if(!razorpay_signature)
    {
        throw new AppError("razorpay_signature is required",400);
    }
    const booking = await prisma.booking.findUnique({
        where:{
            id: normalizedBookingId
        },
        include:{
            payment:true
        }
    });
    if(!booking)
    {
        throw new AppError("Booking not found",404);
    }
    if(booking.userId!==userId)
    {
        throw new AppError("Permission denied",403);
    }
    if(booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.COMPLETED)
    {
        throw new AppError("Payment has already been completed for this booking",409);
    }
    if(booking.status === BookingStatus.CANCELLED)
    {
        throw new AppError("Booking is already canceled",409);
    }
    const payment = booking.payment;
    if(!payment)
    {
        throw new AppError("Payment record not found",500);
    }
    if(payment.providerOrderId !== razorpay_order_id)
    {
        throw new AppError("Invalid razorpay_order_id",400);
    }
    if(payment.status === PaymentStatus.REFUNDED)
    {
        throw new AppError("Payment has already been refunded",409);
    }
    if(payment.status===PaymentStatus.SUCCESS)
    {
        throw new AppError("Payment has already been completed",409);
    }
    //generate signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    validateSignature(process.env.RAZORPAY_KEY_SECRET,body,razorpay_signature);
    //update database
    try
    {
        await prisma.$transaction(async (tx) => {
            await markPaymentSuccessful(tx,normalizedBookingId,razorpay_payment_id);
        });
    }
    catch(error)
    {
        console.error(
            "Payment verification failed",
            {
                bookingId: normalizedBookingId,
                razorpay_order_id,
                razorpay_payment_id,
                error
            }
        );
        throw new AppError("Failed to verify payment",500);
    }
    
    return{
        success: true,
        message:"Payment verified successfully"
    };

}

const webhook = async (webhookData, signature, rawBody)=>
{
    validateSignature(process.env.RAZORPAY_WEBHOOK_SECRET,rawBody,signature);
    if (webhookData.event !== "payment.captured") {
        // Ignore this event
        return {
            success: true,
            message: "Event ignored"
        };
    }
    const paymentEntity = webhookData.payload.payment.entity;

    const {
        id: providerPaymentId,
        order_id: providerOrderId
    } = paymentEntity;

    const payment = await prisma.payment.findUnique({
        where:{
            providerOrderId
        }
    });
    if(!payment)
    {
        return {
            success:true,
            message:"Payment record not found"
        };
    }
    if(payment.status === PaymentStatus.REFUNDED)
    {
        return{
            success: true,
            message:"Payment has already been refunded"
        };
    }
    if(payment.status===PaymentStatus.SUCCESS)
    {
        return{
            success: true,
            message:"Payment already processed"
        };
    }
    //update database
    try
    {
        await prisma.$transaction(async (tx) => {
            await markPaymentSuccessful(tx,payment.bookingId,providerPaymentId);
        });
    }
    catch(error)
    {
        console.error(
            "Webhook processing failed",
            {
                providerOrderId,
                providerPaymentId,
                error
            }
        );
        throw new AppError("Failed to process webhook",500);
    }
    
    return{
        success: true,
        message:"Webhook processed successfully"
    };
}
module.exports={
    createOrder,
    verifyPayment,
    webhook
}