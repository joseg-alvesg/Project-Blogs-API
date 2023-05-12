const { User } = require('../models');

const login = async (email) => {
  const emailExists = User.findOne({ where: { email } });
  return emailExists;
};

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

module.exports = {
  login,
  createUser,
};
