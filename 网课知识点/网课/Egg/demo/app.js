// module.exports = app => {
//     app.beforeStart(
//         async() => {
//             await app.module.synx({})
//         }
//     );
// }
module.exports = app => {
    app.beforeStart(async function() {
        // 应用会等待这个函数执行完成才启动
        // await app.model.sync({ force: true }); // 开发环境使用，会删除数据表
        //不写这段代码，不能通过model创建表
        //这段代码会永久存储数据
        await app.model.sync({});
    });
};