const userMiddlewares = require('./userValidation');
const tokenValidation = require('./tokenValidation');
const categoryMiddlewares = require('./categoriesValidation');
const blogPostValidation = require('./blogPostValidation');

module.exports = {
  userMiddlewares,  
  tokenValidation,
  categoryMiddlewares,
  blogPostValidation,
};