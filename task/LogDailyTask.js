
const schedule = require('node-schedule');
const moment = require('moment');
const co = require("co");
const logRepo = require('../app/data/LogRepo');
const dailyLogRepo = require('../app/data/DailyLogRepo');


/**
 * 统计昨日 UV、PV、IP 数
 */
function timingSave(){
    console.log(" ====== 日志统计： 每日任务 开始 ======")

    co(function*(){
        // 昨天
        let yesterday = moment().subtract(1, 'd').format('YYYY-MM-DD');

        const uvh = yield logRepo.queryUVByHour(yesterday);
        const pvh = yield logRepo.queryPVByHour(yesterday);
        const iph = yield logRepo.queryIPByHour(yesterday);
        const uvsum = yield logRepo.queryUVSum(yesterday);
        const pvsum = yield logRepo.queryPVSum(yesterday);
        const ipsum = yield logRepo.queryIPSum(yesterday);


        let uvAry = [],pvAry = [], ipAry = [];

        for (let i = 0; i < uvh.length; i++) {
            let row = uvh[i];
            uvAry.push({uv: row.uv, hour: row.hour})
        }

        for (let i = 0; i < pvh.length; i++) {
            let row = pvh[i];
            pvAry.push({pv: row.pv, hour: row.hour})
        }

        for (let i = 0; i < iph.length; i++) {
            let row = iph[i];
            ipAry.push({ip: row.ip, hour: row.hour})
        }

        let daily = {
            date: yesterday,
            uv_sum: uvsum[0].uv,
            uv_h: JSON.stringify(uvAry),
            pv_sum: pvsum[0].pv,
            pv_h: JSON.stringify(pvAry),
            ip_sum: ipsum[0].ip,
            ip_h: JSON.stringify(ipAry),
            created: Date.now()/1000
        };

        // console.log(daily);
        dailyLogRepo.insertDailyLog(daily)
            .then(function (p) {
                console.log("日志统计：====== 每日任务 结束 ======")
            })

    }).catch(function(error){
        error && console.error(error)
    })
}

/**
 *
 * cron: '0 30 2 * * *' : 每天凌晨2点半 执行一次
 */
const job = schedule.scheduleJob('0 30 2 * * *', function(){

    console.log(" ====== 日志统计： 定时任务 ======")
    console.log("执行时间：" + moment().format('YYYY-MM-DD hh:mm:ss'));
    timingSave();

});