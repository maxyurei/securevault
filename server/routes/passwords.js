import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import { decrypt, encrypt } from '../utils/encryption.js';


const router = express.Router();


router.use(authMiddleware);


router.post('/', async (req, res) => {
    try{
        const {website, username, password} = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found!"});

        const encryptedPassword = encrypt(password);

        // const encryptPassword;
        user.savedPasswords.push({website, username, password: encryptedPassword});
        await user.save();

        const newPassword = user.savedPasswords[user.savedPasswords.length - 1];
        res.status(201).json(
        {message: "Webstite credentials saved",
        _id: newPassword._id,
        website: newPassword.website,
        username: newPassword.username
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

router.get('/', async (req, res) => {

    try {
        // const {userId} = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found!"});

        const decrypted_passwords = user.savedPasswords.map(item => ({
            _id: item._id,
            website: item.website,
            username: item.username,
            password: decrypt(item.password),
            createdAt: item.createdAt
        }));

        res.status(200).json({message: "Sucessful",
        savedPasswords: decrypted_passwords});
    } catch (error) {res.status(500).json({error: error.message})};
});


router.delete('/:id', async (req, res) => {

    try {
        const passwordId = req.params.id;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found"});

        const passwordDoc = user.savedPasswords.id(passwordId);
        if (!passwordDoc) return res.status(404).json({message: "PasswordId not found!"});
        passwordDoc.deleteOne();
        await user.save();
        res.status(200).json({message: `${passwordId} was succesfully deleted`});
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.put('/:id', async (req, res) => {

    try {
        const passwordId = req.params.id;
        const userId = req.userId;

        const {website, username, password} = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User Not Found!"});

        let passwordDoc = user.savedPasswords.id(passwordId);
        if (website) passwordDoc.website = website;
        if (username) passwordDoc.username = username;
        if (password) passwordDoc.password = encrypt(password);

        await user.save();
        res.status(200).json({message: "Password Updated",
        savedPassword: passwordDoc
     });
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

export default router;