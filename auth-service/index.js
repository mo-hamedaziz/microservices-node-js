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

    swaggerDocs(app);

    // Start the Express server
    app.use(express.json());
    app.use("/auth", authRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Authentication Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
