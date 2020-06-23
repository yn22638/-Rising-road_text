const Koa = require("koa");
const koaRouter = require("koa-router")();
const KoaViews = require('koa-views');
const app = new Koa();
app.use(KoaViews(__dirname + "/views", {
    map: {
        html: "nunjucks",
    }
}))

//首页
koaRouter.get("/", async(ctx) => {
        await ctx.render("index", {
            title: "首页",
        })
    })
    //音乐
koaRouter.get("/music", async(ctx) => {
    await ctx.render("music", {
        title: "音乐页",
    })
})


//电影
koaRouter.get("/moves", async(ctx) => {
    await ctx.render("moves", {
        title: "电影页",
    })
})

app.use(koaRouter.routes())

app.listen(8080, () => {
    console.log("启动成功")
})