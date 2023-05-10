'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, { timestamps: false })
  

  category.associate = (models) => {
    category.hasMany(models.Blog_Post, {
      foreignKey: 'id',
      as: 'blog_posts',
    })
    category.hasMany(models.User, {
      foreignKey: 'id',
      as: 'users',
    })
  }
  
  return category;
};
