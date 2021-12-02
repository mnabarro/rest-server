const {
    request,
    response
} = require('express');

const isAdminRole = (req = request, res = response, next) => {

    if (!req.authUser) {

        return res.status(500).json({
            msg: "Can't validate role without a valid token"
        });
    }

    const {
        role,
        name
    } = req.authUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Not an ADMIN role'
        });
    }
    next();
}

const hasRole = (...roles ) => {

    return (req = request, res = response, next) => {

        if (!req.authUser) {

            return res.status(500).json({
                msg: "Can't validate role without a valid token"
            });
        }

        if ( !roles.includes( req.authUser.role )) {

            return res.status(401).json({
                msg: "Authenticated user doesn't have required privilege for this route."
            });
        }

        next();
    }

}

module.exports = {

    isAdminRole,
    hasRole
}