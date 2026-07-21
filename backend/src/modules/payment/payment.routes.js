const express = require('express');
const paymentController = require("./payment.controller");
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.post("/create-order",authMiddleware,paymentController.createOrder);

router.post("/verify",authMiddleware,paymentController.verifyPayment);

router.post("/webhook",paymentController.webhook);

module.exports = router;