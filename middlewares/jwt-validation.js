const { response } = require('express');
const User = require('../models/user');
jwt = require('jsonwebtoken');

const isValidJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No token in header'
        });
    }

    try {
        
        const { uid } =  jwt.verify( token, process.env.JWTKEY );

        const authUser = await User.findById( uid ); 
        
        if ( !authUser ) {

            return res.status(401).json({
                msg: 'User not in database'
            });
        }

        //Verificar si está activo
        if ( !authUser.status ) {

            return res.status(401).json({
                msg: 'Not valid user or token'
            });
        }

        req.authUser = authUser;
        req.uid = uid;

        next();

    } catch (error) {

        console.log(error);
        
        res.status(401).json({
            msg: 'Not a valid token'
        });
        
    }
    console.log( token );
    next();

}

module.exports = {
    isValidJWT
}