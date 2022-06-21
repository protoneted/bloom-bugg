const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


// SEND FOLLOW REQUEST VALIDATOR
const sendRequestValidators = () => [
    check('follow_to_user_id', 'User not found.').not().isEmpty(),
]

// UPDATE REQUEST STATUS VALIDATOR
const updateStatusValidators = () => [
    check('follow_request_id', 'Request not found.').not().isEmpty(),
    check('status', 'Status is required.').not().isEmpty(),
    check('notification_id', 'notification_id not found.').not().isEmpty(),

]

const validatorErrorResponse = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }

    next();
}

module.exports = {
    sendRequest: [
        sendRequestValidators(),
        validatorErrorResponse
    ],
    updateStatus: [
        updateStatusValidators(),
        validatorErrorResponse
    ]
}