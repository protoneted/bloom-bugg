const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const socket = require('../../server.js').io;
var moment = require('moment');

exports.saveMessage = async (req, res) => {
    try {
        console.log("hey");
            const {
                message,
                to_user_id,
                from_user_id
            } = req.body
    
            const user_id = req.user_id;
            const date = moment().format('YYYY-MM-DD HH:mm:ss');
            let t1 =  new Promise(function(resolve,reject) {
                let sql = `select id from bm_user_chat_parent where (intial_from_id = ? and intial_to_id = ?) or (intial_from_id = ? and intial_to_id = ?) order by updated_at desc limit 1`
                console.log(sql);
               let a =  DB.query(sql, [from_user_id,to_user_id,from_user_id,to_user_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    console.log(a.sql);
                // console.log(result[0].chat_token);
                // return;
                if(result.length == 0){
                    let token = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
                    const item1 = [from_user_id, to_user_id, token, date];
                    let sql = `INSERT INTO bm_user_chat_parent(intial_from_id,intial_to_id,chat_token,created_at) VALUES (?,?,?,?)`
                    DB.query(sql, item1, function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(constants.SERVER_ERROR);
                        }
                        resolve(token)
                    });
                }else{
                    resolve(result[0].id);
                }    
                })
            })
            await t1.then(async (result) => {
                const item = [message,from_user_id,to_user_id,result,date];
    
                    let sql = `INSERT INTO bm_user_chat (message,from_user_id,to_user_id,parent_chat_id,created_at) VALUES (?,?,?,?,?)`
                    DB.query(sql, item, function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        return res.send(success(result, "Message sent successfully!"));
                    });
            });
    
        } catch (e) {
            console.log(e)
            return res.send(error(constants.SERVER_ERROR));
        }
    }

exports.listMessage = async (req, res) => {
try {
        const chat_id = req.query.chat_id;
        console.log(req.query);
        if(chat_id == null || chat_id == ''){
            return res.send(success([], "No message found!"));
        }
        let sql = `select ifnull(message,'') as message,buc.created_at,bu.name as to_user_name,bu.profile_img as to_user_image,post_id,ifnull(bp.title,'') as post_title,ifnull(bp.description,'') as post_descrition,ifnull(bp.image,'') as post_image from bm_user_chat as buc join bm_users bu on bu.id = buc.to_user_id left join bm_posts as bp on buc.post_id = bp.id where parent_chat_id = ? order by buc.created_at desc`
        DB.query(sql, [chat_id], function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Message list !"));
        });

    } catch (e) {
        console.log(e)
        return res.send(error(constants.SERVER_ERROR));
    }
} 

exports.recentMessageUsers = async (req, res) => {
try {
        const user_id = req.user_id;
        let sql = `select * from bm_user_chat_parent where intial_from_id = ? or intial_to_id = ? order by updated_at desc`
        DB.query(sql, [user_id,user_id], function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Recent chat user list !"));
        });

    } catch (e) {
        console.log(e)
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.saveSharePost = async (req, res) => {
    try {
        console.log("hey");
            const {
                post_id,
                to_user_id,
                from_user_id
            } = req.body
    
            const user_id = req.user_id;
            const date = moment().format('YYYY-MM-DD HH:mm:ss');
            let t1 =  new Promise(function(resolve,reject) {
                let sql = `select id from bm_user_chat_parent where (intial_from_id = ? and intial_to_id = ?) or (intial_from_id = ? and intial_to_id = ?) order by updated_at desc limit 1`
                console.log(sql);
               let a =  DB.query(sql, [from_user_id,to_user_id,from_user_id,to_user_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    console.log(a.sql);
                // console.log(result[0].chat_token);
                // return;
                if(result.length == 0){
                    let token = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
                    const item1 = [from_user_id, to_user_id, token, date];
                    let sql = `INSERT INTO bm_user_chat_parent(intial_from_id,intial_to_id,chat_token,created_at) VALUES (?,?,?,?)`
                    DB.query(sql, item1, function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(constants.SERVER_ERROR);
                        }
                        resolve(token)
                    });
                }else{
                    resolve(result[0].id);
                }    
                })
            })
            await t1.then(async (result) => {
                const item = [post_id,from_user_id,to_user_id,result,date];
    
                    let sql = `INSERT INTO bm_user_chat (post_id,from_user_id,to_user_id,parent_chat_id,created_at) VALUES (?,?,?,?,?)`
                    DB.query(sql, item, function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        return res.send(success(result, "Post shared successfully!"));
                    });
            });
    
        } catch (e) {
            console.log(e)
            return res.send(error(constants.SERVER_ERROR));
        }
    }