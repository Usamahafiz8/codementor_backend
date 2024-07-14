// routes/comments.js
import express from "express";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js"; // Assuming you have an auth middleware

const router = express.Router();

// Route to display user comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate('userId', 'username email');
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
