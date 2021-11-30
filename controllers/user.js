
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require ('../models/user');

const usersGet = (req, res = response) => {

    res.json({
        msg: 'get API - controlador'
        });
}
const usersPost = async (req = request, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });

    //verificar si el email existe

    //hash a la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt);

    //guardar en bd
    await user.save();

    res.json({ user });

}

const usersPut = (req, res = response) => {

    res.json({
        msg: 'put API - controlador'
        });
}

const usersPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
        });
}

const usersDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
        });
}

module.exports = {

    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

}

