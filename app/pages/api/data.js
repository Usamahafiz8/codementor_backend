// pages/api/data.js
import dbConnect from '../../mongodb';

export default async function handler(req, res) {
  await dbConnect();

  // Here, you can use Mongoose models to interact with your MongoDB database.
  res.status(200).json({ message: 'Connected to MongoDB' });
}
