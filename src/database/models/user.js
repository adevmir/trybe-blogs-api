'use strict';

const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'Users'
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
    { foreignKey: 'userId', as: 'blogPosts' });
  };

  return User;
};

module.exports = User;