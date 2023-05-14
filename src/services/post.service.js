const jwt = require('jsonwebtoken');
const { User, BlogPost, Category, PostCategory } = require('../models');

const findUserId = async (token) => {
  const decoded = jwt.decode(token, { complete: true });
  return User.findOne({
    where: { email: decoded.payload.email },
  }).then((a) => a.dataValues);
};

const findSimpleId = async (id) => BlogPost.findByPk(id);

const postOwner = async (id, token) => findUserId(token).then(async (user) => {
  const post = await BlogPost.findByPk(id);
  return post.dataValues.userId === user.id;
});

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
    categoryIds.map((categoryId) =>
      insertCategory(data.dataValues.id, categoryId)),
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

const update = async (id, { title, content }, auth) => {
  const owner = await postOwner(id, auth);
  if (!owner) return undefined;
  await BlogPost.update(
    { title, content },
    { where: { id } /* , returning: true, plain: true  */ }, // * pesquisar mais sobre returning, achei que traria o objeto
  );
  const data = await findById(id);
  return data;
};

const deleteById = async (id, auth) => {
  const idExists = await findSimpleId(id);
  if (!idExists) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  const owner = await postOwner(id, auth);
  if (!owner) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  const deleted = await BlogPost.destroy({ where: { id } });
  console.log('delete aqui', deleted);
  return deleted;
};

module.exports = {
  insert,
  findAll,
  findById,
  update,
  deleteById,
};
