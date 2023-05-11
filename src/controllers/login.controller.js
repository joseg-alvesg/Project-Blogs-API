const { userService } = require('../services');
const { tokenHelper } = require('../utils');

const login = async (req, res) => {
  const { email, password } = req.body;

  const emailExists = await userService.login(email);
  console.log(emailExists);
  if (!emailExists) return res.status(400).json({ message: 'Invalid fields' });

  const token = tokenHelper.tokenGenerate(email);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};