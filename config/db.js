var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        database: 'xsj_master', // 数据库
        username: 'xsj_test_hd', // 用户名
        password: 't2t_e0e_s1s_t5t', // 口令
        options: {
            host: 'rds1c9uss12wneo8f664gpublic.mysql.rds.aliyuncs.com', // 主机名
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