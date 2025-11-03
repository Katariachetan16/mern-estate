import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection successful!');
        await mongoose.connection.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('MongoDB connection test failed:', error);
        console.log('Connection string used:', process.env.MONGO.replace(/:[^:]*@/, ':****@'));
    }
};

testConnection();