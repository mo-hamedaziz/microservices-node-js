const express = require("express");
require("express-async-errors");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const swaggerDocs = require('./swagger');

const app = express();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await new Promise((resolve, reject) => {
      connectDB().then(resolve).catch(reject);
    });

    // Start the Express server
    app.use(express.json());
    app.use("/auth", authRoutes);

    swaggerDocs(app);

    const INT_PORT = process.env.INT_PORT || 3000;
    const EXT_PORT = process.env.EXT_PORT || 3000;

    app.listen(INT_PORT, () => {
      console.log(`Authentication Service running on port ${EXT_PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
