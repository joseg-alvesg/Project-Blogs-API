'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
     queryInterface.dropTable('Categories');
  }
};
