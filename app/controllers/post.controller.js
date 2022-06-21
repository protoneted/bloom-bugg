const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');
const fileUpload = require('../config/fileUpload');
const { uploadFile } = require('../config/fileUpload');
const db = require('../config/db.config');
const { sharpCompresion } = require('../config/multer');
const fs = require('fs');

exports.create = async (req, res) => {
    try {

        const {
            title,
            description,
        } = req.body
        let file = ""
        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

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
        if (req.body.image == '') {
            err1 += 'Image is required.';
        }

        if (err1 == '') {

            if (req.body.bloom_id != undefined && req.body.bloom_id > 0) {
                var bloom_id = req.body.bloom_id;
                var is_reward_eligible = 1;
            } else {
                var bloom_id = 0;
                var is_reward_eligible = 0;
            }
            // console.log(image);
            const item = [user_id, title, file, description, date];

            let sql = `INSERT INTO bm_posts (user_id, title, image, description, created_at) VALUES (?,?,?,?,?)`
            DB.query(sql, item, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success({ is_reward_eligible, result }, "Post Created Successfully.!"));
            });

        } else {
            res.send(error(err1));
        }

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }
}

exports.postVideo = (req, res) => {
    const user_id = req.user_id;
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    try {

        const {
            title,
            description,
        } = req.body

        let video = "";
        var err1 = '';

        const videosPaths = req.file

        if (videosPaths.size > 10000000) {
            err1 += 'Max size is 10MB!!!!';

            fs.unlinkSync(`${videosPaths.destination}/${videosPaths.filename}`)
        }

        if (videosPaths == undefined || videosPaths == '') {
            err1 += 'Video is required.';
        }
        else {
            video = env.videoURL + videosPaths.path;
        }
        if (title == '') {
            err1 += 'Name is required.';
        }

        const item = [user_id, title, video, description, date];

        if (err1 == '') {
            let sql = `INSERT INTO bm_posts (user_id, title, image, description, created_at) VALUES (?,?,?,?,?)`
            DB.query(sql, item, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Post Created Successfully.!"));
            });
        } else {
            res.send(error(err1.toString()));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.listOfPosts = (req, res) => {
    try {
        let user_id;

        req.query.user_id ?
            user_id = req.query.user_id :
            user_id = req.user_id

        // const user_id = req.user_id;

        let param = req.query;

        let info = common.pagination(param.page);


        if (param.type == 1) {
            // " SELECT bm_posts.image,bm_posts.bloom_id FROM bm_posts WHERE bm_posts.user_id = ? and bm_posts.bloom_id IS NOT null and bm_posts.image IS NOT NULL LIMIT ? OFFSET ?"
            DB.query("select user.name as user_name, user.profile_img as user_profile_img, post.*, (SELECT count(bm_post_comments.id) AS comments FROM bm_post_comments " +
                " WHERE bm_post_comments.post_id = post.id) as total_comments, likes.total_likes from bm_posts as post left JOIN bm_users as user on user.id = post.user_id " +
                " and post.image is not null left join bm_post_like_unlike post_like on post_like.post_id = post.id and post_like.user_id = ? LEFT JOIN(SELECT bm_post_like_unlike.post_id, " +
                " COUNT(bm_post_like_unlike.id) as total_likes FROM bm_post_like_unlike WHERE bm_post_like_unlike.status = 1 GROUP BY bm_post_like_unlike.post_id) as likes " +
                " ON post.id = likes.post_id where post.deleted_at is null and post.user_id = ? and(post.bloom_id IS NOT NULL and post.image IS NOT NULL) order by post.created_at desc LIMIT ? OFFSET ? ", [user_id, user_id, info.limit, info.offset], function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    result.forEach((e) => {
                        e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
                        e.user_profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.user_profile_img : 'http' + '://' + e.user_profile_img

                    })
                    return res.send(success(result, 'My blooms!'));
                });
        } else if (param.type == 2) {
            DB.query('select user.name as user_name, user.profile_img as user_profile_img, post.*, IF(post_like.status = 1, 1, 0) as is_like ,IF(post_like.status = 2, 1, 0) as is_unlike, ' +
                '  ( SELECT count(bm_post_comments.id) AS comments FROM bm_post_comments WHERE bm_post_comments.post_id = post.id) as total_comments,likes.total_likes from ' +
                ' bm_posts as post left JOIN bm_users as user on user.id = post.user_id and post.image is not null left join bm_post_like_unlike post_like ' +
                ' on post_like.post_id = post.id and  post_like.user_id = ? LEFT JOIN(SELECT bm_post_like_unlike.post_id, COUNT(bm_post_like_unlike.id) as total_likes FROM bm_post_like_unlike ' +
                ' WHERE bm_post_like_unlike.status = 1 GROUP BY bm_post_like_unlike.post_id) as likes ON post.id = likes.post_id where post.deleted_at is null  and  post.user_id = ? ' +
                " and ( post.bloom_id is null or bloom_id = '') order by post.created_at desc LIMIT ? OFFSET ? "
                , [user_id, user_id, info.limit, info.offset], async function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }

                    result.forEach((e) => {
                        e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
                        e.user_profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.user_profile_img : 'http' + '://' + e.user_profile_img


                    })
                    return res.send(success(result, "My Posts list"));

                });
        } else if (param.type == 3) {
            DB.query("select user.name as user_name, user.profile_img as user_profile_img, post.*, IF(post_like.status = 1, 1, 0) as is_like ,IF(post_like.status = 2, 1, 0) as is_unlike , " +
                " ( SELECT count(bm_post_comments.id) AS comments FROM bm_post_comments WHERE bm_post_comments.post_id = post.id) as total_comments,likes.total_likes from " +
                " bm_posts as post INNER JOIN bm_users as user on user.id = post.user_id and post.image is not null left join bm_post_like_unlike post_like on post_like.post_id = post.id " +
                " and post_like.user_id = ? LEFT JOIN(SELECT bm_post_like_unlike.post_id, COUNT(bm_post_like_unlike.id) as total_likes FROM bm_post_like_unlike " +
                " WHERE bm_post_like_unlike.status = 1 GROUP BY bm_post_like_unlike.post_id) as likes ON post.id = likes.post_id where post.deleted_at is null  " +
                "  order by post.created_at desc LIMIT ? OFFSET ?"
                , [user_id, info.limit, info.offset], async function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    result.forEach((e) => {
                        e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
                        e.user_profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.user_profile_img : 'http' + '://' + e.user_profile_img

                    })
                    return res.send(success(result, "All Post list"));
                });
        } else {

            DB.query("select user.name as user_name, user.profile_img as user_profile_img, post.*, IF(post_like.status = 1, 1, 0) as is_like ,IF(post_like.status = 2, 1, 0) as is_unlike , " +
                " ( SELECT count(bm_post_comments.id) AS comments FROM bm_post_comments WHERE bm_post_comments.post_id = post.id) as total_comments,likes.total_likes from " +
                " bm_posts as post INNER JOIN bm_users as user on user.id = post.user_id and post.image is not null left join bm_post_like_unlike post_like on post_like.post_id = post.id " +
                " and post_like.user_id = ? LEFT JOIN(SELECT bm_post_like_unlike.post_id, COUNT(bm_post_like_unlike.id) as total_likes FROM bm_post_like_unlike " +
                " WHERE bm_post_like_unlike.status = 1 GROUP BY bm_post_like_unlike.post_id) as likes ON post.id = likes.post_id where   post.deleted_at is null  and " +
                "  post.user_id IN(SELECT follow_to FROM bm_followers WHERE follow_by = ? and status = 1 and deleted_at is null  ) or post.user_id = ?  order by post.created_at desc LIMIT ? OFFSET ?"
                , [user_id, user_id, user_id, info.limit, info.offset], async function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    result.forEach((e) => {
                        e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
                        e.user_profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.user_profile_img : 'http' + '://' + e.user_profile_img
                        // console.log(e.image);
                        // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                        // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
                    })

                    return res.send(success(result, "Post list"));
                });

        }

    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}


exports.myPosts = (req, res) => {
    try {
        const user_id = req.user_id;

        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select user.name as user_name, user.profile_img as user_profile_img, post.*, IF(post_like.status = 1, 1, 0) as is_like ' +
            ' from bm_posts as post left JOIN bm_users as user on user.id = post.user_id left join bm_post_like_unlike post_like ' +
            ' on post_like.post_id = post.id and  post_like.user_id = ? where post.deleted_at is null and  post.user_id = ? ' +
            " and ( post.bloom_id is null or bloom_id = '') order by post.created_at desc LIMIT ? OFFSET ? "
            , [user_id, user_id, info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "My Posts list"));

            });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.postLikeUnlike = (req, res) => {
    try {

        const {
            post_id,
            status,
        } = req.body

        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        let sqlCheckPost = `SELECT * FROM bm_posts where id = ?`;
        DB.query(sqlCheckPost, [post_id], function (err, postResult) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (postResult.length > 0) {

                let sqlCheckLike = `select * from bm_post_like_unlike where post_id = ? and  user_id = ?`;
                DB.query(sqlCheckLike, [post_id, user_id], function (err, result) {

                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else if (result.length > 0) {

                        let sqlUpdate = `Update bm_post_like_unlike set status = ?, updated_at = ? where post_id = ? and user_id = ? `;
                        DB.query(sqlUpdate, [status, date, post_id, user_id], function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            } else {

                                if (status == 1) {
                                    return res.send(success(result, "Post liked successfully.!"));
                                } else if (status == 0) {
                                    return res.send(success(result, "Post unliked successfully.!"));
                                }

                            }
                        });

                    } else {

                        let sqlInsert = `INSERT into bm_post_like_unlike set status = ?, post_id = ?, user_id = ?, created_at = ? `;
                        DB.query(sqlInsert, [status, post_id, user_id, date], function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            } else {
                                if (status == 1) {

                                    let sqluserDetails = `select name from bm_users where id = ? `;
                                    DB.query(sqluserDetails, [user_id], function (err, userDetails) {
                                        if (err) {
                                            console.log(err);
                                            return res.send(error(constants.SERVER_ERROR));
                                        }
                                        if (postResult[0].user_id != user_id) {
                                            var notification = userDetails[0].name + ' has liked your post.';

                                            let sqlSendNotification = `INSERT into bm_notifications set relation_id = ?, user_id = ?, type = ?,notification_mode = ?,sender_id = ?, notification = ?, created_at = ? `;
                                            DB.query(sqlSendNotification, [postResult[0].id, postResult[0].user_id, 1, 1, user_id, notification, date], function (err, result) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.send(error(constants.SERVER_ERROR));
                                                } else {
                                                    return res.send(success(result, "Post liked successfully.!"));
                                                }
                                            });

                                        } else { return res.send(success(result, "Post liked successfully.!")); }
                                    });

                                } else if (status == 0) {
                                    return res.send(success(result, "Post unliked successfully.!"));
                                }
                            }
                        });

                    }

                });

            } else {
                return res.send(error('Post not found.'));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.postDelete = (req, res) => {
    try {

        let post_id = req.params.id;

        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        let sql = ` UPDATE bm_posts SET deleted_at= ? WHERE id = ? `;
        DB.query(sql, [date, post_id], function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success([], "Post deleted successfully.!"));
        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}
exports.addComment = (req, res) => {
    try {

        const {
            post_id,
            comment,
        } = req.body

        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');


        let sqlCheckPost = `SELECT * FROM bm_posts where id = ?`;
        DB.query(sqlCheckPost, [post_id], function (err, postResult) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (postResult.length > 0) {

                let sqlUpdate = `INSERT INTO bm_post_comments set post_id = ?, user_id = ?, comment = ?, created_at = ? `;
                DB.query(sqlUpdate, [post_id, user_id, comment, date], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else {
                        let sqluserDetails = `select name from bm_users where id = ? `;
                        DB.query(sqluserDetails, [user_id], function (err, userDetails) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            if (postResult[0].user_id != user_id) {
                                var notification = userDetails[0].name + ' has commented on your post.';

                                let sqlSendNotification = `INSERT into bm_notifications set relation_id = ?, user_id = ?, type = ?,notification_mode = ?,sender_id = ?, notification = ?, created_at = ? `;
                                DB.query(sqlSendNotification, [postResult[0].id, postResult[0].user_id, 1, 2, user_id, notification, date], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        return res.send(error(constants.SERVER_ERROR));
                                    } else {
                                        return res.send(success(result, "Comment added successfully.!"));
                                    }
                                });

                            } else {
                                return res.send(success(result, "Comment added successfully.!"));
                            }
                        });
                    }
                });

            } else {
                return res.send(error('Post not found.'));
            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.comments = (req, res) => {
    try {

        let param = req.query;
        let info = common.pagination(param.page);

        const { post_id } = param

        let sqlCheckPost = `SELECT bm_post_comments.id , bm_post_comments.comment , bm_post_comments.created_at , bm_users.id as user_id ,bm_users.name as user_name , bm_users.profile_img, user_liked FROM bm_post_comments JOIN bm_users ON bm_users.id = bm_post_comments.user_id where bm_post_comments.post_id = ? and bm_users.is_active = 1 order by bm_post_comments.created_at desc LIMIT  ? OFFSET  ? `;
        DB.query(sqlCheckPost, [post_id, info.limit, info.offset], function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {
                result.forEach((e) => {
                    e.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + e.profile_img : 'http' + '://' + e.profile_img
                    // console.log(e.image);
                    // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                    // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
                })
                return res.send(success(result, "Comments Fetched successfully.!"));
            } else {
                return res.send(error('Comments not found.'));
            }
        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.savePost = (req, res) => {
    try {

        const {
            post_id,
        } = req.body

        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        // CHECK POST IS ALREADY SAVED OR NOT?
        let sqlSavedPost = `SELECT * FROM bm_saved_post where id = ? and user_id = ?`;
        DB.query(sqlSavedPost, [post_id, user_id], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {
                return res.send(error('You have already saved this post.'));
            } else {

                let sqlUpdate = `INSERT INTO bm_saved_post set post_id = ?, user_id = ?, created_at = ? `;
                DB.query(sqlUpdate, [post_id, user_id, date], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else {
                        return res.send(success(result, "Post saved successfully.!"));
                    }
                });

            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.listOfSavedPost = (req, res) => {
    try {
        const user_id = req.user_id;
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select post.* from bm_saved_post as saved INNER JOIN bm_posts as post on post.id = saved.post_id where saved.user_id = ? and saved.deleted_at is null order by saved.created_at desc LIMIT  ? OFFSET  ?', [user_id, info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Saved Post list"));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.commentListByPostId = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select user.name as user_name, user.profile_img as user_profile_img, comment.* from bm_post_comments as comment INNER JOIN bm_users as user on user.id = comment.user_id where comment.post_id = ? and comment.deleted_at is null order by comment.created_at desc LIMIT  ? OFFSET  ?', [param.post_id, info.limit, info.offset], async function (err, result) {
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
            return res.send(success(result, "Comment list"));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}
exports.createPost = (req, res) => {
    try {
        const file = req.file

        const {

        } = req.body

        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        var err1 = '';

        if (req.file == undefined || req.file == '') {
            err1 += 'Image is required.';
        }
        if (req.body.description == '') {
            err1 += 'Description is required.';
        }
        if (req.body.image == '') {
            err1 += 'Image is required.';
        }

        if (err1 == '') {

            if (req.body.bloom_id != undefined && req.body.bloom_id > 0) {
                var bloom_id = req.body.bloom_id;
                var is_reward_eligible = 1;
            } else {
                var bloom_id = 0;
                var is_reward_eligible = 0;
            }
            // Image link change
            const image = env.imageURL + file.path;
            console.log(image);
            const item = [user_id, title, image, description, date];

            let sql = `INSERT INTO bm_posts (user_id, title, image, description, created_at) VALUES (?,?,?,?,?)`
            DB.query(sql, item, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success({ is_reward_eligible, result }, "Post Created Successfully.!"));
            });

        } else {
            res.send(error(err1));
        }
    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }
}

exports.likeComment = (req, res) => {
    try {
        const user_id = req.user_id;
        let comment_id = req.params.id;

        DB.query('select bm_post_comments.user_liked,bm_post_comments.post_id from bm_post_comments where bm_post_comments.id =? ', [comment_id], async function (err, result1) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            DB.query('select id from bm_posts where bm_posts.id = ? ', [result1[0].post_id], async function (err, result12) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                if (result12.length) {

                    result1[0].user_liked ? xyz = result1[0].user_liked.split(",") : xyz = []

                    if (result1[0].user_liked && result1[0].user_liked.split(",").includes(`${user_id}`)) {

                        let filtered = xyz.filter((e) => {
                            return e != user_id
                        })

                        DB.query('UPDATE `bm_post_comments` SET `user_liked` = ?  WHERE id = ?   ', [filtered.toString(), comment_id], async function (err, result1) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                        })

                        return res.send(success("you disliked this comment "));
                    } else {
                        xyz.push(`${user_id}`)
                        DB.query('UPDATE `bm_post_comments` SET `user_liked` = ?  WHERE id = ?   ', [xyz.toString(), comment_id], async function (err, result1) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                        })
                        return res.send(success("you liked this comment "));

                    }
                } else {
                    return res.send(error("post doesn't exist! "));

                }

            })
        });

    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.reportPost = (req, res) => {
    try {
        const {
            post_id,
            description
        } = req.body
        const user_id = req.user_id;
        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        let sqlCheckPost = "SELECT report,user_id FROM `bm_posts` WHERE id = ?";
        DB.query(sqlCheckPost, [post_id], function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length) {
                if (result[0].user_id == user_id) {
                    return res.send(error("You can't report your post! "));
                }
                DB.query("SELECT * FROM `reported_posts` WHERE user_id = ?  and  post_id = ?", [user_id, post_id], function (err, is_reported) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }

                    if (!is_reported.length) {

                        let report = result[0].report + 1
                        DB.query("UPDATE `bm_posts` SET report= ?  WHERE id = ? ", [report, post_id], function (err, reportCount) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            DB.query("INSERT INTO `reported_posts`( `user_id`, `post_id`, description, `created_at`) VALUES (?,?,?,?)", [user_id, post_id, description, date], function (err, reported) {
                                if (err) {
                                    console.log(err);
                                    return res.send(error(constants.SERVER_ERROR));
                                }
                                return res.send(success([], "Reported Successfully! "));

                            });
                        });
                    } else {
                        return res.send(error("You already reported this post! "));

                    }
                })
            } else {
                return res.send(error("Something is wrong!"));
            }
        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}


exports.likeNotificationOnOff = (req, res) => {
    const user_id = req.user_id;
    try {

        DB.query(`SELECT user_id FROM bm_notification_on_off WHERE user_id = ?`, user_id, function (err, result1) {
            if (result1.length == 0) {

                let sql = `INSERT INTO bm_notification_on_off ( user_id, like_notification_status) VALUES (?,?)`
                DB.query(sql, [user_id, 1], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Notification OFF"));
                });

            } else {
                DB.query(" SELECT `like_notification_status` FROM `bm_notification_on_off` WHERE user_id = ?", [user_id], (err, status) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (status[0].like_notification_status == 1) {
                        let sql = "UPDATE bm_notification_on_off SET `like_notification_status`=? WHERE user_id = ?";

                        DB.query(sql, [0, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Notification On "));
                        });
                    } else {
                        let sql = "UPDATE bm_notification_on_off SET `like_notification_status`=? WHERE user_id = ?";

                        DB.query(sql, [1, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Notification Off "));
                        });
                    }
                });
            }

        })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.commentNotificationOnOff = (req, res) => {
    const user_id = req.user_id;
    try {

        DB.query(`SELECT user_id FROM bm_notification_on_off WHERE user_id = ?`, user_id, function (err, result1) {
            if (result1.length == 0) {

                let sql = `INSERT INTO bm_notification_on_off ( user_id, comment_notification_status) VALUES (?,?)`
                DB.query(sql, [user_id, 1], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Notification OFF"));
                });

            } else {
                DB.query(" SELECT `comment_notification_status` FROM `bm_notification_on_off` WHERE user_id = ?", [user_id], (err, status) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (status[0].comment_notification_status == 1) {
                        let sql = "UPDATE bm_notification_on_off SET `comment_notification_status`=? WHERE user_id = ?";

                        DB.query(sql, [0, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Notification On "));
                        });
                    } else {
                        let sql = "UPDATE bm_notification_on_off SET `comment_notification_status`=? WHERE user_id = ?";

                        DB.query(sql, [1, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Notification Off "));
                        });
                    }
                });
            }

        })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.followerRequestOnOff = (req, res) => {
    const user_id = req.user_id;
    try {

        DB.query(`SELECT user_id FROM bm_notification_on_off WHERE user_id = ?`, user_id, function (err, result1) {
            if (result1.length == 0) {

                let sql = `INSERT INTO bm_notification_on_off ( user_id, follower_request_on_off) VALUES (?,?)`
                DB.query(sql, [user_id, 1], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Follower request notification OFF!!!!"));
                });

            } else {
                DB.query(" SELECT `follower_request_on_off` FROM `bm_notification_on_off` WHERE user_id = ?", [user_id], (err, status) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (status[0].follower_request_on_off == 1) {
                        let sql = "UPDATE bm_notification_on_off SET `follower_request_on_off`=? WHERE user_id = ?";

                        DB.query(sql, [0, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Follower request notification On!!!"));
                        });
                    } else {
                        let sql = "UPDATE bm_notification_on_off SET `follower_request_on_off`=? WHERE user_id = ?";

                        DB.query(sql, [1, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Follower request notification Off!!!"));
                        });
                    }
                });
            }

        })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.acceptFollowRequestOnOff = (req, res) => {
    const user_id = req.user_id;
    try {

        DB.query(`SELECT user_id FROM bm_notification_on_off WHERE user_id = ?`, user_id, function (err, result1) {
            if (result1.length == 0) {

                let sql = `INSERT INTO bm_notification_on_off ( user_id, accept_follow_req_notification_on_off) VALUES (?,?)`
                DB.query(sql, [user_id, 1], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Accept follow request notification OFF!!!!"));
                });

            } else {
                DB.query(" SELECT `accept_follow_req_notification_on_off` FROM `bm_notification_on_off` WHERE user_id = ?", [user_id], (err, status) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (status[0].accept_follow_req_notification_on_off == 1) {
                        let sql = "UPDATE bm_notification_on_off SET `accept_follow_req_notification_on_off`=? WHERE user_id = ?";

                        DB.query(sql, [0, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Accept follow request notification On!!!"));
                        });
                    } else {
                        let sql = "UPDATE bm_notification_on_off SET `accept_follow_req_notification_on_off`=? WHERE user_id = ?";

                        DB.query(sql, [1, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "Accept follow request notification Off!!!"));
                        });
                    }
                });
            }

        })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.profilePrivate = (req, res) => {
    const user_id = req.user_id;
    try {

        DB.query(`SELECT id FROM bm_users WHERE id = ?`, user_id, function (err, result1) {
            if (result1.length == 0) {

                // let sql = `INSERT INTO bm_users ( user_id, accept_follow_req_notification_on_off) VALUES (?,?)`
                // DB.query(sql, [user_id, 1], function (err, result) {
                //     if (err) {
                //         console.log(err);
                //         return res.send(error(constants.SERVER_ERROR));
                //     }
                //     return res.send(success(result, "Accept follow request notification OFF!!!!"));
                // });
                console.log("kaik ave chhe");

            } else {
                DB.query(" SELECT `is_private` FROM `bm_users` WHERE id = ?", [user_id], (err, status) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    if (status[0].is_private == 0) {
                        let sql = "UPDATE bm_users SET `is_private`=? WHERE id = ?";

                        DB.query(sql, [1, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "You're profile is private!!!"));
                        });
                    } else {
                        let sql = "UPDATE bm_users SET `is_private`=? WHERE id = ?";

                        DB.query(sql, [0, user_id], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            return res.send(success(result, "You're profile is public!!!"));
                        });
                    }
                });
            }

        })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}