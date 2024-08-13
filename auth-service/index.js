const express = require('express');
require('express-async-errors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Users Service running on port ${port}`);
});

app.use('/auth', authRoutes);

sequelize.sync();
