import express from 'express';
import bookingController from '../controller/Booking.controller.js';

const router=express.Router();

router.post('/create-order', bookingController.createRazorpayOrder);
router.post('/verify', bookingController.verifyPayment);

export default router;
