const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


const SettingValidator = () => [
    check('is_profile_search', 'Enter only 0 and 1!!!!').isBoolean(),
    check('is_private_account', 'Enter only 0 and 1!!!').isBoolean()
]



const Setting = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }

    next();
}

module.exports = {
    account: [
        SettingValidator(),
        Setting
    ],
}