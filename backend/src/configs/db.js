import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.DB_CONNECTION_URL;
    await mongoose.connect(uri);
    console.log('MongoDB database connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
