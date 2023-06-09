"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "posts_categories",
    }
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    })
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'categoryId',
    })
  };

  return PostCategory;
};
