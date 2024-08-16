const AuthService = require('../services/auth.service');

module.exports = async function isAuthenticated(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    const user = await AuthService.verifyToken(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
