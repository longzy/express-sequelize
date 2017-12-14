"use strict"

var path = require("path");
var db   = require('../models');
var pool = require(path.join(__dirname, '../..', 'config', 'pool.js'));

var DailyLogRepository = {

    /**
     * 插入每日 日志统计数据
     * @param log
     * @returns {log}
     */
    insertDailyLog: function (log) {
        return db.Daily.create(log);
    },

    queryDailyData: function(date){
        return db.Daily.findAll({where:{date: date}});
    }
}

module.exports = DailyLogRepository;