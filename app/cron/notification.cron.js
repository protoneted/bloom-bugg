var admin = require("firebase-admin");
var moment = require('moment');

var serviceAccount = require("../config/bloom-bugg-firebase-adminsdk-xi5y7-8c5541a341.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("here111");

exports.sendNotification = function (req, res, next) {
    console.log("come");
    DB.query("select * from bm_notifications where is_send = 0  order by id desc limit 10", async function (err, result) {
        // console.log(result);
        if (err) {
            console.log(err);
            res.send(err);
        }
        else if (result.length > 0) {
            result.forEach(function (item) {
            let topic = item.email;
            var payload = {
                data: {
                    title: item.title,
                    body: item.notification,
                }
            };
    admin.messaging().sendToTopic(topic, payload).then(function (response) {    
        console.log(response);
        DB.query("update bm_notifications set response = '" + JSON.stringify(response) + "',payload = '" + JSON.stringify(payload) + "',is_send = 1,send_time = '" + moment().format('YYYY-MM-DD HH:mm:ss') + "' where id =  " + item.id, async function (err, result) {
            console.log(result)
            if (err) {
                console.log(err);
                res.send(err);

            }
            console.log("Successfully sent message:", response, "Topic", topic);
            // res.send(response);
        })
        return res.send(response);
    }).catch(function (error) {
        console.log(error);
        return res.send(error);
    })
});
} else {
    res.send("No data");
}
});
}