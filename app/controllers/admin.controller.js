const bcrypt = require('bcrypt');
const { success, error } = require('../utils/restResponse');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const env = require('../config/env');
var moment = require('moment');


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
            let validUser = bcrypt.compareSync(req.body.password, u.password);

            if (!validUser) {
                return res.send(error('Invalid Password!'));
            }

            if (u.is_active != 1) {
                return res.send(error('Inactive user!'));
            }
            if (u.type != 'admin') {
                return res.send(error('Sorry!!!Please Contact Admin...'));
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

exports.activateVendor = (req, res) => {
    const id = req.params.id;
    try {
        const {
            is_active
        } = req.body;

        let item = [is_active, id]
        let sql = "UPDATE bm_vendors SET `is_active`= ?  WHERE id = ?";

        DB.query(sql, item, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Vendor Data update Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.activateUser = (req, res) => {
    const id = req.params.id;
    try {
        const {
            is_active
        } = req.body;

        let item = [is_active, id]
        let sql = "UPDATE bm_users SET `is_active`= ?  WHERE id = ?";

        DB.query(sql, item, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "User Data Updated Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getVendorById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT is_active FROM bm_vendors WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched vendor by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getUserById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT id,is_active FROM bm_users WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched user by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addVendorByadmin = (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            phone_no,
            address,
            company_name
        } = req.body;

        var err1 = '';

        if (first_name == '') {
            err1 += 'First name is required.';
        }
        if (last_name == '') {
            err1 += 'Last name is required.';
        }
        if (email == '') {
            err1 += 'Email is required.';
        }
        if (password == '') {
            err1 += 'Password is required.';
        }
        if (phone_no == '') {
            err1 += 'Mobile no. is required.';
        }
        if (address == '') {
            err1 += 'Address is required.';
        }

        if (err1 == '') {
            const createdAt = new Date();
            const salt = bcrypt.genSaltSync(10);
            const hashedPwd = bcrypt.hashSync(password, salt);
            const item = [first_name, last_name, email, hashedPwd, phone_no, address, company_name, createdAt];
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
                    DB.query('INSERT INTO bm_vendors( first_name, last_name,email, password, phone_no, address, company_name,is_active,create_at)VALUES (?,?,?,?,?,?,?,1,?)', item, async function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }
                        return res.send(success(result, "Vendor add successfully...."));
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

exports.addBloomCategory = (req, res) => {
    try {
        const { name, image } = req.body
        let err1 = ""
        if (name == '') {
            err1 += 'Name is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }
        if (!err1) {
            let sql = "INSERT INTO `bm_bloom_category`( `name`, `image`, `created_at`) VALUES (?,?,?)";
            const date = moment().format('YYYY-MM-DD HH:mm:ss');

            DB.query(sql, [name, image, date], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Bloom Category Added Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.updateBloomCategory = (req, res) => {
    try {
        const { id } = req.params
        const {
            name,
            image,
            is_active
        } = req.body
        let err1 = ""
        if (name == '') {
            err1 += 'Name is required,';
        }
        if (image == '') {
            err1 += 'Image is required,';
        }
        if (is_active == '') {
            err1 += 'status is required,';
        }
        if (!err1) {
            let sql = "UPDATE `bm_bloom_category` SET `name`=?,`image`=?,`is_active`=?,`updated_at` = ? WHERE id = ?";
            const date = moment().format('YYYY-MM-DD HH:mm:ss');

            DB.query(sql, [name, image, is_active, date, id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Bloom Category Update Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addBloom = (req, res) => {
    let {
        bloom_category_id,
        title,
        description,
        image,
        bloom_category_input,
        question,
        kwh,
        co2,
        water,
        waste_recycled,
        no_of_tree,
        badge_green,
        badge_ev,
        badge_solar
    } = req.body
    const date = moment().format('YYYY-MM-DD HH:mm:ss');

    try {
        const item1 = [bloom_category_id, title, description, image, date]
        DB.query("INSERT INTO bm_bloom_category_detail( bloom_category_id, title, description, image,created_at) VALUES (?,?,?,?,?)", item1, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            // console.log(result.insertId);

            bloom_category_input ? bloom_category_input:bloom_category_input= null
            question ? question:question= null
            kwh ? kwh:kwh= null
            co2 ? co2:co2= null
            water ? water:water= null
            waste_recycled ? waste_recycled:waste_recycled= null
            no_of_tree ? no_of_tree:no_of_tree= null
            badge_green ? badge_green:badge_green= null
            badge_ev ? badge_ev:badge_ev= null
            badge_solar ? badge_solar:badge_solar= null






            const item2 = [result.insertId, bloom_category_input, question, kwh, co2, water, waste_recycled, no_of_tree, badge_green, badge_ev, badge_solar, date]
            DB.query("INSERT INTO bm_bloom_inputs(bloom_category_detail_id, bloom_category_input, question, kwh, co2, water, waste_recycled, no_of_tree, badge_green, badge_ev, badge_solar, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", item2, (err, result1) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result1, "Bloom Added Successfully!"));
            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.editBloom = (req, res) => {
    const id = req.params.id
    try {
        const {
            bloom_category_id,
            title,
            description,
            image
        } = req.body;

        var err1 = '';

        if (bloom_category_id == '') {
            err1 += 'Bloom category id is required.';
        }
        if (title == '') {
            err1 += 'Title is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }

        if (err1 == '') {
            const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
            let item = [bloom_category_id, title, description, image, updated_at, id]
            let sql = "UPDATE bm_bloom_category_detail SET `bloom_category_id`= ?,`title`= ?,`description`= ?,`image`= ?,`updated_at`= ?  WHERE id = ?";

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Bloom Edit Successfully!! "));
            });
        } else {
            res.send(error(err1));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getBloomCategoryById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT id, name,image,is_active FROM bm_bloom_category WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched bloom category by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getRewardCategoryById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT `id`, `name`, `image`, `description`, `is_active` FROM bm_reward_category WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched reward category by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getRewardById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT `id`, `reward_category_id`, `title`, `description`, `start_date`, `end_date`, `promo_code`, `image`, `vendor_id`, `is_active` FROM bm_rewards WHERE id = ? ";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched reward category by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getBloomById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT id, bloom_category_id, title, description, image FROM bm_bloom_category_detail WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched bloom by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addChallengeCategory = (req, res) => {
    try {
        const {
            name
        } = req.body

        let err1 = ""

        if (name == '') {
            err1 += 'Name is required.';
        }
        if (!err1) {
            let sql = "INSERT INTO bm_challenge_category(name,	created_at) VALUES (?,?)";
            const date = moment().format('YYYY-MM-DD HH:mm:ss');

            DB.query(sql, [name, date], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Challenge Category Added Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addChallenge = (req, res) => {
    try {
        const {
            challenge_category_id,
            bloom_id,
            title,
            description,
            image,
        } = req.body

        let err1 = ""

        if (challenge_category_id == '') {
            err1 += 'Challenge category id is required.';
        }
        if (bloom_id == '') {
            err1 += 'Bloom id is required.';
        }
        if (title == '') {
            err1 += 'Title is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }
        if (!err1) {

            let sql = "INSERT INTO bm_challenge_category_detail( challenge_category_id, bloom_id, title, description, image, created_at) VALUES (?,?,?,?,?,?)";
            const date = moment().format('YYYY-MM-DD HH:mm:ss');

            const item = [challenge_category_id, bloom_id, title, description, image, date]

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Challenge Added Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.getChallengeById = (req, res) => {
    const id = req.params.id;
    try {
        let sql = "SELECT `id`, `challenge_category_id`, `bloom_id`, `title`, `description`, `image`  FROM `bm_challenge_category_detail` WHERE id = ?";

        DB.query(sql, id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "fetched bloom category by id..... "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.editchallenge = (req, res) => {
    const id = req.params.id
    try {
        const {
            challenge_category_id,
            bloom_id,
            title,
            description,
            image,
        } = req.body;

        var err1 = '';

        if (challenge_category_id == '') {
            err1 += 'Challenge category id is required.';
        }
        if (bloom_id == '') {
            err1 += 'Bloom id is required.';
        }
        if (title == '') {
            err1 += 'Title is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }

        if (err1 == '') {
            const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
            const item = [challenge_category_id, bloom_id, title, description, image, updated_at, id]
            let sql = "UPDATE bm_challenge_category_detail SET `challenge_category_id`= ?,bloom_id = ?,`title`= ?,`description`= ?,`image`= ?,`updated_at`= ?  WHERE id = ?";

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Challenge Edit Successfully!! "));
            });
        } else {
            res.send(error(err1));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.editReward = (req, res) => {
    const id = req.params.id
    try {
        const {
            reward_category_id,
            title,
            description,
            start_date,
            end_date,
            promo_code,
            image,
        } = req.body

        let err1 = ""

        if (reward_category_id == '') {
            err1 += 'Reward category id is required.';
        }
        if (title == '') {
            err1 += 'Title id is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (start_date == '') {
            err1 += 'Start date is required.';
        }
        if (end_date == '') {
            err1 += 'End date is required.';
        }
        if (promo_code == '') {
            err1 += 'Promo code is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }
        if (!err1) {

            const item = [reward_category_id, title, description, start_date, end_date, promo_code, image, id]
            let sql = "UPDATE bm_rewards SET `reward_category_id`= ?,title = ?,`description`= ?,`start_date`= ?,`end_date`= ?,`promo_code`= ?,`image`= ?  WHERE id = ?";

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Reward Edit Successfully!! "));
            });
        } else {
            res.send(error(err1));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addReward = (req, res) => {
    try {
        const {
            reward_category_id,
            title,
            description,
            start_date,
            end_date,
            promo_code,
            image,
        } = req.body

        let err1 = ""

        if (reward_category_id == '') {
            err1 += 'Reward category id is required.';
        }
        if (title == '') {
            err1 += 'Title id is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (start_date == '') {
            err1 += 'Start date is required.';
        }
        if (end_date == '') {
            err1 += 'End date is required.';
        }
        if (promo_code == '') {
            err1 += 'Promo code is required.';
        }
        if (image == '') {
            err1 += 'Image is required.';
        }
        if (!err1) {

            let sql = "INSERT INTO bm_rewards( reward_category_id, title, description, start_date, end_date, promo_code, image, vendor_id,created_at) VALUES (?,?,?,?,?,?,?,?,?)";
            const created_at = moment().format('YYYY-MM-DD HH:mm:ss');

            const item = [reward_category_id, title, description, start_date, end_date, promo_code, image, 1, created_at]

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Reward Added Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.addRewardCategory = (req, res) => {
    try {
        const {
            name,
            image,
            description
        } = req.body

        let err1 = ""

        if (name == '') {
            err1 += 'Reward category name is required.';
        }
        if (image == '') {
            err1 += 'Image id is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }

        if (!err1) {

            let sql = "INSERT INTO bm_reward_category( name, image, description, is_active, created_at) VALUES (?,?,?,?,?)";
            const created_at = moment().format('YYYY-MM-DD HH:mm:ss');

            const item = [name, image, description, 1, created_at]

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Reward category Added Successfully!"));
            });
        } else {
            return res.send(error(err1));

        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.updateRewardCategory = (req, res) => {
    const id = req.params.id
    try {
        const {
            name,
            image,
            description,
            is_active
        } = req.body;

        var err1 = '';

        if (name == '') {
            err1 += 'Reward category name is required.';
        }
        if (image == '') {
            err1 += 'Image id is required.';
        }
        if (description == '') {
            err1 += 'Description is required.';
        }
        if (is_active == '') {
            err1 += 'Enter 0 and 1';
        }

        if (err1 == '') {
            const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
            let item = [name, image, description,is_active, updated_at, id]
            let sql = "UPDATE bm_reward_category SET `name`= ?,`image`= ?,`description`= ?,`is_active`= ?,`updated_at`= ?  WHERE id = ?";

            DB.query(sql, item, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Reward category Edit Successfully!! "));
            });
        } else {
            res.send(error(err1));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteBloomCategory = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_bloom_category WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Bloom category Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteBloom = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_bloom_category_detail WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Bloom Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteChallengeCategory = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_challenge_category WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Challenge category Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteChallenge = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_challenge_category_detail WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Challenge Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deletePost = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_posts WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Post Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteRewardCategoryById = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_reward_category WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Reward category Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteRewardById = (req, res) => {
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

exports.deleteRewardById = (req, res) => {
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

exports.deleteUser = (req, res) => {
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

exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM bm_users WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "User Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.deleteReportById = (req, res) => {
    const id = req.params.id;
    try {
        DB.query('DELETE FROM reported_posts WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "Report Delete Successfully!! "));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}