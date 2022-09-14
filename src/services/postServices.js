const { BlogPost, User, Category } = require('../database/models');

const findAll = async () => {
    const result = await BlogPost.findAll({ include: [
        {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        },
        {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        },
    ],
    });
    console.log(result);
    return result;
};

const findById = async (id) => {
    const result = await BlogPost.findByPk(id, { include: [
        {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        },
        {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        },
    ],
    });
    console.log(result);
    if (!result) {
        return { code: 404, message: 'Post does not exist', post: null }; 
    }
    return { code: 200, post: result };
};

module.exports = { findAll, findById };