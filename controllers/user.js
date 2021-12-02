
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require ('../models/user');

const usersGet = async(req, res = response) => {

    const { limit = 5, start = 0 } = req.query;
    const query = {status: true};

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),

        User.find( query )
            .skip( Number( start ) )
            .limit( Number( limit ) )
    ]);

    res.json( { total, users } );
}

const usersPost = async (req = request, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({ name, email, password, role });

    //hash a la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt);

    //guardar en bd
    await user.save();

    res.json( user );

}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...other } = req.body;
    //validar id contra bd

    if ( password ) {

        const salt = bcryptjs.genSaltSync(10);
        other.password = bcryptjs.hashSync( password, salt);
    
    }

    const user = await User.findByIdAndUpdate( id, other );

    res.json( user );
}

const usersPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador',
        id
        });
}

const usersDelete = async (req = request , res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status : false });
    const authUser = req.authUser;

    res.json( user );
}

module.exports = {

    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

}

