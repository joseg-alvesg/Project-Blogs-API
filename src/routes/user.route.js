const express = require('express');
const { userControler } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  userMiddlewares.displayNameValid,
  userMiddlewares.emailValidation,
  userMiddlewares.passwordValidation,
  userMiddlewares.emailExists,
  userControler.createUser,
);

module.exports = router;
