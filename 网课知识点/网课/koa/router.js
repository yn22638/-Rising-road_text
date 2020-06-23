// app 应用
// 引用koa
const Koa = require('koa'); //实际引入的是Koa的构造函数

//引入rourter 并使用
const koaRouter = require('koa-router')();

//引入static 
const koaStatic = require('koa-static');

//通过new关键字来创建实例对象，创建app应用服务
const router = new Koa();


// 设置静态目录
router.use(koaStatic(__dirname + '/static'))

//get 是http协议的 请求方式之一
koaRouter.get("/", async(ctx) => {
    ctx.body = `
        <link rel = "stylesheet" href = "/css/css.css">
        <h1>首页</h1>  
        <img src ="/img/1.gif">
    `;
});

//music
koaRouter.get("/music", async(ctx) => {
    ctx.body = `<h1>音乐</h1>  <img src ="/img/1.gif">`;
});

koaRouter.get("/video/1", async(ctx) => {
    ctx.body = `<h1>视频</h1>  <img src ="/img/1.gif">`;
});


//使用插件
router.use(koaRouter.routes());


router.use(async(ctx) => {
    ctx.body = "404,页面不存在"
});

router.listen(8080, () => {
    console.log("服务器已启动")
})