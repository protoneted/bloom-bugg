var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
const envCon = require('./app/config/env');
const https = require("https");
const fs = require("fs");

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 }));
const { jwt, errorHandler, sessionChecker } = require('./app/utils/jwt');


const db = require('./app/config/db.config');
global.DB = db;
// app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// app.use(jwt());

// app.use(errorHandler);
require('./app/routes/user.route.js')(app);


console.log("=======here");
// var server = app.listen(8000, '0.0.0.0', function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("App listening at http://%s:%s", host, port)
// })
const options = {
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("cert.pem"),
	ca: [fs.readFileSync('fullchain.pem')]
};
// Creating https server by passing
// options and app object
 var server = https.createServer(options, app);


    const io = require('socket.io')(server);
    // console.log(io);
    io.on('connection', client => {
        console.log("data");
        client.on('event', data => { /* … */ });
        client.on('disconnect', () => { /* … */ });
      });

      server.listen(8000, function (req, res) {
        console.log("Server started at port 8000");
    });