'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', { 
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
          model: 'Categories',
          key: 'id',
        },
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('posts_categories');
  }
};
