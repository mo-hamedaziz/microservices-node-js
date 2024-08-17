// config/database.js
const mongoose = require('mongoose');

const connectDB = () => {
  console.log('Attempting to connect to MongoDB...');
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected successfully.');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error.message);
      process.exit(1); // Exit the process if the connection fails
    });
};

module.exports = connectDB;
