const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


const sharePostValidator = () => [
    check('from_user_id', 'From user id is required!').not().isEmpty(),
    check('to_user_id', 'To user id is required!').not().isEmpty(),
    check('post_id', 'Post id is required!').not().isEmpty(),
]


const sharePost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.send(validation(errorMessages));
    }
    next();
}

module.exports = {
    sharePost: [
        sharePostValidator(),
        sharePost
    ],
   
}