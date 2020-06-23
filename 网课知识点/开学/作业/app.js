const Koa = require("koa");
const koaStatic = require('koa-static');
const router = require("koa-router")();
const KoaViews = require("koa-views");

const app = new Koa();
app.use(KoaViews(__dirname + "/views", {
    map: {
        "html": "nunjucks"
    }
}))

app.use(koaStatic(__dirname + '/public'))

router.get("/", async ctx => {
    await ctx.render("home.html", {
        title: "首页",
        content: "首页",
        url: "/img/a.gif"
    });
})
router.get("/book", async ctx => {
    await ctx.render("book.html", {
        title: "学习手册",
        content: "学习手册",
    });
})
router.get("/blog", async ctx => {
    await ctx.render("blog.html", {
        title: "技术博客",
        content: "技术博客",
    });
})
router.get("/video", async ctx => {
    await ctx.render("video.html", {
        title: "学习视频",
        content: "学习视频",
    });
})

app.use(router.routes());



app.use(async ctx => {
    ctx.body = "404"
})

app.listen(3000, function() {
    console.log("启动成功")
})