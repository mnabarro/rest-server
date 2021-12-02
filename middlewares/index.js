
const fieldsValidation = require('../middlewares/fields-validation');
const jwtValidation = require('../middlewares/jwt-validation');
const roleValidation = require('../middlewares/role-validation');

module.exports = {

    ...fieldsValidation,
    ...jwtValidation,
    ...roleValidation
}
