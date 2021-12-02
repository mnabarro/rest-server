const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise ((resolve, reject) => {

        const payload = { uid };
        jwt.sign( payload, process.env.JWTKEY, {
            expiresIn: '4h'
        } , ( err, token ) => {

            if ( err ) {
                reject ('JWT could not be generated');
            } else {
                resolve ( token );
            }
        })

    });
}

module.exports = {
    generateJWT
}