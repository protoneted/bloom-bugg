const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

const bloomValidators = () => [
    // check('bloom_category_id', 'Please enter bloom category id').not().isEmpty(),
    check('bloom_category_detail_id', 'Please enter bloom category detail id').not().isEmpty(),
    check('is_bloom', 'please enter 0 or 1').not().isEmpty(),
]

const challengeValidators = () => [
    // check('challenge_category_id', 'Please enter challenge category id').not().isEmpty(),
    check('challenge_category_detail_id', 'Please enter challenge category detail id').not().isEmpty(),
    check('is_join', 'please enter 0 or 1').not().isEmpty(),
]

const bloom = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }

    next();
}

const challenge = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }

    next();
}


module.exports = {
    bloom: [
        bloomValidators(),
        bloom
    ],
    challenge: [
        challengeValidators(),
        challenge
    ]
}