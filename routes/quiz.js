import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route to store quiz details for a user
router.post('/store', auth, async (req, res) => {
    const { quizId, score } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const quizRecord = { quizId, score };
        user.quizRecords.push(quizRecord);
        await user.save();

        res.status(200).json({ message: 'Quiz record added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
