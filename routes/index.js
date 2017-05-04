var express = require('express');
var router = express.Router();
var logCtrl = require('../app/controllers/LogCtrl');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * 懒懒日志记录
 */
router.get('/log', logCtrl.addLog);

module.exports = router;
