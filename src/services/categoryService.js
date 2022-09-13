const { Category } = require('../database/models');

const create = async (category) => {
    const newCategory = await Category.create(category);
    
    console.log(newCategory);
    return { code: 201, data: newCategory };
};

const findAll = async () => {
    const result = await Category.findAll({ attributes: ['id', 'name'] });
    return result;
};

module.exports = { create, findAll };