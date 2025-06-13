import Turf from '../model/Turf.model.js';
import mongoose from 'mongoose';

const addTurf= async (req, res) => {   
    const { name, location, district, state, price, size, contact,ownerEmail,openingTime,closingTime ,sport} = req.body;
    const imagePath = req.file?.path || '';

    try {
        // Create new turf
        const newTurf = new Turf({
            name,
            location,
            district,
            state,
            price,
            size,
            contact,
            image: imagePath,
            ownerEmail,
            openingTime,
            closingTime,
            sport,
            bookedSlots: [],
        });

        // Save turf to database
        await newTurf.save();
        res.status(201).json({ message: 'Turf added successfully', turf: newTurf });
    } catch (error) {
        console.error('Error adding turf:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const listTurf = async (req, res) => {
    try {
        const turfs = await Turf.find();
        res.status(200).json(turfs);
    } catch (error) {
        console.error('Error fetching turfs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const checkSlotAvailability = async (req, res) => {
  const { bookingDate, startTime, endTime, turfId } = req.body;
  console.log("Slot check payload:", req.body);

  if (!bookingDate || !startTime || !endTime || !turfId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    const isBooked = turf.bookedSlots.some(slot =>
      slot.date === bookingDate &&
      !(endTime <= slot.startTime || startTime >= slot.endTime)
    );

    if (isBooked) {
      return res.status(400).json({ valid: false, message: 'This slot is already booked.' });
    }

    res.status(200).json({ valid: true, message: 'Slot is available.' });
  } catch (error) {
    console.error('Error checking slot availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export default {
    addTurf,listTurf,checkSlotAvailability,
};