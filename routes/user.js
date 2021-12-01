const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersDelete, usersPut, usersPost, usersPatch } = require('../controllers/user');

const { validation } = require('../middlewares/fields-validation');
const { isValidRole, emailExists, userIdExists } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet );

router.put('/:id', [
    check('id', 'Not a valid user id').isMongoId(),    
    check('id').custom( userIdExists ),
    check('role').custom( isValidRole ),
    validation
], usersPut);

router.post('/',[

    check('name', 'name is required').not().isEmpty(),
    check('password', 'password minimum length is 6 chars').isLength({min : 6}),
    check('email', 'email is incorrect').isEmail(),
    
    check('email').custom( emailExists ),
    
    check('role').custom( isValidRole ),
    
    validation

], usersPost);

router.patch('/', usersPatch);

router.delete('/:id', [
    check('id', 'Not a valid user id').isMongoId(),    
    check('id').custom( userIdExists ),
    validation

], usersDelete);

module.exports = router;
