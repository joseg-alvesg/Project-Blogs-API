const express = require('express');
const { blogPostController } = require('../controllers');
const { tokenValidation, blogPostValidation } = require('../middlewares');

const router = express.Router();

router.get('/', tokenValidation.tokenValidation, blogPostController.findAll);
router.get(
  '/:id',
  tokenValidation.tokenValidation,
  blogPostController.findById,
);
router.post(
  '/',
  tokenValidation.tokenValidation,
  blogPostValidation.titleValid,
  blogPostValidation.contentValid,
  blogPostValidation.categoryIdsValid,
  blogPostController.insert,
);
router.put(
  '/:id',
  tokenValidation.tokenValidation,
  blogPostValidation.titleValid,
  blogPostValidation.contentValid,
  blogPostController.update,
);
router.delete('/:id', tokenValidation.tokenValidation, blogPostController.deleteById);

module.exports = router;
