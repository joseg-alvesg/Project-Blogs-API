const express = require('express');
const loginValidation = require('../middlewares/loginValidation');
const { loginControler } = require('../controllers');

const router = express.Router();

router.post('/', loginValidation, loginControler.login);

module.exports = router;