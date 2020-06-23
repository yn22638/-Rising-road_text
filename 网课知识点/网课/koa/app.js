// app 应用
// 引用koa
const Koa = require('koa'); //实际引入的是Koa的构造函数

//通过new关键字来创建实例对象，创建app应用服务

const app = new Koa();

// demo01
//use方法 参数可以是一个回调函数
//cxt 是上下文变量,ctx可以获取到请求与响应的相关信息
// next：处理下一个异步函数。

// app.use(async(ctx) => {
//     //body 是响应的主体内容   俗称响应体
//     ctx.body = "Hello,everyone,my name is Matthew"
// })


//demo02

app.use(async(ctx, next) => {
    ctx.body = "Hello,everyone,my name is Matthew"
        //await 必须在async内使用
    await next();
})

app.use(async(ctx, next) => {
    console.log("我是一个中间件")
})


//每个应用程序对应一个方法

app.listen(8080, () => {
    console.log("服务器已启动")
})