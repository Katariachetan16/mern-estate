import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        console.log('Connection string:', process.env.MONGO.replace(/:[^:]*@/, ':****@')); // Hide password in logs
    });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3002, () => {
    console.log('Server is running on port 3002!');
    }
);

app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
 const statusCode = err.statusCode || 500;
 const message = err.message || 'Internal Server Error';
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message,

 });
});