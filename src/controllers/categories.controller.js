const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const data = await categoryService.createCategory(name);
  return res.status(201).json(data);
};

const getAll = async (_req, res) => {
  const data = await categoryService.getAll();
  res.status(200).json(data);
};

module.exports = {
  createCategory,
  getAll,
};