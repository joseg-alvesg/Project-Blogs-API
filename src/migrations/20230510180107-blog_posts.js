'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {type: Sequelize.STRING},
      content: {type: Sequelize.STRING},
      published: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now')},
      updated: {type: Sequelize.DATE, defaultValue: Sequelize.fn('now')},
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          as: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
     });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
