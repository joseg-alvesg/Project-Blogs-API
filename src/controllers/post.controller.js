const { blogPost } = require('../services');

const insert = async (req, res) => {
  const { body, headers } = req;
  const user = headers.authorization;
  const data = await blogPost.insert(body, user);
  if (!data) return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  res.status(201).json(data);
};

module.exports = {
  insert,
};