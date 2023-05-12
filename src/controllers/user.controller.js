const { userService } = require('../services');
const { tokenGenerate } = require('../utils/tokenHelpers');

const createUser = async (req, res) => {
  const user = req.body;
  await userService.createUser(user);

  const token = tokenGenerate(user.email);

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};