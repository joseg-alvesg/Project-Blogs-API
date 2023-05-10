module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.Blog_Post, {
      foreignKey: 'UserId',
      as: 'users',
    })
  }

  return Users;
};
