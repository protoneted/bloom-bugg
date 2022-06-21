const config = require('../config/env');
const { success, error, validation } = require('./restResponse');
const db = require('../config/db.config');
const sequelize = db.sequelize;
var jwt1 = require('jsonwebtoken');
var moment = require('moment');
const constants = require('../config/constants');

function jwt(req, res, next) {
    const secret = config.jwtsecret;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt1.verify(token, secret, (err, user) => {
                if (err) {
                    let error1 = [];
                    error1.push('Invalid Token');
                    // jwt authentication error
                    return res.status(401).send(error(error1, 401));
                }
                req.user_id = user.user_id;
                console.log("inside middleware");
                next();
            })
        } else {
            return res.status(401).send(error('Token must be provided!', 401));
        }
    } else {
        return res.status(401).send(error('You are not authorized!', 401));
    }
}

function errorHandler(err, req, res, next) {
    console.log("inside error")
    console.log("============================")
    if (typeof err != "undefined") {
        if (typeof (err) === 'string') {
            // custom application error
            return res.send(error({ message: err }));
        }

        if (err.name === 'UnauthorizedError') {
            let error1 = [];
            error1.push('Invalid Token');
            // jwt authentication error
            return res.status(401).send(error(error1, 401));
        }
    }


    // default to 500 server error
    return res.send(error({ message: err.message }));
}

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split('')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, config.jwtsecret, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })

// }

module.exports = {
    jwt,
    errorHandler,
}