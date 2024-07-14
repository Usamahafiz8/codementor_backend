
// routes/user.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Route to store quiz details for a user
router.post("/store", async (req, res) => {
  const { userId,  score } = req.body;

  // Validate the request body
  if (!userId ||  score === undefined) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const quizRecord = {  score };
    user.quizRecords.push(quizRecord);
    await user.save();

    res.status(200).json({ message: "Quiz record added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;