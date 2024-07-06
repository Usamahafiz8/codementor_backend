// pages/api/register.js
import dbConnect from '../../mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { username, email, password, age, skillLevel } = req.body;

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        age,
        skillLevel
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
