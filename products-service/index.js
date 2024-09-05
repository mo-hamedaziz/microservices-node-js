const express = require('express');
require('express-async-errors');
require('dotenv').config();

const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const productRoutes = require('./routes/productRoutes');
const swaggerDocs = require('./swagger');

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
    await connectRabbitMQ();

    // Start the Express server
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello, welcome to the Products Service!");
    });

    app.use('/api', productRoutes);

    swaggerDocs(app);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Products Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1);
  }
};

startServer();
