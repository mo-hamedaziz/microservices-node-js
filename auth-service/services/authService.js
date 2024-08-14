const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};
