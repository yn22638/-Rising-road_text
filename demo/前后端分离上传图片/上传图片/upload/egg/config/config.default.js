/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1555466639828_8861';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.security = {
        csrf: {
            enable: false, // 前后端分离，post请求不方便携带_csrf
            ignoreJSON: true
        },
        domainWhiteList: ['http://127.0.0.1:8080/', 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8081'], //配置白名单
    };

    config.cors = {
        // origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
        credentials: true, // 允许跨域请求携带cookies
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    return {
        ...config,
        ...userConfig,
    };
};