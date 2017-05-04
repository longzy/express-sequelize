var logRepo = require('../data/LogRepo');

/**
 * 懒懒日志写入
 * @param req
 * @param res
 */
function addLog(req, res) {

    var log = {};
    var type = req.query['type'],
        uuid = req.query['uuid'],
        tag  = req.query['tag'],
        id   = req.query['id'],
        tkPrice = req.query['tkPrice'],
        price   = req.query['price'],
        oPrice  = req.query['originPrice'];

    log.type = Number(type);
    log.uuid = uuid;
    log.ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    log.isDeleted = 0;
    log.updated = Date.now()/1000;
    log.created = Date.now()/1000;

    if(log.type === 1){
        log.parameter0 = tag;
    }
    // 事件
    if(log.type === 2){
        log.parameter0 = id;
        log.parameter1 = tag;
        log.parameter2 = tkPrice;
        log.parameter3 = price;
        log.parameter4 = oPrice;
    }

    logRepo.insertLog(log)
        .then(function (p) {
            console.log('created.' + JSON.stringify(p));
            res.end();
        })
}

/**
 * 第一段判断是否有反向代理IP(头信息：x-forwarded-for)，在判断connection的远程IP，以及后端的socket的IP
 * @param req
 * @returns {*}
 */
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

module.exports = {
    addLog: addLog
}