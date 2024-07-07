import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Public route to get all users' quiz information
router.get('/all-quiz-info', async (req, res) => {
    try {
        const users = await User.find({}, 'username quizRecords').populate('quizRecords.quizId', 'name');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
