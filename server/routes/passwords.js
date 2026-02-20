import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';


const router = express.Router();


router.use(authMiddleware);


router.post('/', async (req, res) => {
    try{
        const {website, username, password} = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found!"});

        // const encryptPassword;
        user.savedPasswords.push({website, username, password});
        await user.save();

        const newPassword = user.savedPasswords[user.savedPasswords.length - 1];
        res.status(201).json({message: "Webstite credentials saved", savedPassword: newPassword});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

export default router;