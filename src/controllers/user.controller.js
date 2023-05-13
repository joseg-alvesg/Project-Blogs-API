const { userService } = require('../services');
const { tokenGenerate } = require('../utils/tokenHelpers');

const createUser = async (req, res) => {
  const user = req.body;
  const data = await userService.createUser(user);
  const token = tokenGenerate({ email: user.email, id: data.dataValues.id });

  return res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const data = await userService.findAll();
  res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const data = await userService.findById(Number(id));
  if (!data) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(data);
};

module.exports = {
  createUser,
  findAll,
  findById,
};
