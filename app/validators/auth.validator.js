const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


// Login validator
const loginValidators = () => [
    check('email', 'Please enter Email').not().isEmpty(),
    check('password', 'Please Enter Password').not().isEmpty(),
]
const signUpValidators = () => [
    check('name', 'Please enter Name').not().isEmpty(),
    check('mobile_no', 'Please enter number').not().isEmpty(),
    check('email', 'Please enter Email').not().isEmpty(),
    check('password', 'Please Enter Password').not().isEmpty(),
]
const updateValidators = () => [
    check('name', 'Please enter Name').not().isEmpty(),
    check('dob', 'Please Enter Date of Birth').not().isEmpty(),
]

const changeValidators = () => [
    check('password', 'Password Required!!!!').not().isEmpty()
]

const blockValidators = () => [
    check('is_block', 'Enter only 0 and 1!!!!').isBoolean()
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

const update = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

const change = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

const block = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}


module.exports = {
    login: [
        loginValidators(),
        login
    ],
    signUp: [
        signUpValidators(),
        signUp
    ],
    updateUser: [
        updateValidators(),
        update
    ],
    changePassword: [
        changeValidators(),
        change
    ],
    isBlock: [
        blockValidators(),
        block
    ]
}