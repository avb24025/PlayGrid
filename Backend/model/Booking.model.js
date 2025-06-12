import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  turfName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  bookedSlot: {
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    }
  },
  paymentId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

