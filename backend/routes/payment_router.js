const express = require('express');
const { createOrder, verifyPayment, getPaymentsByUserId } = require('../controller/payment_controller');

const router = express.Router();

// Route to create an order
router.post('/create-order', createOrder);

// Route to verify payment
router.post('/verify-payment', verifyPayment);

// Route to get payment detail
router.get('/get-payment', getPaymentsByUserId);

module.exports = router;
