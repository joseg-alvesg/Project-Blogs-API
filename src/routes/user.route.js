const express = require('express');
const { userControler } = require('../controllers');
const { userMiddlewares, tokenValidation } = require('../middlewares');

const router = express.Router();

router.get('/', tokenValidation.tokenValidation, userControler.findAll);
router.post(
  '/',
  userMiddlewares.displayNameValid,
  userMiddlewares.emailValidation,
  userMiddlewares.passwordValidation,
  userMiddlewares.emailExists,
  userControler.createUser,
);

module.exports = router;
