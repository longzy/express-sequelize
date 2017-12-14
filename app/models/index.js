"use strict";

var fs        = require("fs");
var path      = require("path");
const debug = require('debug')('lanlog:server');
var Sequelize = require("sequelize");
var dbConfig    = require(path.join(__dirname, '../..', 'config', 'db.js'));
var db = {};

if (process.env.DATABASE_URL) {
    // 通过 uri 连接数据库 mysql://localhost:3306/database
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


importModel();

function importModel(file_dir){

    var __dir = file_dir || __dirname;

    fs.readdirSync(__dir)
        .filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function(file) {
            var stats = fs.statSync(path.join(__dir, file));
            if(stats.isDirectory()){
                debug(path.join(__dir, file));
                importModel(path.join(__dir, file));
            }
            if(stats.isFile()){
                var model = sequelize.import(path.join(__dir, file));
                db[model.name] = model;
                debug(model.name)
            }
        });
    debug("import sequelize model: ");
}

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;