/* eslint valid-jsdoc: "off" */

'use strict';
const path = require("path") //path是核心模块，不需要安装，直接使用
    /**
     * @param {Egg.EggAppInfo} appInfo app info
     */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1590043620698_3336';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.sequelize = {
        dialect: "mysql",
        host: "localhost",
        port: "3306",
        username: "root",
        password: "xiaozhou123",
        database: "student",
    }


    // // mysql配置文件
    // config.mysql = {
    //     client: {
    //         // host
    //         host: 'localhost',
    //         // 端口号
    //         port: '3306',
    //         // 用户名
    //         user: 'root',
    //         // 密码
    //         password: 'xiaozhou123',
    //         // 数据库名
    //         database: 'student',
    //     },
    //     // 是否加载到 app 上，默认开启
    //     app: true,
    //     // 是否加载到 agent 上，默认关闭
    //     agent: false,
    // };

    //配置模板
    config.view = {
        mapping: {
            ".html": "nunjucks"
        }
    }

    return {
        ...config,
        ...userConfig,
    };
};