/**
 * Created by zhengyun on 2017/5/23.
 */
var mysql = require('mysql');
var path      = require("path");
var dbConfig    = require(path.join(__dirname, 'db.js'));

var pool = mysql.createPool({
    host     : dbConfig.options.host,
    user     : dbConfig.username,
    password : dbConfig.password,
    port: '3306',
    database: dbConfig.database,
    // 最大连接数，默认为10
    connectionLimit: 5
})

module.exports = pool;