const authService = require('../services/authService');
const tokenUtil = require('../utils/tokenUtil');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await authService.hashPassword(password);

  const user = await authService.createUser({ name, email, password: hashedPassword });
  
  const payload = { email: user.email, name: user.name };
  tokenUtil.signToken(payload, (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Token generation failed' });
    }
    res.status(200).json({ token, name: user.name, email });
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const isPasswordValid = await authService.comparePassword(password, user.password);
  if (isPasswordValid) {
    const payload = { email: user.email, name: user.name };
    tokenUtil.signToken(payload, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Token generation failed' });
      }
      res.status(200).json({ token, name: user.name, email });
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
