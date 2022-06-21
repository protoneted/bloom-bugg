const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');
const { sharpCompresion } = require('../config/multer');


exports.list = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        console.log(info);
        DB.query('select id,title,description,image,start_date,end_date,is_active from bm_rewards where deleted_at is null order by id desc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Rewards list!!!"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.rewardCategoryList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);

        if (req.query.category_id != undefined || req.query.category_id != '') {
            DB.query('select id,title,description,image from bm_rewards where reward_category_id = ? and deleted_at is null order by id desc LIMIT  ? OFFSET  ?', [req.query.category_id, info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Reward Category list!!!"));
            });
        } else {
            return res.send(error('Reward id is required.!'));
        }
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.myRewards = (req, res) => {
    console.log(req.user_id)
    try {
        DB.query("SELECT bm_user_rewards.id, bm_rewards.title, bm_rewards.description,bm_rewards.promo_code,bm_rewards.image " +
            " FROM bm_user_rewards JOIN bm_rewards on bm_rewards.id = bm_user_rewards.reward_id WHERE bm_user_rewards.user_id = " + req.user_id, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, 'User Reward!'));
            });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addUserReward = (req, res) => {
    try {

        const {
            reward_id,
        } = req.body

        const user_id = req.user_id;
        const startDate = moment().format('YYYY-MM-DD') + ' 00:00:00';
        const endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';
        const created_at = moment().format('YYYY-MM-DD HH:mm:ss');

        let sqlCheckTodaysReward = `SELECT * FROM bm_user_rewards where user_id = ? and created_at between ? and ? and deleted_at is null`;
        DB.query(sqlCheckTodaysReward, [user_id, startDate, endDate], function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {
                return res.send(error('You have already claimed your today\'s reward.'));
            } else {

                let sqlCheckSameReward = `SELECT * FROM bm_user_rewards where user_id = ? and reward_id = ? and deleted_at is null`;
                DB.query(sqlCheckSameReward, [user_id, reward_id], function (err, result) {
                    console.log(result);
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    } else if (result.length > 0) {
                        return res.send(error('You have already claimed this reward.'));
                    } else {
                        DB.query("SELECT * FROM `user_bloom_category` WHERE cast(created_at as Date) = cast(CURRENT_DATE() as Date) and user_id = ?  ", [user_id], function (err, todayBloom) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            console.log(todayBloom, "fsdfsdf");
                            if (todayBloom.length) {
                                let sqlUpdate = `INSERT INTO bm_user_rewards set user_id = ?, reward_id = ?,  created_at = ? `;
                                DB.query(sqlUpdate, [user_id, reward_id, created_at], function (err, rewardAvailable) {
                                    if (err) {
                                        console.log(err);
                                        return res.send(error(constants.SERVER_ERROR));
                                    }
                                    DB.query("UPDATE `bm_rewards` SET `is_active`= ? WHERE id = ? and is_multiple = 1 ", [0, reward_id], function (err, statusUpdate) {
                                        if (err) {
                                            console.log(err);
                                            return res.send(error(constants.SERVER_ERROR));
                                        }
                                        else {
                                            DB.query("select id, title, description, image , promo_code from bm_rewards where id = ? and deleted_at is null ", [reward_id], function (err, rewardData) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.send(error(constants.SERVER_ERROR));
                                                }
                                                return res.send(success({
                                                    rewardAvailable, rewardData
                                                }, "You have successfully claimed your reward.!"));
                                            })

                                        }
                                    });
                                })
                            } else {
                                return res.send(error("please complete atleast one bloom today!"));
                            }
                        })

                    }

                });

            }

        });

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }

}

exports.getUserReward = (req, res) => {
    try {
        const user_id = req.user_id;
        DB.query('SELECT a.id, a.reward_id, b.title, b.description, b.promo_code, b.image FROM bm_user_rewards as a JOIN bm_rewards as b ON a.reward_id = b.id WHERE a.user_id = ?', user_id, async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Your claim reward list!!!! "));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.addMultipleReward = async (req, res) => {
    try {
        let image = ""
        const user_id = req.user_id;
        const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const {
            reward_category_id,
            title,
            description,
            start_date,
            end_date,
            promo_code,
        } = req.body
        if (req.file == undefined || req.file == '') {
            return res.send(error('Image is required.'));
        } else if (req.file) {
            const result = await sharpCompresion(req)
            if (!result.error) {
                image = result
            } else {
                return res.send(error("Something is wrong!"));
            }

        }
        const x = JSON.parse(promo_code)
        obj = null,
            output = [];
        for (i = 0; i < x.length; i++) {
            obj = {};
            obj.reward_category_id = reward_category_id;
            obj.title = title;
            obj.description = description;
            obj.start_date = start_date;
            obj.end_date = end_date;
            obj.image = image;
            obj.promo_code = x[i];
            obj.user_id = user_id;
            obj.created_at = created_at;
            obj.is_multiple = 1;
            output.push(obj);
        }

        let values = output.reduce((p, c) => {
            let ini = [];
            ini.push(c.reward_category_id, c.title, c.description, c.start_date, c.end_date, c.promo_code, c.image, c.user_id, c.is_multiple, c.created_at);
            p.push(ini);
            return p
        }, [])

        let sql = "INSERT INTO bm_rewards( reward_category_id, title, description, start_date, end_date, promo_code, image, vendor_id,is_multiple,created_at) VALUES ?";

        const item = [values]

        DB.query(sql, item, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Reward Added Successfully!"));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}