const bcrypt = require('bcrypt');
const { success, error } = require('../utils/restResponse');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const env = require('../config/env');
var moment = require('moment');
const { uploadFile } = require('../config/fileUpload');
const fileUpload = require('../config/fileUpload');
const { unitCalculator } = require("../utils/calculator")
const { sharpCompresion } = require('../config/multer');



exports.login = (req, res) => {
    try {
        let param = req.body;
        DB.query('select * from bm_users where email = ?', [param.email], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            else if (result.length <= 0) {
                return res.send(error('Invalid email id!'));
            }
            let u = result[0];
            const follower_following = ` SELECT COUNT(bm_followers.id) as number_of_follower , (SELECT COUNT(bm_followers.id) FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_by = ${u.id} and bm_followers.deleted_at is null ) as number_of_following FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_to = ${u.id} and bm_followers.deleted_at is null `
            DB.query(follower_following, function (err, follows) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                follows[0] ? u.following = follows[0].number_of_following : u.following = 0
                follows[0] ? u.followers = follows[0].number_of_follower : u.followers = 0


                let validUser = bcrypt.compareSync(req.body.password, u.password);

                if (!validUser) {
                    return res.send(error('Invalid Password!'));
                }

                if (u.is_active != 1) {
                    return res.send(error('Inactive user!'));
                }
                var token = jwt.sign({ user_id: u.id, user: u }, env.jwtsecret, {
                    expiresIn: '365d' // expires in 365 days
                });

                u.token = token;
                delete u.password;

                u.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + u.profile_img : 'http' + '://' + u.profile_img


                return res.send(success(u, "Logged in successfully!"));
            })
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.signUp = async (req, res) => {
    try {
        // const file = req.file
        const {
            name,
            email,
            mobile_no,
            password
        } = req.body

        var err1 = '';

        if (name == '') {
            err1 += 'Name is required.';
        }
        if (email == '') {
            err1 += 'Email is required.';
        }
        if (mobile_no == '') {
            err1 += 'Mobile no. is required.';
        }
        if (password == '') {
            err1 += 'Password is required.';
        }
        // if (req.file == undefined || req.file == '') {
        //     err1 += 'Profile Image is required.';
        // }

        if (err1 == '') {

            const createdAt = new Date();
            const salt = bcrypt.genSaltSync(10);
            const hashedPwd = bcrypt.hashSync(password, salt);
            const item = [name, email, mobile_no, hashedPwd, createdAt];

            DB.query(`SELECT * FROM bm_users WHERE mobile_no = ? `, mobile_no, function (err, result1) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } else if (result1.length > 0) {
                    return res.send(error("Mobile Number already exist!!"));
                }

                DB.query(`SELECT * FROM bm_users WHERE email = ? `, email, function (err, result1) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else if (result1.length > 0) {
                        return res.send(error("Email already exist!!"));
                    }

                    let sql = `INSERT INTO bm_users (name, email, mobile_no, password,  createdAt) VALUES (?,?,?,?,?)`
                    DB.query(sql, item, function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        DB.query(`INSERT INTO bm_followers (follow_by, follow_to, status, created_at) VALUES (?,?,?,?)`, [result.insertId, 1, 1, createdAt], function (err, result1) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Registration Complete!!!!"));
                        });
                    });
                });
            });
        } else {
            res.send(error(err1));
        }

    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getUserData = (req, res) => {
    console.log(req.user_id)
    try {
        DB.query("SELECT id, name, email, dob, mobile_no FROM `bm_users` WHERE id = " + req.user_id, function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            let data = result.length > 0 ? result[0] : {};
            return res.send(success(data, 'Active User data!'));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.allUserData = (req, res) => {
    try {
        let whereQuery = " WHERE is_active = 1"
        if (req.query.keyword) {
            whereQuery += ` AND name LIKE '%${req.query.keyword}%'`
        }
        DB.query("SELECT id, profile_img,name, email, dob,about_you, mobile_no FROM `bm_users` " + whereQuery, function (err, result, fields) {
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
            return res.send(success(result, "All Data Fetched Successfully"));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}

// is_followed = 0 no relation     /     is_followed = 1 following      /     is_followed = 2 request pending     /     is_followed = 3 user is blocked     /     is_followed = 4 follow back status


exports.UserDetailsById = (req, res) => {
    try {
        const user_id = req.user_id;
        const target_id = req.params.id
        let whereQuery = ` WHERE u.is_active = 1 and u.id = ${target_id}`

        DB.query(` SELECT u.id,u.name,u.email,u.dob,u.about_you,u.city,u.mobile_no,u.profile_img,  IF(bm_followers.status = 1, 1, 0)  as is_followed, IF(bm_followers.status = 0, 2, 0)  as is_requested FROM bm_users as u left join bm_followers on bm_followers.follow_to = u.id and bm_followers.follow_by = ${user_id} and bm_followers.deleted_at is null and not bm_followers.status = 2 ` + whereQuery, function (err, userDetails, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            userDetails.forEach((e) => {
                e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img

            })
            userDetails[0].is_requested == 2 ? userDetails[0].is_followed = 2 : null;
            DB.query(` SELECT IF(bm_followers.is_blocked = 1, 1, 0) as is_blocked FROM bm_users as u left join bm_followers on bm_followers.follow_to = u.id and bm_followers.follow_by = ${user_id} and bm_followers.deleted_at is null ` + whereQuery, function (err, blockCheck) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                blockCheck[0].is_blocked == 1 ? userDetails[0].is_followed = 3 : null;

                const follower_following = ` SELECT COUNT(bm_followers.id) as number_of_follower , (SELECT COUNT(bm_followers.id) FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_by = ${target_id} and bm_followers.deleted_at is null ) as number_of_following FROM bm_followers WHERE bm_followers.status = 1 and bm_followers.follow_to = ${target_id} and bm_followers.deleted_at is null`
                DB.query(follower_following, function (err, follow) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    delete userDetails[0].is_requested

                    follow[0] ?
                        (userDetails[0].following = follow[0].number_of_following,
                            userDetails[0].followers = follow[0].number_of_follower)
                        : (userDetails[0].following = 0,
                            userDetails[0].followers = 0)
                    DB.query("SELECT * FROM `bm_followers` WHERE follow_by = ? AND follow_to = ? AND status = 1 AND deleted_at IS null", [target_id, user_id], function (err, followBack) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        followBack.length ? userDetails[0].is_followed = 4 : null


                        return res.send(success(userDetails, "All Data Fetched Successfully"));
                    })

                })
            })
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}


exports.updateUserData = (req, res) => {
    try {
        const {
            name,
            dob,
            city,
            about_you,
        } = req.body;

        const user_id = req.user_id;

        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        var err1 = '';

        if (name == '') {
            err1 += 'Please enter Name.';
        }
        if (dob == '') {
            err1 += 'Please Enter Date of Birth.';
        }

        if (err1 == '') {

            let sqlGetUser = `SELECT * from bm_users where id = ?`;
            DB.query(sqlGetUser, [user_id], function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } else if (result.length > 0) {

                    let item = [name, dob, city, about_you, date, user_id];

                    let sql = `UPDATE bm_users set name = ?, dob = ?, city = ?, about_you = ?, updatedAt = ? where id = ?`;
                    DB.query(sql, item, function (err, update_status) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        DB.query("select name,dob,email, city,about_you from bm_users where id = ?", [user_id], function (err, updated_user_data) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success({ update_status, updated_user_data }, "Profile updated successfully.!"));

                        })
                    });

                } else {
                    return res.send(error('User not found.!'));
                }
            });
        } else {
            return res.send(error(err1));
        }
    } catch (e) {
        res.send("Something is wrong");
    }
}

exports.updateProfileImg = async (req, res) => {
    try {
        const userId = req.user_id;
        let file = ""
        var err1 = '';

        if (req.file == undefined || req.file == '') {
            err1 += 'Image is required.';
        } else if (req.file) {
            const result = await sharpCompresion(req)
            if (!result.error) {
                file = result
            } else {
                err1 += "Something is wrong!"
            }

        }
        if (req.body.profile_img == '') {
            err1 += 'Image is required.';
        }
        const item = [file, userId];

        if (err1 == "") {
            DB.query("UPDATE bm_users SET `profile_img`= ? WHERE id = ?", item, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } DB.query("SELECT profile_img FROM bm_users WHERE id = ?", [userId], function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    result[0].profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + result[0].profile_img : 'http' + '://' + result[0].profile_img
                    return res.send(success(result, "Profile image change successfully!!"));
                });
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}


exports.deleteUser = (req, res) => {
    const id = req.params.id;
    try {
        const deletedAt = new Date();

        let item = [deletedAt, id];

        let sql = "UPDATE bm_users SET `deletedAt`=? WHERE id = ?";

        DB.query(sql, item, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "User Data Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.resetPassword = (req, res) => {
    const user_id = req.user_id;
    try {
        const {
            old_password,
            new_password,
            confirm_password
        } = req.body;
        console.log(req.body);
        var err1 = '';

        if (new_password != confirm_password) {
            err1 += 'New password and Confirm password is not matched!!!!.';
        }
        if (err1 == "") {
            DB.query('select * from bm_users where id = ?', [user_id], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                else if (result.length <= 0) {
                    return res.send(error('Invalid User!'));
                }
                let u = result[0];

                let validUser = bcrypt.compareSync(old_password, u.password);

                if (validUser) {
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPwd = bcrypt.hashSync(new_password, salt);

                    let item = [hashedPwd, user_id];

                    let sql = "UPDATE bm_users SET `password`=? WHERE id = ?";

                    DB.query(sql, item, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        return res.send(success(result, "User password reset Successfully!! "));
                    });
                } else {
                    return res.send(success("Old password is wrong!!!!!!"));
                }
            });
        } else {
            return res.send(error(err1));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}

exports.userBlocked = (req, res) => {
    try {
        const user_id = req.user_id;
        const target_id = req.params.id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        if (target_id == user_id) {
            return res.send(error("you can't block your self !"));
        }

        DB.query("SELECT * FROM bm_followers WHERE follow_by = ? AND follow_to = ?  ", [user_id, target_id], async function (err, result1) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));

            }
            if (result1.length) {
                if (result1[0].is_blocked == '1') {

                    DB.query("UPDATE `bm_followers` SET is_blocked = 0 , updated_at = ? WHERE follow_by=? and follow_to = ? ", [date, user_id, target_id], async function (err, result2) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        } return res.send(success([], "unblocked successfully ! "));
                    })


                } else if (result1[0].is_blocked == '0') {

                    DB.query(" UPDATE `bm_followers` SET is_blocked = 1 ,status = 2 , updated_at = ? WHERE follow_by=? and follow_to = ? ", [date, user_id, target_id], async function (err, result3) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        } return res.send(success([], "blocked successfully ! "));
                    })


                }
            }
            else {
                DB.query("INSERT INTO `bm_followers`( `follow_by`, `follow_to`, `status`, `is_blocked`,created_at) VALUES (?,?,?,?,?) ", [user_id, target_id, 2, 1, date], async function (err, result4) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } return res.send(success([], "blocked successfully ! "));
                })

            }
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}


exports.listOfNotification = async (req, res) => {
    const userId = req.user_id
    try {
        DB.query("SELECT `like_notification_status` as 'like', `comment_notification_status` as 'comment', follower_request_on_off as 'follower' ,accept_follow_req_notification_on_off as 'accept' FROM `bm_notification_on_off` WHERE user_id = ?", [userId], (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            let sql = ""
            if (result.length) {
                const { like, comment, follower, accept } = result[0]
                sql = " SELECT bm_notifications.id,bm_notifications.relation_id ,bm_notifications.notification, bm_notifications.type,bm_notifications.seen, IF(bm_notifications.type = 1, picture.image, 0) as image_url,IF(bm_notifications.type = 1, picture.id, 0) " +
                    " as image_id, profile_pic.id as sender_id, profile_pic.profile_img as sender_pic FROM bm_notifications LEFT JOIN(SELECT id, image FROM bm_posts) as picture ON bm_notifications.relation_id = picture.id " +
                    " LEFT JOIN(SELECT id, profile_img FROM bm_users) as profile_pic ON bm_notifications.sender_id = profile_pic.id WHERE bm_notifications.user_id = ? AND bm_notifications.deleted_at is null AND NOT ( bm_notifications.sender_id = ? AND bm_notifications.type = 1 ) "

                like == 1 ? sql += " AND NOT bm_notifications.notification_mode = 1 " : null

                comment == 1 ? sql += " AND NOT bm_notifications.notification_mode = 2 " : null

                follower == 1 ? sql += " AND NOT bm_notifications.type = 2  " : null

                accept == 1 ? sql += " AND NOT bm_notifications.type = 3  " : null
                sql += " order by bm_notifications.created_at desc "

            } else {
                sql = " SELECT bm_notifications.id,bm_notifications.relation_id ,bm_notifications.notification, bm_notifications.type,bm_notifications.seen, IF(bm_notifications.type = 1, picture.image, 0) as image_url,IF(bm_notifications.type = 1, picture.id, 0) " +
                    " as image_id, profile_pic.id as sender_id, profile_pic.profile_img as sender_pic FROM bm_notifications LEFT JOIN(SELECT id, image FROM bm_posts) as picture ON bm_notifications.relation_id = picture.id " +
                    " LEFT JOIN(SELECT id, profile_img FROM bm_users) as profile_pic ON bm_notifications.sender_id = profile_pic.id WHERE bm_notifications.user_id = ? AND bm_notifications.deleted_at is null AND NOT ( bm_notifications.sender_id = ? AND bm_notifications.type = 1 ) order by bm_notifications.created_at desc "

            }

            DB.query(sql, [userId, userId], function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }

                result.forEach((e) => {
                    e.image_url = req.connection && req.connection.encrypted ? 'https' + '://' + e.image_url : 'http' + '://' + e.image_url
                    e.sender_pic = req.connection && req.connection.encrypted ? 'https' + '://' + e.sender_pic : 'http' + '://' + e.sender_pic

                    //   console.log(e.image);
                    // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                    // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
                })


                // console.log(result, "fsdfsd");
                return res.send(success(result, "All notifications!!! "));

            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.blockedUsers = (req, res) => {
    const user_id = req.user_id
    try {
        DB.query("SELECT id, name, email, dob, mobile_no FROM `bm_users` WHERE id in(select follow_to from bm_followers where follow_by = ? and is_blocked = 1 ) ", [user_id], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, 'Blocked Users!'));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.api = (req, res) => {
    try {
        DB.query('SELECT * FROM `api`', async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result[0].title, "API........"));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}