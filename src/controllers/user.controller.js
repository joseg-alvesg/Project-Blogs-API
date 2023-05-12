const { userService } = require('../services');
const { tokenGenerate } = require('../utils/tokenHelpers');

const createUser = async (req, res) => {
  const user = req.body;
  await userService.createUser(user);

  const token = tokenGenerate(user.email);

  return res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const data = await userService.findAll();
  res.status(200).json(data);
};

module.exports = {
  createUser,
  findAll,
};
