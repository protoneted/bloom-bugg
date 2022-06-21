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
    console.log(info);

    DB.query('select id,name,is_active,image from bm_bloom_category where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Bloom category list"));
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

    DB.query('select id,name from bm_challenge_category where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Challenge category list"));
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

    DB.query('SELECT a.id , b.name as Bloom_Category, a.title, a.description, a.image FROM bm_bloom_category_detail as a JOIN bm_bloom_category as b WHERE a.bloom_category_id = b.id order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Bloom list"));
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

    DB.query('select id,title,description, image from bm_challenge_category_detail where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Bloom list"));
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

    DB.query('select id,title,description, image from bm_posts where deleted_at is null order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Post list"));
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
    const categoryId = param.category_id

    let info = common.pagination(param.page);
    if (categoryId == 1) {
      DB.query("SELECT bm_user_rewards.id, bm_rewards.title, bm_rewards.description,bm_rewards.promo_code,bm_rewards.image " +
        " FROM bm_user_rewards JOIN bm_rewards on bm_rewards.id = bm_user_rewards.reward_id WHERE bm_user_rewards.user_id = " + req.user_id, function (err, result, fields) {
          if (err) {
            console.log(err);
            return res.send(error(constants.SERVER_ERROR));
          }
          result.forEach((e) => {
            e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
            //   console.log(e.image);
            // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);
  
            // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
        })
          return res.send(success(result, 'My Reward!'));
        });

    } else {
      DB.query('select id,	reward_category_id	,title,description,start_date,end_date,promo_code,image from bm_rewards where 	reward_category_id = ? and is_active = 1 GROUP BY bm_rewards.title order by created_at desc LIMIT  ? OFFSET  ?', [categoryId, info.limit, info.offset], async function (err, result) {
        if (err) {
          console.log(err);
          return res.send(error(constants.SERVER_ERROR));
        }
        result.forEach((e) => {
          e.image = req.connection && req.connection.encrypted ? 'https' + '://' + e.image : 'http' + '://' + e.image
          //   console.log(e.image);
          // console.log(req.connection && req.connection.encrypted ? 'https' : 'http' + '://' + e.image);

          // console.log(req.connection && req.connection.encrypted ? 'https' : 'http');
      })
        return res.send(success(result, "Reward list"));
      });
    }
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

    DB.query('select id,name,description,image from bm_reward_category where is_active = 1 order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
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
exports.vendorList = (req, res) => {
  try {
    let param = req.query;
    let info = common.pagination(param.page);

    DB.query('select id,first_name,last_name,email,phone_no,address,company_name,is_active from bm_vendors order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "Reward list"));
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

    DB.query('select id,name ,email,dob,mobile_no from bm_users where is_active = 1 order by id asc LIMIT  ? OFFSET  ?', [info.limit, info.offset], async function (err, result) {
      if (err) {
        console.log(err);
        return res.send(error(constants.SERVER_ERROR));
      }
      return res.send(success(result, "user list"));
    });

  }
  catch (e) {
    console.log(e);
    return res.send(error(constants.SERVER_ERROR));
  };
}
