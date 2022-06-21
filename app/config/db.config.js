const env = require('./env.js');
var mysql = require('mysql');
var db = mysql.createPool({
    host: env.host,
    user: env.username,
    password: env.password,
    database: env.database,
    multipleStatements: true
});

module.exports = db;
