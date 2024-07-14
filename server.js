import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import publicRoutes from './routes/public.js';
import dbConnect from './db/mongodb.js';
import auth from './middleware/auth.js';
import getUserProfile from './routes/userRoutes.js';
import commentsRouter from "./routes/comments.js"; 
import allCommentsRouter from './routes/all-comments.js'
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/quiz',auth, quizRoutes);  // Add the new quiz routes
app.use('/api/public', publicRoutes);  // Add the new public routes
app.get('/profile', auth, getUserProfile);
app.use("/api/comments",auth, commentsRouter);
app.use("/api/all-comments",allCommentsRouter);

const PORT = process.env.PORT || 5000;

// Connect to the database
dbConnect().then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
