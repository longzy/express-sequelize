var express = require('express');
var router = express.Router();

var userCtrl = require('../app/controllers/userCtrl');

/* GET users listing. */
router.get('/', userCtrl.findAll);
router.get('/add', userCtrl.addUser);

module.exports = router;
