'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { timestamps: false })
  
  return category;
};
