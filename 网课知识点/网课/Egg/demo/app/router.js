'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/a', controller.student.index);
    router.get('/student/:id', controller.student.findOne);
    router.get('/insertPage', controller.student.insertPage);
    router.post('/stu/insert', controller.student.insertStu);


    router.get("/sex", controller.sex.index);
};