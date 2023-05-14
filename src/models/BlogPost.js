'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: {type:DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  }, {
    underscored: true,
    timestamps: false,
    tablename: 'blog_posts',
  })  

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      timestamps: false, 
      as: 'user'
    })
  }

  return BlogPost;
};
