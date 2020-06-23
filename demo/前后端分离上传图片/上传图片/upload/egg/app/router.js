'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/upload/imagesList', controller.home.imagesList); //上传视频列表
    router.get('/api/imagesLists', controller.imagesLists.index);
};