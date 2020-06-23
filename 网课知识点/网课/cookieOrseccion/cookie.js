const Koa = require("koa");
const router = require("koa-router")();

//创建web服务器
const app = new Koa();

router.get("/", async ctx => {
    ctx.cookies.set("username", "xiaomingmingming", {
        //过期时间设置为五秒
        maxAge: 5000,
    });

    //获取cookie
    let usr = ctx.cookies.get("username");
    ctx.body = usr;

})

router.get("/music", async ctx => {

    let usr = ctx.cookies.get("username");
    ctx.body = `用户名是：${usr}`;
})

//count
router.get("/count", async ctx => {
    let count = ctx.cookies.get("count");
    if (count) {
        count++;
        ctx.cookies.set("count", count, {
            maxAge: 2000,
        });
    } else {
        count = 1;
        ctx.cookies.set("count", 1);
    }
    ctx.body = count
})

//安装插件 router
app.use(router.routes())
app.listen(8080, () => {
    console.log("启动成功")
})