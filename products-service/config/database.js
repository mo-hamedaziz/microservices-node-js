// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected successfully.');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const mongoUri = `mongodb://productuser:productpass@product-db:27017`;

mongoose.connect(mongoUri)
  .then(() => console.log('Connection to auth-db has been established successfully.'))
  .catch((error) => console.error('Unable to connect to products-db:', error));

module.exports = mongoose;
