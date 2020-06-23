const Koa = require("koa");
const router = require("koa-router")();
const session = require("koa-session");
//创建web服务器
const app = new Koa();

//设置密钥
app.keys = ["admin"]

//使用模块
app.use(session({
    maxAge: 2000,
}, app))


router.get("/session", async ctx => {
    if (ctx.session.count) {
        ctx.session.count++;
        ctx.body = `已经访问${ctx.session.count}次` //记录网页访问次数
    } else {
        ctx.session.count = 1
        ctx.body = `已经访问${ctx.session.count}次` //记录网页访问次数
    }
    // ctx.body = ctx.session.count
})


//安装插件 router
app.use(router.routes())
app.listen(8080, () => {
    console.log("启动成功")
})