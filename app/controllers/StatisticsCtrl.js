"use strict";

const debug = require('debug')('lanlog:server');
const co = require("co");
const moment = require('moment');

const logRepo = require('../data/LogRepo');
const dailyLogRepo = require('../data/DailyLogRepo');

/**
 *
 * @param req
 * @param res
 * @param next
 */
function findUVByToday(req, res, next){
    logRepo.queryUVByHour()
        .then(function(data){
            // console.log("len: ",data.length);
            console.log(data);
        })
}

/**
 * 每日 日志 查询
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function findDaliyData(req, res, next){
    let yesterday = "2017-05-20";
    // let yesterday = moment().subtract(1, 'd').format('YYYY-MM-DD');
    dailyLogRepo.queryDailyData(yesterday)
    // .then(result => result.map(v => console.log(v.toJSON())))
    .then(function(result){
        var data = result.map(v => v.toJSON());
        console.log(data[0]);

        res.send(data[0])
    })
}

module.exports = {
    findDaliyData: findDaliyData
}