import mongoose from 'mongoose';
import User from './models/user-model.js';
import { DB_URL } from './config/server-config.js';

async function checkUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB');

    const email = 'ekkajsnhs.21jdds031@jietjodhpur.ac.in';
    console.log(`Checking if user with email ${email} exists...`);

    const user = await User.findOne({ email });
    console.log('User exists:', !!user);

    if (user) {
      console.log('User details:', {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      });
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUser();
