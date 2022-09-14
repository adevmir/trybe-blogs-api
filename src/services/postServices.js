// const jwt = require('jsonwebtoken');
const { BlogPost, User, Category, PostCategory } = require('../database/models');
const categoryService = require('./categoryService');

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

  const categoryVerify = (categoryIds) => {
    const id = JSON.stringify(categoryService.findAllIds());
    const a = id.length;
    console.log('categories', categoryIds[0], a);
    for (let i = 0; i < categoryIds.length - 1; i += 1) {
      if (categoryIds[i] > a) return false;
    }
    return true;
  };

const create = async (title, content, categoryIds, date) => {
  const { email } = date;
  const cVerify = await categoryVerify(categoryIds);
  if (cVerify === false) return { code: 400, createdPost: 0, message: '"categoryIds" not found' };
  const { id } = await User.findOne(
    { where: { email } },
    );
    console.log('ID DO USUARIO', id);
  const result = await BlogPost.create({ title, content, userId: id });
  console.log(result);

  const postId = result.dataValues.id;
   console.log(id);
    await PostCategory.bulkCreate(categoryIds
      .map((categoryId) => ({ postId, categoryId })), { validate: true });
  return { code: 201, newPost: result };
};

module.exports = { create, findAll, findById };