'use strict';

const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'Categories'
  });

  return Category;
};

module.exports = Category;