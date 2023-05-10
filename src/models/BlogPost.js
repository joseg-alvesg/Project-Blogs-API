'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    underscored: true,
    timestamps: false,
    tablename: 'blog_posts',
  })  

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    })
  }

  return BlogPost;
};
