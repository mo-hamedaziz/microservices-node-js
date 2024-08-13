const jwt = require('jsonwebtoken');

exports.signToken = (payload, callback) => {
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, callback);
};
