import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import passwordRoutes from './routes/passwords.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB!'))
.catch((err) => console.log('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Hello from SecureVault sever! Auto reload works!');
});

app.get('/api/test', (req, res) => {
    res.send('This is a test API endpoint!');
});

app.delete('/api/test-users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({message: 'All user deleted'});
    } catch (error) {
    res.status(400).json({error: error.message});
    }
});

app.post('/api/test-user', async (req, res) => {
    try {
        const testUser = new User({
            email: 'test2@example.com', 
            password: 'temporarypassword1234',
            savedPasswords: []
        });

        await testUser.save();
        res.json({message: 'User created!', user: testUser});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
    
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
