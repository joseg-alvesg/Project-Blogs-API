const express = require('express');
const { categoryMiddlewares, tokenValidation } = require('../middlewares');
const { categoryController } = require('../controllers');

const router = express.Router();

router.get('/', tokenValidation.tokenValidation, categoryController.getAll);
router.post(
  '/',
  tokenValidation.tokenValidation,
  categoryMiddlewares.nameValid,
  categoryController.createCategory,
);

module.exports = router;
