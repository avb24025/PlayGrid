import User from '../model/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Signup = async (req, res) => {
    const { fullname, email, password ,role} = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {  
            return res.status(400).json({ message: 'User already exists' });
        }   
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        // Save user to database
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email, role: newUser.role ,fullname:newUser.fullname},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            token,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
};
        
const login = async (req, res) => {
    const { email, password ,role} = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        const isRoleValid = existingUser.role === role;
        if (!isPasswordValid || !isRoleValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email, role: existingUser.role ,fullname:existingUser.fullname},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {Signup,login};
    
