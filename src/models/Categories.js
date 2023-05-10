'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, { timestamps: false })
  

  Categories.associate = (models) => {
    Categories.hasMany(models.Blog_Post, {
      foreignKey: 'id',
      as: 'blog_posts',
    })
    Categories.hasMany(models.User, {
      foreignKey: 'id',
      as: 'users',
    })
  }
  
  return Categories;
};
