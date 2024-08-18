const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    req.user = user;
    next();
  });
};

module.exports = isAuthenticated;