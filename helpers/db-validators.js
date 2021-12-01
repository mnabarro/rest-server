const Role = require('../models/role');
const User = require('../models/user');

 const isValidRole = async(role = '' ) => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`${role} is not a valid role`);
    }
}

const emailExists = async ( email = '' ) => {

    const mailExists = await User.findOne({ email });
    
    if ( mailExists ) {
        throw new Error(`Address ${email} is already registered`);
    }

}

const userIdExists = async ( id ) => {

    const idExists = await User.findById(id);
    
    if ( !idExists ) {
        throw new Error(`${ id } is not a valid user id`);
    }

}

module.exports = { isValidRole, emailExists, userIdExists }