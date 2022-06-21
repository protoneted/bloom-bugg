const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');

// SEND FOLLOW REQUEST
exports.sendRequest = (req, res) => {
    try {

        const {
            follow_to_user_id,
        } = req.body

        const follow_by_user_id = req.user_id;
        if (follow_to_user_id == follow_by_user_id) {
            return res.send(error("You can't follow youself!"));

        }
        // CHECK REQUESTED USER DETAILS
        let sqlCheckUser = `SELECT * FROM bm_users where id = ?`;
        DB.query(sqlCheckUser, [follow_to_user_id], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {

                // CHECK PENDING OR APPROVED REQUEST OF SAME USER
                let sqlCheckPendingRequest = `SELECT id FROM bm_followers where follow_by = ? and follow_to = ? and (status = 0 or status = 1) and deleted_at is null`;
                DB.query(sqlCheckPendingRequest, [follow_by_user_id, follow_to_user_id], function (err, result) {

                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else if (result.length > 0) {
                        return res.send(error('You have already sent follow request to this user.'));
                    } else {

                        const date = moment().format('YYYY-MM-DD HH:mm:ss');
                        const item = [follow_by_user_id, follow_to_user_id, 0, date];

                        // SEND FOLLOW REQUEST
                        let sql = `INSERT INTO bm_followers (follow_by, follow_to, status, created_at) VALUES (?,?,?,?)`
                        DB.query(sql, item, function (err, followResult) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            } else {

                                // GET USER DETAILS
                                let sqlUser = `SELECT name from bm_users where id = ?`
                                DB.query(sqlUser, [follow_by_user_id], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        return res.send(error(constants.SERVER_ERROR));
                                    } else {

                                        var notification = result[0].name + ' has requested to follow you.';

                                        // INSERT NOTIFICATION
                                        let sqlAddNotification = `INSERT INTO bm_notifications (relation_id, user_id, type ,sender_id, notification, created_at) VALUES (?,?,?,?,?,?)`
                                        DB.query(sqlAddNotification, [followResult.insertId, follow_to_user_id, 2, follow_by_user_id, notification, date], function (err, result) {
                                            if (err) {
                                                console.log(err);
                                                return res.send(error(constants.SERVER_ERROR));
                                            } else {
                                                return res.send(success(result, "Follow request sent successfully.!"));
                                            }
                                        });

                                    }

                                });
                            }
                        });

                    }
                });

            } else {
                return res.send(error('Requested user not found.'));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}


exports.unfollowUser = (req, res) => {
    try {

        const {
            follow_to_user_id,
        } = req.body

        const follow_by_user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        DB.query("SELECT * FROM `bm_followers` WHERE follow_by = ? and follow_to = ? and status = 1 and deleted_at is null ", [follow_by_user_id, follow_to_user_id], function (err, is_follow) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            if (is_follow[0]) {
                let sql = `UPDATE bm_followers set deleted_at = ? where follow_by = ? and follow_to = ?  `;
                DB.query(sql, [date, follow_by_user_id, follow_to_user_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Unfollowed Successfully!"));

                });
            } else {
                DB.query("SELECT * FROM `bm_followers` WHERE follow_by = ? and follow_to = ? and status = 0 and deleted_at is null ", [follow_by_user_id, follow_to_user_id], function (err, is_requested) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (is_requested[0]) {
                        let sql = `UPDATE bm_followers set status = ?,updated_at = ? where follow_by = ? and follow_to = ?  `;
                        DB.query(sql, [2, date, follow_by_user_id, follow_to_user_id], function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "request cancelled Successfully!"));

                        });
                    } else {
                        return res.send(error("Something is wrong!"));
                    }
                })


            }
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

// UPDATE FOLLOW REQUEST STATUS
exports.updateStatus = (req, res) => {
    try {

        const {
            follow_request_id,
            status,
            notification_id
        } = req.body

        const login_user_id = req.user_id;

        // CHECK FOLLOW REQUEST
        let sqlCheckUser = `SELECT * FROM bm_followers where id = ? and follow_to = ? and status = 0`;
        DB.query(sqlCheckUser, [follow_request_id, login_user_id], function (err, reqResult) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (reqResult.length > 0) {

                const date = moment().format('YYYY-MM-DD HH:mm:ss');

                // UPDATE FOLLOW REQUEST STATUS
                let sql = `UPDATE bm_followers set status = ?, updated_at = ? where id = ? and follow_to = ? `
                DB.query(sql, [status, date, follow_request_id, login_user_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else {

                        // GET USER DETAILS
                        let sqlUserDetails = `SELECT name from bm_users where id = ? `;
                        DB.query(sqlUserDetails, [login_user_id], function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            } else {

                                if (status == 1) {
                                    var notification = result[0].name + ' has approved your follow request.';
                                    DB.query("SELECT `id` FROM `bm_followers` WHERE follow_by = ? and follow_to = ? AND status = 1 AND deleted_at is null ", [login_user_id,  reqResult[0].follow_by], function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            return res.send(error(constants.SERVER_ERROR));
                                        }
                                        if(result[0]){
                                            DB.query(" UPDATE `bm_notifications` SET `type`= 3 ,`seen`= 1,`deleted_at`=? WHERE id = ? ", [date, notification_id], function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.send(error(constants.SERVER_ERROR));
                                                }
                                            })
                                        } else {
                                            DB.query(" UPDATE `bm_notifications` SET `type`= 4 ,`seen`= 0,`updated_at`=? WHERE id = ? ", [date, notification_id], function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.send(error(constants.SERVER_ERROR));
                                                }
                                            })
                                        }
                                        
                                    })
                                  
                                } else {
                                    var notification = result[0].name + ' has rejected your follow request.';
                                    DB.query(" UPDATE `bm_notifications` SET `type`= 3 ,`seen`= 1,`deleted_at`=? WHERE id = ? ", [date, notification_id], function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            return res.send(error(constants.SERVER_ERROR));
                                        }
                                    })
                                }

                                // SEND NOTIFICATION
                                let sql = `INSERT INTO bm_notifications set relation_id = ?, user_id = ?, type = ?, sender_id= ?, notification = ?, created_at = ? `
                                DB.query(sql, [reqResult[0].id, reqResult[0].follow_by, 3, login_user_id, notification, date], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        return res.send(error(constants.SERVER_ERROR));
                                    } else {
                                        if (status == 1) {
                                            return res.send(success(result, "Request approved successfully.!"));
                                        } else {
                                            return res.send(success(result, "Request rejected successfully.!"));
                                        }
                                    }
                                });

                            }
                        });

                    }
                });

            } else {
                return res.send(error('Request not found.'));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}


// LOGIN USER'S FOLLOW REQUEST LIST
exports.followRequestList = (req, res) => {
    try {

        const login_user_id = req.user_id;
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query(`SELECT bm_users.id,bm_users.name, bm_users.profile_img,bm_followers.id as follow_request_id FROM bm_followers JOIN bm_users ON bm_users.id = bm_followers.follow_by where bm_followers.follow_to = ? and bm_followers.status = 0 and bm_followers.deleted_at is null order by bm_followers.created_at desc LIMIT  ? OFFSET  ?`, [login_user_id, info.limit, info.offset], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }

            result.forEach((e) => {
                e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img
                // console.log(e.image);
                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
            })
            return res.send(success(result, "Follow Request list"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

// LOGIN USER'S FOLLOWERS LIST
exports.listOfFollowers = (req, res) => {
    try {
        const user_id = req.user_id;
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select user.name as user_name,user.profile_img, follower.* from bm_followers as follower INNER JOIN bm_users as user on user.id = follower.follow_by where follower.follow_to = ? and follower.deleted_at is null and follower.status = 1 order by follower.created_at desc LIMIT  ? OFFSET  ?', [user_id, info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            result.forEach((e) => {
                e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img
                // console.log(e.image);
                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
            })
            return res.send(success(result, "Followers list"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

// LOGIN USER'S FOLLOWING LIST
exports.listOfFollowing = (req, res) => {
    try {
        const user_id = req.user_id;
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select user.name as user_name,user.profile_img, follower.* from bm_followers as follower INNER JOIN bm_users as user on user.id = follower.follow_to where follower.follow_by = ? and follower.deleted_at is null and follower.status = 1 order by follower.created_at desc LIMIT  ? OFFSET  ?', [user_id, info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            result.forEach((e) => {
                e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img
                // console.log(e.image);
                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
            })
            return res.send(success(result, "Following User list"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

// DELETE FOLLOW REQUEST
exports.deleteFollowRequest = (req, res) => {
    try {

        const {
            follow_request_id,
        } = req.body

        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        // CHECK REQUEST IS AVAILABLE OR NOT
        let sqlCheckPendingRequest = `SELECT id FROM bm_followers where id = ? and follow_to = ? and status = 0 and deleted_at is null`;
        DB.query(sqlCheckPendingRequest, [follow_request_id, user_id], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {

                let sql = `UPDATE bm_followers set deleted_at = ? where follow_to = ? and id = ? `;
                DB.query(sql, [date, user_id, follow_request_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else {
                        return res.send(success(result, "Request deleted successfully.!"));
                    }
                });

            } else {
                return res.send(error('Request not found.'));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.followersCount = (req, res) => {
    try {
        const id = req.user_id;
        DB.query(` SELECT COUNT(bm_followers.id) as number_of_follower , (SELECT COUNT(bm_followers.id) FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_by = ${id} and bm_followers.deleted_at is null ) as number_of_following FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_to = ${id} and bm_followers.deleted_at is null `, function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Follow Request list"));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}