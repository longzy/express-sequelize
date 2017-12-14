var express = require('express');
var debug = require('debug')('lanlog:server');
var router = express.Router();
var LogCtrl = require('../app/controllers/LogCtrl');
var StatisticsCtrl = require('../app/controllers/StatisticsCtrl');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * 懒懒日志记录
 */
router.get('/log', LogCtrl.addLog);

/**
 * 每日日志 查询页面
 */
router.get('/admin/log', function (req, res, next) {
    res.render('log/index', {subject: '懒懒日志'});
});

/**
 * 每日日志 数据接口
 */
router.get('/api/admin/log', StatisticsCtrl.findDaliyData);

/**
 *
 */
// router.get('/admin/tk/stat', StatisticsCtrl.timingSave);

module.exports = router;
