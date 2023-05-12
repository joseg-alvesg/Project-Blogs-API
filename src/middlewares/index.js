const userMiddlewares = require('./userValidation');
const tokenValidation = require('./tokenValidation');
const categoryMiddlewares = require('./categoriesValidation');

module.exports = {
  userMiddlewares,  
  tokenValidation,
  categoryMiddlewares,
};