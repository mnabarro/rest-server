const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validation } = require('../middlewares/fields-validation');

const router = Router();

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'password is mandatory').not().isEmpty()
], validation, login );

module.exports = router;
