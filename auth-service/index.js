const express = require("express");
require("express-async-errors");
require('dotenv').config()

const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Authentication service is up and running at ${PORT}`);
});

app.use("/auth", authRoutes);

sequelize.sync();
