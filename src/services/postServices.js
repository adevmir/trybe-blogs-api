const { BlogPost, User, Category } = require('../database/models');

const create = async ({ title, content, userId }) => {
    console.log(title, content, userId);
    const newPost = await BlogPost
    .create({ title, content, userId });
    
    console.log(newPost);
    return { code: 201, data: newPost };
};

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
    const result = await User.findByPk(id, { include: [
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
    if (!result) {
        return { code: 404, message: 'Post does not exist' }; 
    }
    return { code: 200, user: result };
};

module.exports = { create, findAll, findById };