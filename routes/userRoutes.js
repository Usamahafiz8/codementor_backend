import User from '../models/User.js';

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);  // Note the use of req.user.userId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            email: user.email,
            age: user.age,
            skillLevel: user.skillLevel,
            quizRecords: user.quizRecords
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details' });
    }
};

export default getUserProfile;
