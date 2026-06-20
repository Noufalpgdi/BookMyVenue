const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const bookingController = require('./booking.controller');

const router = express.Router();

router.post("/",authMiddleware,bookingController.bookVenue);

module.exports = router;