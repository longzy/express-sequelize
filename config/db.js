var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
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
    production: {
        database: 'test', // 数据库
        username: 'www', // 用户名
        password: 'www', // 口令
        options: {
            host: 'localhost', // 主机名
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