const { success, error, validation } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');


// POST LIKE UN-LIKE VALIDATOR
const likeUnlikeValidators = () => [
    check('post_id', 'Post not found.').not().isEmpty(),
    check('status', 'Status not found.').not().isEmpty(),
]

// POST LIKE UN-LIKE VALIDATOR
const addCommentValidators = () => [
    check('post_id', 'Post not found.').not().isEmpty(),
    check('comment', 'Comment is required.').not().isEmpty(),
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
    likeUnlike: [
        likeUnlikeValidators(),
        validatorErrorResponse
    ],
    addComment: [
        addCommentValidators(),
        validatorErrorResponse
    ],


}