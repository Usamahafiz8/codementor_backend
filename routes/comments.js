// routes/comments.js
import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import Comment from "../models/Comment.js";
const router = express.Router();

// Route to add a user comment
router.post("/add", async (req, res) => {
  const {  text } = req.body;
console.log('hjfhjgfhj');
  // Validate the request body
  if (!text) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

console.log("userid", user._id);   
    const newComment = new Comment({ userId:user._id, text });
    await newComment.save();

    res.status(200).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



export default router;
