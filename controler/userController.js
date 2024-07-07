import User from "../models/User";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            res.json({
                username: user.username,
                email: user.email,
                age: user.age,
                skillLevel: user.skillLevel,
                quizRecords: user.quizRecords
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details' });
    }
};
