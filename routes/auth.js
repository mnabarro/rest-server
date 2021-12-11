const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validation } = require('../middlewares/fields-validation');

const router = Router();

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'password is mandatory').not().isEmpty()
], validation, login );

router.post('/google', [
    check('id_token', 'ID token is required').not().isEmpty()
], validation, googleSignIn );

module.exports = router;
