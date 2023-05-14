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

const update = async (req, res) => {
  const { id } = req.params;
  const { body, headers: { authorization: auth } } = req;
  const data = await blogPost.update(+id, body, auth);
  if (!data) return res.status(401).json({ message: 'Unauthorized user' });
  return res.status(200).json(data);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { authorization: auth } = req.headers;
  const { type, message } = await blogPost.deleteById(+id, auth);
  if (type === 'UNAUTHORIZED') return res.status(401).json({ message });
  if (type === 'NOT_FOUND') return res.status(404).json({ message });
  return res.status(204).json(message);
};

module.exports = {
  insert,
  findAll,
  findById,
  update, 
  deleteById,
};
