const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');

exports.listOfChallengeCategory = (req, res) => {
    const userId = req.user_id
    let param = req.query;

    let categoryId = param.category_id;
    let info = common.pagination(param.page);
    try {
        if (categoryId == 1) {
            DB.query("SELECT user_challenge_category.id,  bm_challenge_category.id as challenge_category_id,bm_challenge_category_detail.bloom_id ,bm_challenge_category.name as challange_category_name,bm_challenge_category_detail.id as challange_id,bm_challenge_category_detail.title as challange_title,bm_challenge_category_detail.description ,bm_challenge_category_detail.image, " +
                " user_challenge_category.is_join FROM user_challenge_category JOIN bm_challenge_category on bm_challenge_category.id = user_challenge_category.challenge_category_id " +
                " JOIN bm_challenge_category_detail ON bm_challenge_category_detail.id = user_challenge_category.challenge_category_detail_id " +
                " WHERE user_id = " + userId, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, 'My Challenges!'));
                });
        } else {
            // "SELECT a.id  , a.name,b.id as challange_id, b.title,b.description,b.image from bm_challenge_category as a JOIN bm_challenge_category_detail b on a.id = b.challenge_category_id where b.challenge_category_id = ? AND b.deleted_at is null order by id desc LIMIT  ? OFFSET  ?"
            DB.query("SELECT bm_challenge_category_detail.bloom_id,bm_challenge_category_detail.id as challange_id,bm_challenge_category_detail.title as challange_title, bm_challenge_category_detail.description, bm_challenge_category_detail.image, " +
                " bm_challenge_category.id as challenge_category_id,bm_challenge_category.name as challange_category_name, user_challenge_category.is_join FROM((bm_challenge_category_detail " +
                " LEFT JOIN user_challenge_category ON user_challenge_category.challenge_category_detail_id = bm_challenge_category_detail.id " +
                " AND user_challenge_category.user_id = ?) JOIN bm_challenge_category ON bm_challenge_category.id = bm_challenge_category_detail.challenge_category_id " +
                " and bm_challenge_category.id = ?) LIMIT  ? OFFSET  ?", [userId, categoryId, info.limit, info.offset], function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }

                    return res.send(success(result, "Data fetched successfully! "));
                });
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}

exports.listOfChallengeLeader = (req, res) => {

    let param = req.query;
    const bloomId = param.bloom_id
    const challangeId = param.challange_id

    let info = common.pagination(param.page);
    try {

        DB.query("SELECT COUNT(bm_users.id) total_bloom_count,bm_users.id,bm_users.name,bm_users.email,bm_users.dob,bm_users.profile_img,bm_users.city FROM bm_users JOIN user_bloom_category ON user_bloom_category.user_id = bm_users.id INNER JOIN user_challenge_category ON user_challenge_category.user_id = user_bloom_category.user_id AND user_challenge_category.challenge_category_detail_id = ? WHERE user_bloom_category.bloom_category_detail_id = ? GROUP BY user_bloom_category.user_id order by total_bloom_count desc LIMIT ? OFFSET ? ", [challangeId, bloomId, info.limit, info.offset], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            result.forEach((e) => {
                e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img
                //   console.log(e.image);
                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
            })
            return res.send(success(result, "Leaders fetched successfully! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}


exports.userChallengeCategory = (req, res) => {
    try {
        const userId = req.user_id
        const {
            challenge_category_detail_id,
            is_join
        } = req.body

        DB.query(`SELECT * FROM bm_challenge_category_detail WHERE id = ? AND deleted_at is null `, [challenge_category_detail_id], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {

                DB.query(`SELECT * FROM user_challenge_category WHERE challenge_category_id = ? AND challenge_category_detail_id = ? and user_id = ? `, [result[0].challenge_category_id, challenge_category_detail_id, userId], function (err, result1) {

                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else if (result1.length > 0) {
                        return res.send(error("Value already exist!!"));
                    }
                    const date = moment().format('YYYY-MM-DD HH:mm:ss');
                    const item = [result[0].challenge_category_id, challenge_category_detail_id, userId, is_join];

                    let sql = `INSERT INTO user_challenge_category ( challenge_category_id,challenge_category_detail_id,user_id ,is_join) VALUES (?,?,?,?)`
                    DB.query(sql, item, function (err, challengeResult) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        else {
                            // GET USER DETAILS
                            let sqlUser = `SELECT * from bm_users where id = ?`
                            DB.query(sqlUser, [userId], function (err, result) {
                                if (err) {
                                    console.log(err);
                                    return res.send(error(constants.SERVER_ERROR));
                                } else {
                                    var notification = result[0].name + ' has join challenge!';
                                    // INSERT NOTIFICATION
                                    let sqlAddNotification = `INSERT INTO bm_notifications (relation_id, user_id, type,sender_id, notification, created_at) VALUES (?,?,?,?,?,?)`
                                    DB.query(sqlAddNotification, [challengeResult.insertId, userId, 3, userId, notification, date], function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            return res.send(error(constants.SERVER_ERROR));
                                        } else {
                                            return res.send(success(result, "Successfull!!!!!"));
                                        }
                                    });

                                }

                            });
                        }
                    });
                });

            } else {
                return res.send(error("Category not found.!"));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }
}

exports.myChallenges = (req, res) => {
    let userId;

    req.query.user_id ?
        userId = req.query.user_id :
        userId = req.user_id

    try {
        DB.query("SELECT user_challenge_category.id, bm_challenge_category_detail.bloom_id ,bm_challenge_category.name as challange_category_name,bm_challenge_category_detail.id as challange_id,bm_challenge_category_detail.title,bm_challenge_category_detail.description ,bm_challenge_category_detail.image" +
            " , user_challenge_category.is_join FROM user_challenge_category JOIN bm_challenge_category on bm_challenge_category.id = user_challenge_category.challenge_category_id " +
            " JOIN bm_challenge_category_detail ON bm_challenge_category_detail.id = user_challenge_category.challenge_category_detail_id " +
            " WHERE user_id = " + userId, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, 'User Challenges!'));
            });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}