const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenGenerate = (user) => {
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

module.exports = { tokenGenerate };
