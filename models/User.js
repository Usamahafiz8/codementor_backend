// models/User.js
import mongoose from 'mongoose';

const QuizRecordSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    skillLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    quizRecords: [QuizRecordSchema]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
