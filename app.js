var express = require('express');
// var glob = require('glob');
var debug = require('debug')('lanlog:server');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var index = require('./routes/index');
// var db = require('./app/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

var blocks = {};
hbs.registerPartials(__dirname + 'app/views/partials');

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name, context) {
	var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    if(!len){
    	return context.fn(this);
    }else{
    	return val;
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// var controllers = glob.sync(__dirname + '/app/controllers/*.js');
// controllers.forEach(function (controller) {
//     console.log("controller: ");
//     console.log(require(controller));
//     require(controller)(app);
// });

// 同步到数据库
// db.sequelize
//     //sync方法如果配置{force: true}时，如果数据库有表则会删除表，再重建。
//     .sync()
//     .then(function (err) {
//         console.log('It worked!');
//     }, function (err) {
//         console.log('An error occurred while creating the table:', err);
//     });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
