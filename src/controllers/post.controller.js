const { blogPost } = require('../services');

const insert = async (req, res) => {
  const { body, headers } = req;
  const user = headers.authorization;
  const data = await blogPost.insert(body, user);
  if (!data) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
  }
  return res.status(201).json(data);
};

const findAll = async (_req, res) => {
  const data = await blogPost.findAll();
  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const data = await blogPost.findById(+id);
  if (!data) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(data);
};

module.exports = {
  insert,
  findAll,
  findById,
};
