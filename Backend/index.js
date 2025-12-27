import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './route/User.route.js';
import TurfRoute from './route/Turf.route.js';
import BookingRoute from './route/Booking.route.js';
import AgentRoutes from './route/AgentRoute.js';

dotenv.config();

const app=express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRoutes);
app.use('/api/turf', TurfRoute);
app.use('/api/booking', BookingRoute);
app.use('/api/agent',AgentRoutes);


mongoose.connect(process.env.MONGO_URI, {   
    useNewUrlParser: true,
}
).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});