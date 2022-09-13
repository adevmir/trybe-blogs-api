const { Category } = require('../database/models');

const create = async (category) => {
    const newCategory = await Category.create(category);
    
    console.log(newCategory);
    return { code: 201, data: newCategory };
};

module.exports = { create };