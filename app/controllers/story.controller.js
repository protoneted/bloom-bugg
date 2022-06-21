const { success, error } = require('../utils/restResponse');
const constants = require('../config/constants');
const env = require('../config/env');
const common = require('./common.controller');
var moment = require('moment');
const { uploadFile } = require('../config/fileUpload');
const fileUpload = require('../config/fileUpload');
const { sharpCompresion } = require('../config/multer');
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        let file = "";

        const {
            title,
        } = req.body

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
        if (req.body.title == '') {
            err1 += 'Title is required.';
        }

        if (err1 == '') {

            const item = [user_id, title, file, date];

            let sql = `INSERT INTO bm_story (user_id, title, image, created_at) VALUES (?,?,?,?)`
            DB.query(sql, item, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Story Created Successfully.!"));
            });

        } else {
            res.send(error(err1.toString()));
        }

    } catch (e) {
        console.log(e)
        res.send("Something is wrong");
    }
}

exports.listOfStory = (req, res) => {
    try {
        const user_id = req.user_id
        let param = req.query;
        let info = common.pagination(param.page);
        const startDate = moment().format('YYYY-MM-DD') + ' 00:00:00';
        const endDate = moment().format('YYYY-MM-DD') + ' 23:59:59';
        DB.query('select story.user_id, user.name as user_name, user.profile_img from bm_story as story INNER JOIN bm_users as user on user.id = story.user_id where (user.id IN(SELECT follow_to FROM bm_followers WHERE follow_by = ? and status = 1 ) or story.user_id = ?)  and story.created_at between ? and ? GROUP BY story.user_id  ORDER BY story.created_at desc LIMIT  ? OFFSET  ?', [user_id, user_id, startDate, endDate, info.limit, info.offset], async function (err, result) {

            if (err) {
                console.log(err);
                return res.send(error(constants.SERVER_ERROR));
            }
            var response = [];

            if (result.length > 0) {
                var i = 0;
                result.forEach(function (item) {
                    DB.query('select id, title, image, created_at from bm_story where user_id = ? and created_at between ? and ? and deleted_at is null order by created_at desc', [item.user_id, startDate, endDate], async function (err, stories) {
                        if (err) {
                            console.log(err);
                        }

                        stories.forEach((e) => {
                            e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
                            //   console.log(e.image);
                            // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

                            // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
                        })

                        var data = {};
                        data.user_id = item.user_id;
                        data.user_name = item.user_name;
                        data.profile_img = req.connection && req.connection.encrypted ? 'https' + '://' + item.profile_img : 'http' + '://' + item.profile_img;
                        data.story = stories;
                        response.push(data);
                        i++;
                        if (result.length == i) {
                            return res.send(success(response, "Story list!!!!!"));
                        }
                    });
                });
            } else {
                return res.send(success(result, "Story list"));
            }

        });

    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}

exports.storyVideo = (req, res) => {
    const user_id = req.user_id;
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        const {
            title
        } = req.body
        let video = ""

        const videosPaths = req.file

        console.log(videosPaths.duration);

        var err1 = '';

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

        const item = [user_id, title, video, date];

        if (err1 == '') {
            let sql = `INSERT INTO bm_story (user_id, title, image, created_at) VALUES (?,?,?,?)`
            DB.query(sql, item, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(error(constants.SERVER_ERROR));
                }
                return res.send(success(result, "Story Created Successfully.!"));
            });
        } else {
            res.send(error(err1.toString()));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(constants.SERVER_ERROR));
    };
}