// index.js
const express = require('express');
require('express-async-errors');
require('dotenv').config();
const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const productRoutes = require('./routes/productRoutes');

const app = express();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await new Promise((resolve, reject) => {
      connectDB()
        .then(resolve)
        .catch(reject);
    });

    // Connect to RabbitMQ
    await new Promise((resolve, reject) => {
      connectRabbitMQ()
        .then(resolve)
        .catch(reject);
    });

    // Start the Express server
    app.use(express.json());
    app.use('/api', productRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Products Service running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1);
  }
};

startServer();
