import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.model.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB for debug.');
    const doc = await Listing.findOne().sort({ createdAt: -1 }).lean();
    if (!doc) {
      console.log('No listings found');
    } else {
      console.log('Latest listing id:', doc._id);
      console.log('imageUrls:', doc.imageUrls);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Debug script error:', err);
  }
};

run();
