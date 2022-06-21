const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


const vendorLoginValidator = () => [
    check('email', 'Please enter Email').not().isEmpty(),
    check('password', 'Please Enter Password').not().isEmpty(),
]

const vendorSignUpValidators = () => [
    check('first_name', 'Please enter First Name').not().isEmpty(),
    check('last_name', 'Please enter Last Name').not().isEmpty(),
    check('email', 'Please enter Email').not().isEmpty(),
    check('password', 'Please Enter Password').not().isEmpty(),
    check('phone_no', 'Please enter Phone Number').not().isEmpty(),
    check('address', 'Please enter Address').not().isEmpty(),
    check('company_name', 'Please enter Company Name').not().isEmpty(),
]

const addRewards = () => [
    check('title', 'Please enter Reward Title').not().isEmpty(),
    check('description', 'Please enter Reward Description').not().isEmpty(),
    check('start_date', 'Please enter Starting Date').not().isEmpty(),
    check('end_date', 'Please Enter Ending Date').not().isEmpty(),
    check('promo_code', 'Please enter Promo Code').not().isEmpty(),
    check('reward_category', 'Please enter reward category').not().isEmpty(),

]

const login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

const signUp = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}
const reward = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

module.exports = {
    vendorLogin: [
        vendorLoginValidator(),
        login
    ],
    vendorSignup: [
        vendorSignUpValidators(),
        signUp
    ],
    vendorRewards: [
        addRewards(),
        reward
    ],
}