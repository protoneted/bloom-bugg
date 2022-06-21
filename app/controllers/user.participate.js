const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
const { challenge } = require('../validators/bloomCategoty.validator');

exports.userParticipateList = (req, res) => {
    try {

        const finalResult = [];

        DB.query("SELECT a.id,a.name,a.email,a.dob,a.mobile_no,b.is_bloom,c.title as bloom_title,c.description as bloom_description FROM bm_users a JOIN user_bloom_category b ON a.id = b.user_id JOIN bm_bloom_category_detail c on c.id = b.bloom_category_detail_id WHERE b.is_bloom = 1 AND a.id = " + req.user_id, function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            finalResult.push({ bloom: result })

            DB.query(" SELECT a.id,a.name,a.email,a.dob,a.mobile_no,b.is_join,c.title as challenge_title,c.description as challenge_description FROM bm_users a JOIN user_challenge_category b ON a.id = b.user_id JOIN bm_challenge_category_detail c on c.id = b.challenge_category_detail_id WHERE b.is_join = 1 AND a.id = " + req.user_id, function (err, result1, fields) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                finalResult.push({ challenge: result1 })
                return res.send(success(finalResult, 'final  result push'));
            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}