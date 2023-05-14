const jwt = require('jsonwebtoken');
const { User, BlogPost, Category, PostCategory } = require('../models');

const findUserId = async (token) => {
  const decoded = jwt.decode(token, { complete: true });
  return User.findOne({
    where: { email: decoded.payload.email },
  }).then((a) => a.dataValues);
};

const insertCategory = async (postId, categoryId) =>
  PostCategory.create({ postId, categoryId });

const insert = async ({ title, content, categoryIds }, user) => {
  const categories = await Promise.all(
    categoryIds.map((id) => Category.findByPk(id)),
  ).then((c) => c.every((id) => id));
  if (!categories) return undefined;

  const { id: userId } = await findUserId(user);

  const data = await BlogPost.create({ title, content, userId });
  await Promise.all(
    categoryIds.map((categoryId) => insertCategory(data.dataValues.id, categoryId)),
  );
  return data;
};

const findAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  }); 

  return data;
};

const findById = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
};

module.exports = {
  insert,
  findAll,
  findById,
};
