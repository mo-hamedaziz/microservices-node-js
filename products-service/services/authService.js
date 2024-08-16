const jwt = require('jsonwebtoken');

exports.verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};
