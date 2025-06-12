import express from 'express';
import Booking from '../model/Booking.model.js';
import Turf from '../model/Turf.model.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';


dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body; // in INR, say 200 = ₹200

  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: 'Missing payment details' });
    }

  // Here you would typically verify the payment signature
  // For simplicity, we are skipping that step

  try {
    const newBooking = new Booking({
        turfName: bookingDetails.turfName,
        ownerEmail: bookingDetails.ownerEmail,
        userEmail: bookingDetails.userEmail,
        bookedSlot: {
            date: bookingDetails.date,
            startTime: bookingDetails.startTime,
            endTime: bookingDetails.endTime,
            },
        paymentId: razorpay_payment_id,
    });

    await newBooking.save();

    // Optionally, you can update the Turf model to mark the slot as booked
    const turf = await Turf.findById(bookingDetails.turfId);
    if (turf) {
      turf.bookedSlots.push({
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
      });
      await turf.save();
    }

    // Respond with success

    res.status(200).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
};

export default{
    createRazorpayOrder,verifyPayment
}


