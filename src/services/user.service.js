const { User } = require('../models');

const login = async (email) => {
  const emailExists = User.findOne({ where: { email } });
  return emailExists;
};

module.exports = {
  login,
};