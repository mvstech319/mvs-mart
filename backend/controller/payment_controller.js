const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment_schema'); // Ensure this is correctly imported
require('dotenv').config();

// Initialize Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order
exports.createOrder = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: 'created',
    });
  } catch (error) {
    console.error('Order Creation Error:', error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};

// ✅ Verify Payment Signature
exports.verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
    } = req.body;

    // Validate Required Fields
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ success: false, error: 'Missing required payment parameters' });
    }

    // Verify Payment Signature
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Save Payment Details
    const orderConfirm = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      payStatus: 'paid',
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      orderId: orderConfirm.orderId,
      amount: orderConfirm.amount,
    });
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message,
    });
  }
};

// ✅ Get All Payments by User ID
exports.getPaymentsByUserId = async (req, res) => {
  try {
    const  userId  =req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const payments = await Payment.find({ userId });

    if (!payments.length) {
      return res.status(404).json({
        success: false,
        message: 'No payments found for this User ID',
      });
    }

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error('Error fetching payments by User ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payment details',
      error: error.message,
    });
  }
};
