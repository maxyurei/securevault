import 'dotenv/config';
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use'});
        }

        const user = new User({ email, password, savedPassword: []});
        await user.save();

        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );

        res.status(201).json({
            message: 'User created sucessfully',
            token,
            user: { email: user.email}
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message: "Invalid credentials"});

        const found = await bcrypt.compare(password, user.password);
        if (!found) return res.status(401).json({message: "Invalid credentials"});

        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({message: "Sucessfully logged in!", 
            token,
            user: {email: user.email}
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/protected', authMiddleware, (req, res) => {
    res.json({message: `User: ${req.userId} sucessfully logged in`});
})

router.get('/public', (req, res) => {
    res.json({message: "Public data"});
})


export default router;