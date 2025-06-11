import mongoose from 'mongoose';

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  price: { type: Number, required: true },
  size: {
    type: String,
    enum: ['5-a-side', '6-a-side', '7-a-side', '8-a-side', 'full'],
    required: true,
  },
  contact: { type: String, required: true },
  openingTime: { type: String, required: true }, // e.g., "06:00"
  closingTime: { type: String, required: true }, // e.g., "23:00"
  sport: {
    type: String,
    enum: ['football', 'cricket', 'badminton', 'multisport'],
    required: true,
  },
  image: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  bookedSlots: [
    {
      date: { type: String },       // e.g., '2025-06-12'
      startTime: { type: String },  // e.g., '14:00'
      endTime: { type: String },    // e.g., '15:00'
    },
  ],
}, { timestamps: true });

const Turf = mongoose.model('Turf', turfSchema);
export default Turf;
