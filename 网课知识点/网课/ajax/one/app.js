const koa = require("koa")
const router = require("koa-router")()
const koaViews = require("koa-views")
const koaStatic = require("koa-static")
const app = new koa()

app.use(koaViews(__dirname + "/views"), {
    map: {
        http: "nunjucks"
    }
})

app.use(koaStatic("./public"));

router.get("/", async ctx => {
    await ctx.render("index")
})

router.get("/api/data", async ctx => {
    ctx.body = "hello world"
})

app.use(router.routes())

app.listen("8080", () => {
    console.log("启动成功")
})