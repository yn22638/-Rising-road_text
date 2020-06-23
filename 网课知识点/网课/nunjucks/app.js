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

koaRouter.get('/', async ctx => {
    await ctx.render('index', { title: "首页", desc: "he咯哦" })
})

koaRouter.get('/doc', async ctx => {
    await ctx.render('index', { title: "文档页", desc: "文档丢失" })
})



//login登录
koaRouter.get('/login', async(ctx) => {
    let name = ctx.query.username;
    await ctx.render('login', { username: name })
})


//post请求
koaRouter.post('/login', async ctx => {
    let name = ctx.query.username;
    await ctx.render('login', { login: name })
})

//安装路由模块
app.use(koaRouter.routes())

// app.use(async(ctx) => {
//     //render(模板,可选数据)
//     await ctx.render("index", { title: "hello word!" }); //渲染模板
// })

app.listen(8080, () => {
    console.log("启动成功")
})