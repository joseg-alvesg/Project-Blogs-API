module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: {type: DataTypes.STRING, field: 'display_name'},
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Blog_Post, {
      foreignKey: 'UserId',
      as: 'users',
    })
  }

  return User;
};
