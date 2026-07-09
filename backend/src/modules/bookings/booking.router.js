const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const bookingController = require('./booking.controller');

const router = express.Router();

router.post("/",authMiddleware,bookingController.bookVenue);

router.get("/my-bookings",authMiddleware,bookingController.getMyBookings);

router.get("/venue/:venueId",authMiddleware,bookingController.getBookingsByVenueId);

router.get("/:id",authMiddleware,bookingController.getBookingById);

router.patch("/:id/cancel",authMiddleware,bookingController.cancelBooking);




module.exports = router;