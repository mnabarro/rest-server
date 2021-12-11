const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt-generator');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');
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

const googleSignIn = async( req = request, res = response ) => {

    const { id_token } =req.body;

    try {
        const {name, email, img} = await googleVerify( id_token );

        console.log({name, email, img});
        //Verify if email is registered in our database
        let user = await User.findOne({ email });
        console.log(user);

        if ( !user ) {
            const data = {
                name,
                email,
                password : 'no-password-required',
                img,
                google :true
            };
        
        console.log(data);

            //not in db, add user
            user = new User( data );
            await user.save();

        }
    
        if ( !user.status ) {

        return res.status(401).json({
            msg: 'Unauthorized. Contact site administrator'
        });
    
        }

         //Generar el JWT
         const token = await generateJWT( user.id );
       
        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg: 'cannot verify id_token'
        });
        
    }
    

}

module.exports = { login, googleSignIn }