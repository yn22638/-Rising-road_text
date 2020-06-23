const koa = require("koa")
const router = require("koa-router")()
const koaViews = require("koa-views")
const koaStatic = require("koa-static")
const koaParser = require("koa-parser")
const app = new koa()
app.use(koaParser());


app.use(koaViews(__dirname + "/views"), {
    map: {
        http: "nunjucks"
    }
})

app.use(koaStatic("./public"));

app.use(router.routes())

app.listen("8080", () => {
    console.log("启动成功")
})