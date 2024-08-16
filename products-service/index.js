const express = require('express');
require('express-async-errors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

app.use('/api', productRoutes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Products Service running on port ${port}`);
});

sequelize.sync();
