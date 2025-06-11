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

export default {
    addTurf,listTurf
};