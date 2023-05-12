const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const data = await categoryService.createCategory(name);
  console.log(data);
  return res.status(201).json(data);
};

module.exports = {
  createCategory,
};