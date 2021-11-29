const { Router } = require('express');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost, usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet );

router.put('/', usuariosPut);

router.patch('/', usuariosPatch);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;
