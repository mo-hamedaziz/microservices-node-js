const mongoose = require('mongoose');

const mongoUri = `mongodb://authuser:authpass@auth-db:27017`;

mongoose.connect(mongoUri)
  .then(() => console.log('Connection to auth-db has been established successfully.'))
  .catch((error) => console.error('Unable to connect to auth-db:', error));

module.exports = mongoose;
