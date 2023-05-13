const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: 'Token not found' });

  try {
    const user = jwt.verify(auth, secret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidation };