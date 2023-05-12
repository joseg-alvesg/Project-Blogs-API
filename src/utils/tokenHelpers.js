const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenGenerate = (email) => {
const payload = {
  email,
};

const token = jwt.sign(payload, secret, {
  expiresIn: '7d',
  algorithm: 'HS256',
});

return token;
};

module.exports = { tokenGenerate };