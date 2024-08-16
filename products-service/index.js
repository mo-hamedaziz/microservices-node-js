const express = require('express');
require('express-async-errors');
const connectDB = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const productRoutes = require('./routes/product.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();

app.use(express.json());

// Routes
app.use('/api', productRoutes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Products Service running on port ${port}`);
});
