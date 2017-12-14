"use strict";

var env = process.env.NODE_ENV || 'development';
console.log("NODE_ENV: ", env);

var config = {
    // site_master
    "development": {
        database: '', // 数据库
        username: '', // 用户名
        password: '', // 口令
        options: {
            host: '', // 主机名
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    // site_cms
    "production": {
        database: '', // 数据库
        username: '', // 用户名
        password: '', // 口令
        options: {
            host: '', // 主机名
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};

module.exports = config[env];