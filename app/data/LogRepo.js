"use strict";

var path      = require("path");
var db = require('../models');
var dbp = require('../utils/promise.js');
var pool    = require(path.join(__dirname, '../..', 'config', 'pool.js'));

var LogRepository = {

    /**
     * 插入日志
     * @param log
     * @returns {log}
     */
    insertLog: function (log) {
        return db.Log.create(log);
    },

    /**
     * 根据日期查询 每小时 UV
     * @param date
     * @returns {Promise}
     */
    queryUVByHour: function(date){
        // var sequelize = db.sequelize;
        // return db.Log.findAll({
        //     attributes: [
        //         [sequelize.fn('DISTINCT', sequelize.col('uuid')),'uuid'],
        //         [sequelize.literal("hour(FROM_UNIXTIME(`created`))"), 'time'],
        //         [sequelize.literal("date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')"), 'date'],
        //         // [sequelize.fn('HOUR', sequelize.col(sequelize.fn('FROM_UNIXTIME', sequelize.col('created')))), 'hour'],
        //         // [sequelize.fn('date_format', sequelize.col(sequelize.fn('FROM_UNIXTIME', sequelize.col('created'), '%Y-%m-%d'))), 'date']
        //     ],
        //     where: sequelize.literal("date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') = '2017-05-22' and uuid='0bcb6339b2124d7b8b467408255c96a3' and `type` = 1 and `parameter1` like '%lanlanlife.com%'"),
        // })
        // var sql = "SELECT count(DISTINCT `uuid`) as num, hour(FROM_UNIXTIME(`created`)) as 'hour', date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE TO_DAYS(DATE('2017-05-17')) - TO_DAYS(FROM_UNIXTIME(`created`)) = 1 and `type` = 1 and `parameter1` like '%lanlanlife.com%' GROUP BY hour";
        // var sql = "select *, count(DISTINCT uuid) from (SELECT DISTINCT(`uuid`), hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE TO_DAYS(NOW()) - TO_DAYS(FROM_UNIXTIME(`created`)) = 1 and `type` = 1 and `parameter1` like '%lanlanlife.com%')log group by hour";
        // var sql = "SELECT DISTINCT(`uuid`), hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE TO_DAYS(NOW()) - TO_DAYS(FROM_UNIXTIME(`created`)) = 1 and `type` = 1 and hour(FROM_UNIXTIME(`created`)) = 0 and `parameter1` like '%lanlanlife.com%'";
        // var sql = "select DISTINCT uuid,count(*), hour, date from (SELECT DISTINCT(`uuid`), hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE TO_DAYS(NOW()) - TO_DAYS(FROM_UNIXTIME(`created`)) = 1 and `type` = 1 and `parameter1` like '%lanlanlife.com%') log group by hour";
        // return sequelize.query(sql, {raw: false})

        var sql = "select DISTINCT uuid,count(*) as uv, hour, date from (" +
                    "SELECT DISTINCT(`uuid`), hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')='" + date +"' and `type` = 1 and `parameter1` like '%lanlanlife.com%'" +
                    ") log group by hour";

        return dbp(sql);
    },

    /**
     * 根据日期查询UV 总数
     * @param date
     * @returns {Promise}
     */
    queryUVSum: function(date){

        var sql = "select count(DISTINCT uuid) as uv from lan_logs WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')= '" + date + "' and `type` = 1 and `parameter1` like '%lanlanlife.com%'";

        return dbp(sql);
    },

    /**
     * 根据 当前日期 查询 每小时PV
     * @param date
     * @returns {Promise}
     */
    queryPVByHour: function(date){
        var sql = "SELECT count(uuid) as pv, hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')= '" + date + "' and `type` = 1 and `parameter1` like '%lanlanlife.com%' group by hour";
        return dbp(sql);
    },
    /**
     * 根据 当前日期 查询PV总数
     * @param date
     * @returns {Promise}
     */
    queryPVSum: function(date){
        var sql = "select count(uuid) as pv from lan_logs WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')= '" + date + "' and `type` = 1 and `parameter1` like '%lanlanlife.com%'";

        return dbp(sql);
    },
    /**
     * 根据 当前日期 查询每小时IP
     * @param date
     * @returns {Promise}
     */
    queryIPByHour: function(date){
        var sql = "select DISTINCT ip,count(ip) as ip, hour, date from (" +
                    "SELECT DISTINCT(`ip`), hour(FROM_UNIXTIME(`created`)) as 'hour',date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date' FROM `lan_logs` WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')= '" + date + "' and `type` = 1 and `parameter1` like '%lanlanlife.com%'" +
                    ") log group by hour";

        return dbp(sql);
    },
    /**
     * 根据 当前日期 查询 IP总数
     * @param date
     * @returns {Promise}
     */
    queryIPSum: function(date){
        var sql = "select count(distinct(ip)) as ip from lan_logs WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')= '" + date + "' and `type` = 1 and `parameter1` like '%lanlanlife.com%'";
        return dbp(sql);
    },

    /**
     * 根据 当前日期 查询各个频道 uv
     */
    queryUVByType: function(date){
        var sql = "select DISTINCT uuid,count(*) as uv, date, channel from (SELECT DISTINCT(`uuid`),date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date',parameter0 as 'channel' FROM `lan_logs` WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')='"+date+"' and `type` = 1 and `parameter1` like '%lanlanlife.com%') log group by channel";

        return dbp(sql);
    },

    /**
     * 根据 当前日期 查询各个频道 pv
     */
    queryPVByType: function(date){
        var sql = "SELECT count(uuid) as pv,date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d') as 'date',parameter0 as 'channel' FROM `lan_logs` WHERE date_format(FROM_UNIXTIME(`created`),'%Y-%m-%d')='"+date+"' and `type` = 1 and `parameter1` like '%lanlanlife.com%' group by channel";
        
        return dbp(sql);
    },

    queryClickNumByType: function(date){

    }
}

module.exports = LogRepository;