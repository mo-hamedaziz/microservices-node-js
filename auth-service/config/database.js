const mongoose = require('mongoose');

const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.connect(mongoUri)
  .then(() => console.log('Connection to MongoDB has been established successfully.'))
  .catch((error) => console.error('Unable to connect to MongoDB:', error));

module.exports = mongoose;
