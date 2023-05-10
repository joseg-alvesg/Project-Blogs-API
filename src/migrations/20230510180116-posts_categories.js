'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASDADE',
        onUpdate: 'CASDADE',
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'post_id',
        references: {
          model: 'blog_post',
          key: 'id',
        },
        onDelete: 'CASDADE',
        onUpdate: 'CASDADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
  }
};
