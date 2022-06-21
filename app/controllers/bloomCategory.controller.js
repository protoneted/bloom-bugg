const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
// const { uploadFile } = require('../config/fileUpload');
const { calculator } = require("../utils/calculator");
var moment = require('moment');
const { sharpCompresion } = require('../config/multer');


exports.listOfBloomByCategory = (req, res) => {
    let param = req.query;
    let id = param.category_id;
    let info = common.pagination(param.page);
    try {
        DB.query("SELECT a.id, a.name,b.id as 'title_id', b.title,b.description, b.image ,c.id AS 'question_id',c.question,c.kwh,c.co2,c.water,c.waste_recycled,c.no_of_tree,c.badge_green,c.badge_ev,c.badge_solar " +
            " from((bm_bloom_category_detail as b LEFT JOIN bm_bloom_category AS a on a.id = b.bloom_category_id) " +
            " LEFT JOIN bm_bloom_inputs as c ON c.bloom_category_detail_id = b.id) where b.bloom_category_id = ? " +
            " AND b.deleted_at is null AND c.deleted_at is null order by id desc LIMIT ? OFFSET ?", [id, info.limit, info.offset], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                } DB.query("select * from bm_impact order by id asc", async function (err, result3) {
                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }

                    const impactArr = result3

                    result.map((e) => {
                        e.impact = []
                        e.kwh ? (e.impact.push(impactArr[0])) : null
                        e.co2 ? (e.impact.push(impactArr[1])) : null
                        e.water ? (e.impact.push(impactArr[2])) : null
                        e.waste_recycled ? (e.impact.push(impactArr[3])) : null
                        e.no_of_tree ? (e.impact.push(impactArr[4])) : null
                        e.badge_green ? (e.impact.push(impactArr[5])) : null
                        e.badge_ev ? (e.impact.push(impactArr[6])) : null
                        e.badge_solar ? (e.impact.push(impactArr[7])) : null

                    })
                    return res.send(success(result, "Bloom category detail list"));
                });
            })
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }

}

exports.userBloomCategory = async (req, res) => {
    try {
        const file = req.file

        let image = ""
        let answerStr = ""

        const {
            bloom_category_detail_id,
            is_bloom,
            answer,
            description
        } = req.body

        const user_id = req.user_id;
        if (file) {
            const result = await sharpCompresion(req)
            if (!result.error) {
                image = result
            } else {
                err1 += "Something is wrong!"
            }
        }
        if (answer) {
            answerStr = answer.toString();
        }

        DB.query(`SELECT bloom_category_id FROM bm_bloom_category_detail WHERE id = ? AND deleted_at is null `, [bloom_category_detail_id], function (err, result) {

            if (err) {
                return res.send(error(constants.SERVER_ERROR));
            } else if (result.length > 0) {

                DB.query(`SELECT * FROM user_bloom_category WHERE bloom_category_id = ? AND bloom_category_detail_id = ? AND user_id = ? `, [result[0].bloom_category_id, bloom_category_detail_id, user_id], function (err, result1) {

                    if (err) {
                        console.log(err);
                        return res.send(error(constants.SERVER_ERROR));
                    }
                    let ans = calculator(bloom_category_detail_id, answer);
                    var query = '';
                    var queryValues = '';
                    var questionMarks = '';
                    ans.map((item, index) => {
                        var concatComma = ''
                        if (ans.length - 1 != index) {
                            concatComma = ', '
                        }
                        query = query + item.type + concatComma;
                        queryValues = queryValues + item.value + concatComma;
                        questionMarks = questionMarks + '?' + concatComma;

                    });
                    // console.log("Q", query)
                    // console.log("V", questionMarks)

                    const item = [user_id, result[0].bloom_category_id, bloom_category_detail_id, is_bloom, answerStr];

                    DB.query('INSERT INTO user_bloom_category ( user_id, bloom_category_id, bloom_category_detail_id, is_bloom,  user_answer) VALUES (?,?,?,?,?)', item, async function (err, result1) {
                        if (err) {
                            console.log(err);
                            return res.send(error(constants.SERVER_ERROR));
                        }

                        DB.query(`INSERT INTO bloom_results ( user_id, bloom_id, ${query.toString()} , user_ans) VALUES (${user_id},${bloom_category_detail_id},${queryValues},'${answerStr}')`, async function (err, result2) {
                            if (err) {
                                console.log(err);
                                return res.send(error(constants.SERVER_ERROR));
                            }
                            const date = moment().format('YYYY-MM-DD HH:mm:ss');
                            if (image) {
                                postSql = `INSERT INTO bm_posts ( user_id, bloom_id, description ,image ,created_at) VALUES (${user_id},${bloom_category_detail_id},'${description}','${image}','${date}')`
                            } else {
                                postSql = `INSERT INTO bm_posts ( user_id, bloom_id, description  ,created_at) VALUES (${user_id},${bloom_category_detail_id},'${description}','${date}')`

                            }
                            DB.query(postSql, async function (err, result3) {
                                if (err) {
                                    console.log(err);
                                    return res.send(error(constants.SERVER_ERROR));
                                }
                                const startDate = moment().format('YYYY-MM-DD') + ' 00:00:00';
                                const endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';


                                DB.query(`SELECT * FROM bm_user_rewards where user_id = ? and created_at between ? and ? and deleted_at is null`, [user_id, startDate, endDate], function (err, reward_available) {

                                    if (err) {
                                        console.log(err);
                                        return res.send(error(constants.SERVER_ERROR));
                                    } else if (reward_available.length > 0) {
                                        const reward_available = false
                                        return res.send(success({ result1, result2, result3, reward_available }, "Bloomed Successfully!"));

                                    } else {
                                        const reward_available = true
                                        return res.send(success({ result1, result2, result3, reward_available }, "Bloomed Successfully!"));

                                    }
                                })

                            });
                        });
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

exports.myBloom = (req, res) => {
    let userId;

    req.query.user_id ?
        userId = req.query.user_id :
        userId = req.user_id

    try {
        // SELECT user_bloom_category.id, bm_bloom_category.name, bm_bloom_category_detail.title, bm_bloom_category_detail.description FROM user_bloom_category JOIN bm_bloom_category on bm_bloom_category.id = user_bloom_category.bloom_category_id JOIN bm_bloom_category_detail ON bm_bloom_category_detail.id = user_bloom_category.bloom_category_detail_id WHERE user_id =
        DB.query(" SELECT bm_posts.image,bm_posts.bloom_id FROM bm_posts WHERE bm_posts.user_id = ? and bm_posts.bloom_id IS NOT null and bm_posts.image is not null ", [userId], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, 'User blooms!'));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

exports.listOfMyBloomAndCategoryBloom = (req, res) => {
    let param = req.query;
    const user_id = req.user_id;
    let info = common.pagination(param.page);
    try {
        DB.query("SELECT id, name, (select count(id) as category_bloom from user_bloom_category where bloom_category_id = blc.id and is_bloom = 1) as category_bloom, (select count(id) as my_bloom from user_bloom_category where bloom_category_id = blc.id and user_id = ? and is_bloom = 1) as my_bloom FROM `bm_bloom_category` as blc WHERE blc.is_active = 1 AND blc.deleted_at is null order by id desc LIMIT  ? OFFSET  ?", [user_id, info.limit, info.offset], function (err, result, fields) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            return res.send(success(result, "List of My bloom & Category Bloom!"));
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}

// Question API
exports.bloomQuestion = (req, res) => {
    const id = req.params.id
    try {
        DB.query('select question,bloom_category_input,kwh, co2, water, waste_recycled, no_of_tree from bm_bloom_inputs where bloom_category_detail_id = ? ', id, async function (err, result) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            const formula = [result[0].kwh, result[0].co2];
            console.log(formula);
            return res.send(success(result, formula, "Question Fetched......"));
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.bloomAnswer = (req, res) => {
    const id = req.params.id
    try {
        const {
            question_id,
            answer,
            image
        } = req.body;

        const questionsArr = JSON.parse(question_id);
        const answerArr = JSON.parse(answer);

        questionsArr.map((question, index) => {
            let item = [req.user_id, question, answerArr[index], id, image];
            // console.log(item);
            DB.query('INSERT INTO bm_bloom_answer (user_id, bloom_input_id, user_answer, bloom_category_detail_id, image) VALUES (?,?,?,?,?)', item, async function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Added........"));
            });
        });
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    }
}


exports.bloomActiveTotal = (req, res) => {
    console.log(req.user_id);
    let param = req.query;
    let id = param.bloom_category_id;
    try {
        DB.query('SELECT COUNT(bm_bloom_category_detail.id) as Total,bm_bloom_category_detail.bloom_category_id , bm_bloom_category.name FROM `bm_bloom_category_detail` JOIN bm_bloom_category ON bm_bloom_category.id = bm_bloom_category_detail.bloom_category_id GROUP BY bm_bloom_category_detail.bloom_category_id', async function (err, total) {
            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            DB.query('SELECT COUNT(DISTINCT user_bloom_category.bloom_category_detail_id) as Active,user_bloom_category.bloom_category_id , bm_bloom_category.name FROM user_bloom_category JOIN bm_bloom_category ON user_bloom_category.bloom_category_id = bm_bloom_category.id WHERE user_bloom_category.user_id = ? GROUP BY user_bloom_category.bloom_category_id', [req.user_id], async function (err, active) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success({
                    total,
                    active
                }, "Okay"));
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}
