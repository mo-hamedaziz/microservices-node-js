const mongoose = require('mongoose');

const connectDB = () => {
  console.log('Attempting to connect to MongoDB...');
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected successfully.');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
