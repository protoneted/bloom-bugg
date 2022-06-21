const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

const addUserReward = () => [
    check('reward_id', 'Please enter reward id.!').not().isEmpty(),
]

const validatorResponse = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }

    next();
}

module.exports = {
    addUserReward: [
        addUserReward(),
        validatorResponse
    ],
}