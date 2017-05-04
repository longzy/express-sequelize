"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var dbConfig    = require(path.join(__dirname, '../..', 'config', 'db.js'));
// var env       = process.env.NODE_ENV || "develop";
var db = {};

if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL,dbConfig.options);
} else {
    var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);
}

// 数据库连接测试
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;