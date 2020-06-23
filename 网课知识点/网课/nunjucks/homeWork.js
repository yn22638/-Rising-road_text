//引入模块
const Koa = require('koa');
const koaRouter = require('koa-router')();
const KoaViews = require('koa-views');
const nunjucks = require("nunjucks");
const koaParser = require('koa-parser')
    //创建app实例
const app = new Koa();

//koaviews(模块存放地址，{固定使用哪个模板去解析})；
//nunjucks 必须放在router前面
app.use(KoaViews(__dirname + '/views', {
    map: {
        html: "nunjucks"
    }
}))

app.use(koaParser())

//登录页面
koaRouter.get('/', async ctx => {
    await ctx.render('workHome');
})

//验证登录
koaRouter.post('/userLogin', async ctx => {
    let username = ctx.request.body.userName;
    let password = ctx.request.body.passWord;
    if (username == "admin" && password == "123456") {
        ctx.body = "登陆成功"
    } else {
        ctx.body = "登陆失败"
    }

})


//跳转页面
koaRouter.get('/list', async ctx => {
    let fruits = ["apple", "苹果", "banner", "香蕉"];
    await ctx.render("list", { list: fruits });
})

//安装路由模块
app.use(koaRouter.routes())

app.listen(8081, () => {
    console.log("启动成功aaaaaa")
})