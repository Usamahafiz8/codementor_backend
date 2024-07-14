// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // forumId: { type: String , required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
