const bcrypt = require('bcrypt');
const { success, error } = require('../utils/restResponse');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');

exports.bloomCategoryList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        // console.log(info);

        DB.query('select id,name,is_active,image from bm_bloom_category where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            DB.query("SELECT * FROM `bm_bloom_category` WHERE is_active = '1'", async function (err, totalData) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                const totalItems = result.length;
                const totalPages = Math.ceil(totalData.length /info.limit);
                const currentPage = Number(param.page);
                return res.send(success({ result, totalItems, totalPages, currentPage }, "Bloom category list"));
            });
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

        DB.query('select id,name,description,image,is_active from bm_reward_category where ID NOT IN (1) order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            DB.query("SELECT * FROM `bm_reward_category` WHERE is_active = '1'", async function (err, totalData) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                const totalItems = result.length;
                const totalPages = Math.ceil(totalData.length /info.limit);
                const currentPage = Number(param.page);
                return res.send(success({ result, totalItems, totalPages, currentPage },"Reward category list"));
            });
        });

    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.challengeCategoryList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select id,name from bm_challenge_category where deleted_at is null and ID NOT IN (1) order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result1) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_challenge_category`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result1.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result1, totalItems, totalPages, currentPage },"Challenge category list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.bloomList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('SELECT a.id , b.name as Bloom_Category, a.title, a.description, a.image FROM bm_bloom_category_detail as a JOIN bm_bloom_category as b WHERE a.bloom_category_id = b.id order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result1) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_bloom_category_detail`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result1.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result1, totalItems, totalPages, currentPage }, "Bloom list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.challengeList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select a.id,b.name,c.title as Bloom_name,a.title,a.description, a.image from bm_challenge_category_detail as a JOIN bm_challenge_category as b on b.id = a.challenge_category_id JOIN bm_bloom_category_detail as c on a.bloom_id = c.id where a.deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_challenge_category_detail` ", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage },  "Challenge list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.postList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select id,title,description, image from bm_posts where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_posts`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    result.forEach((e) => {
                        e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image

                    })
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage }, "Post list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.rewardList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select a.id,a.title,a.description,a.start_date,a.end_date,a.promo_code,a.image, b.first_name as Vendorname, c.name as Reward_category from bm_rewards as a JOIN bm_vendors as b on a.vendor_id = b.id JOIN bm_reward_category as c on c.id = a.reward_category_id where a.is_active = 1 order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_rewards` WHERE is_active = '1'", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage },"Reward list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.vendorList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select id,first_name,last_name,email,phone_no,address,company_name,is_active,create_at from bm_vendors order by id desc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_vendors`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage }, "Vendor list!!!!"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.userList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('select id,name ,email,dob,mobile_no,is_active from bm_users order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_users` WHERE is_active = '1'", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage }, "User list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.reportList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('SELECT a.id as id , b.id as userId, a.description,b.email,b.name,c.image,c.id as PostId FROM reported_posts as a JOIN bm_users as b on a.user_id = b.id JOIN bm_posts as c on a.post_id = c.id order by a.id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `reported_posts`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage }, "Report list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.impactList = (req, res) => {
    try {
        let param = req.query;
        let info = common.pagination(param.page);
        DB.query('select * from bm_users where id = ?', [req.user_id], async function (err, result) {
            let u = result[0];
            if (u.type != "admin") {
                return res.send(error('Sorry!!!You are not an admin...'));
            }
            DB.query('SELECT id, title FROM bm_impact order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                DB.query("SELECT * FROM `bm_impact`", async function (err, totalData) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    const totalItems = result.length;
                    const totalPages = Math.ceil(totalData.length /info.limit);
                    const currentPage = Number(param.page);
                    return res.send(success({ result, totalItems, totalPages, currentPage }, "Impact list"));
                });
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}