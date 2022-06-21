const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');

exports.list = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        console.log(info);
        DB.query('select id,is_profile_search, is_private_account,created_at from bm_account_setting order by id desc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "List of acoount setting....."));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.accountSetting = (req, res) => {
    try {
        const {
            is_profile_search,
            is_private_account,
            user_id
        } = req.body

        const createdAt = new Date();

        const item = [is_profile_search, is_private_account, user_id, createdAt];

        DB.query(`SELECT user_id FROM bm_account_setting WHERE user_id = ?`, user_id, function (err, result1) {
            if (result1.length != 0) {

                let sql = "UPDATE bm_account_setting SET `is_profile_search`=?,`is_private_account`=? WHERE user_id = ?";

                DB.query(sql, item, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "User Setting Update Successfully!! "));
                });
            } else {
                let sql = `INSERT INTO bm_account_setting (is_profile_search, is_private_account,user_id,created_at) VALUES (?,?,?,?)`
                DB.query(sql, item, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "User Inserted Successfully!! "));
                });
            }

        })


    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}