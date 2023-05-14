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

const findAll = async () => {
  const data = await BlogPost.findAll(); 
  const dataWhithUser = await Promise.all( 
    data.map(async (post) => {
      const { dataValues } = await User.findByPk(post.dataValues.userId, {
        attributes: { exclude: ['password'] },
      });
      return { ...post.dataValues, user: dataValues };
    }), 
  );
  const dataWhithCategorie = await Promise.all(
    dataWhithUser.map(async (post) => {
      const { dataValues } = await Category.findByPk(post.id);
      return { ...post, categories: [dataValues] };
    }),
  );
  return dataWhithCategorie;
};

module.exports = {
  insert,
  findAll,
};
