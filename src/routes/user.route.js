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
router.get('/:id', tokenValidation.tokenValidation, userControler.findById);
router.delete('/me', tokenValidation.tokenValidation, userControler.deleteUser);

module.exports = router;
