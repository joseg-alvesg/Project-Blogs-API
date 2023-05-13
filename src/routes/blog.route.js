const express = require('express');
const { blogPostController } = require('../controllers');
const { tokenValidation, blogPostValidation } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  tokenValidation.tokenValidation,
  blogPostValidation.titleValid,
  blogPostValidation.contentValid,
  blogPostValidation.categoryIdsValid,
  blogPostController.insert,
);

module.exports = router;