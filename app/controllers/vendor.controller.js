const bcrypt = require('bcrypt');
const { success, error } = require('../utils/restResponse');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');
const fileUpload = require('../config/fileUpload');
const { sharpCompresion } = require('../config/multer');

exports.login = (req, res) => {
    try {
        let param = req.body;
        DB.query('select * from bm_vendors where email = ?', [param.email], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            else if (result.length <= 0) {
                return res.send(error('Invalid email id!'));
            }
            let u = result[0];
            let validUser = bcrypt.compareSync(req.body.password, u.password);

            if (!validUser) {
                return res.send(error('Invalid Password!'));
            }

            if (u.is_active != 1) {
                return res.send(error('Wait For Confirmation From Admin😊!!!'));
            }
            var token = jwt.sign({ user_id: u.id, user: u }, env.jwtsecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            u.token = token;
            delete u.password;

            return res.send(success(u, "Logged in successfully!"));

        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.signUp = (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            phone_no,
            address,
            company_name
        } = req.body

        const create_at = new Date();

        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = bcrypt.hashSync(password, salt);

        const item = [first_name, last_name, email, hashedPwd, phone_no, address, company_name, create_at];

        DB.query(`SELECT * FROM bm_vendors WHERE phone_no = ? `, phone_no, function (err, result1) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            } else if (result1.length > 0) {
                return res.send(error("Mobile Number already exist!!"));
            }

            DB.query(`SELECT * FROM bm_vendors WHERE email = ? `, email, function (err, result1) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } else if (result1.length > 0) {
                    return res.send(error("Email already exist!!"));
                }

                let sql = `INSERT INTO bm_vendors (first_name, last_name, email, password, phone_no, address, company_name, create_at) VALUES (?,?,?,?,?,?,?,?)`
                DB.query(sql, item, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Vender Registration Complete...."));
                });
            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.vendorReward = async (req, res) => {
    try {
        const {
            reward_category,
            title,
            description,
            start_date,
            end_date,
            promo_code,
        } = req.body
        let err1 = ""
        let file = ""

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
        if (err1 == "") {
            const created_at = new Date();
            const vendor_id = req.user_id;
            const item = [reward_category, title, description, start_date, end_date, promo_code, file, vendor_id, created_at];

            DB.query('select * from bm_vendors where id = ?', [req.user_id], async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                else if (result.length <= 0) {
                    return res.send(error('Invalid email id!'));
                }
                let u = result[0];

                if (u.is_active != 1) {
                    return res.send(error('You can not add Reward wait for conformation!!!!!'));
                }
                let sql = `INSERT INTO bm_rewards (reward_category_id,title, description, start_date, end_date, promo_code, image, vendor_id, created_at) VALUES (?,?,?,?,?,?,?,?,?)`
                DB.query(sql, item, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    return res.send(success(result, "Reward Added...."));
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

exports.acceptVendorRequest = (req, res) => {
    try {
        DB.query('UPDATE bm_vendors SET is_active = 1  WHERE id = ?', [req.user_id], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Okay"));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addRewardByVendorlist = (req, res) => {
    try {
        const { is_multiple } = req.query
        DB.query('select a.id,a.title,a.description,a.start_date,a.end_date,a.promo_code,a.image,a.is_multiple, b.name as reward_category from bm_rewards as a JOIN bm_reward_category as b on a.reward_category_id = b.id where a.vendor_id = ? and a.is_multiple= ? order by a.created_at desc', [req.user_id, is_multiple], async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            result.forEach((e) => {
                e.image = req.connection && req.connection.encrypted ? 'https'+ '://' + e.image : 'http' + '://' + e.image
                // console.log(e.image);
                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
            })
            return res.send(success(result, "Reward category list"));
        });

    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };

}

exports.deleteMultipleRewards = (req, res) => {
    const title = req.body.title;
    try {
        DB.query('DELETE FROM bm_rewards WHERE title = ? and is_multiple = 1', [title], (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Rewards Deleted Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteSingleRewards = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_rewards WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Reward Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.rewardCategoryListInVendor = (req, res) => {
    try {
        DB.query('select id,name from bm_reward_category where is_active = 1 and ID NOT IN (1) order by id asc ', async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Reward category list"));
        });

    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}


exports.test = (req, res) => {
    try {
        const {
            promo_code
        } = req.body
        let sql = `INSERT INTO test (promo_code) VALUES (?)`
        DB.query(sql, promo_code, function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Promo code Added...."));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}