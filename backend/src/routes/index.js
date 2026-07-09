const express = require('express');
const authRouter = require('../modules/auth/auth.router');
const venueRouter = require('../modules/venue/venue.router');
const bookingRouter = require('../modules/bookings/booking.router');

const router=express.Router();

router.use("/auth",authRouter);
router.use("/venue",venueRouter);
router.use("/bookings",bookingRouter);

module.exports=router;