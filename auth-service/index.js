const express = require("express");
require("express-async-errors");
require('dotenv').config();

const mongoose = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Authentication service is up and running at ${PORT}`);
});
