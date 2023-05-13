const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { BlogPost, Category, PostCategory } = require('../models');

const insertCategory = async (postId, categoryId) =>
  PostCategory.create({ postId, categoryId });

const insert = async ({ title, content, categoryIds }, user) => {
  const categories = await Promise.all(
    categoryIds.map((id) => Category.findByPk(id)),
  ).then((c) => c.every((id) => id));
  if (!categories) return undefined;

  const decoded = jwt.decode(user, { complete: true });
  const userId = await User.findOne({
    where: { email: decoded.payload.email },
  }).then((a) => a.dataValues.id);

  const data = await BlogPost.create({ title, content, userId });
  await Promise.all(
    categoryIds.map((categoryId) => insertCategory(data.dataValues.id, categoryId)),
  );
  return data;
};

module.exports = {
  insert,
};
