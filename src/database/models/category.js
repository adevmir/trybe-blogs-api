const Category = (Sequelize, DataTypes) => {
  const Category = Sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'Categories'
  })

  Category.associate = (models) => {
    Category.hasOne(models.PostCategory, {
      foreignKey: 'categoryId', as: 'categories'
    });
  }

  return Category;
};

module.exports = Category;