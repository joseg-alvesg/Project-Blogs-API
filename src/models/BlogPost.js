'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog_Posts = sequelize.define('blog_posts', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    underscored: true,
    timestamps: false,
  })  

  Blog_Posts.associate = (models) => {
    Blog_Posts.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    })
  }

  return Blog_Posts;
};
