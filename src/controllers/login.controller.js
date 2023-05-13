const { userService } = require('../services');
const { tokenHelper } = require('../utils');

const login = async (req, res) => {
  const { body } = req;

  const emailExists = await userService.login(body.email);
  if (!emailExists) return res.status(400).json({ message: 'Invalid fields' });

  const token = tokenHelper.tokenGenerate(body);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};