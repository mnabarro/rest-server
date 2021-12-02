const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/JWT-generator');
const login = async( req = request, res = response ) => {

    const {email, password } = req.body;

    try {

        //Verificar si el email existe en la bd
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Email or password incorrect - email'
            });
        }

        //Si es un usuario activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User inactive'
            });
        }
        
        //Verificar password
        const validPassword = bcryptjs.compareSync( password, user.password );
        
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Email or password incorrect - password'
            });
        }
        //Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })   
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Internal sever error'
        });
    }
}

module.exports = { login }