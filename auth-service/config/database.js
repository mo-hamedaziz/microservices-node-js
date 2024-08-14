const mongoose = require('mongoose');

const mongoUri = `mongodb://user:pass@auth-db:27017`;

mongoose.connect(mongoUri)
  .then(() => console.log('Connection to MongoDB has been established successfully.'))
  .catch((error) => console.error('Unable to connect to MongoDB:', error));

module.exports = mongoose;
