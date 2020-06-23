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

router.get("/", async ctx => {
    await ctx.render("index")
})

router.get("/api/data", async ctx => {
    ctx.body = "hello world"
})
router.post("/api/data", async ctx => {
    console.log(ctx.request.body)

    //传给前台数据
    ctx.body = "Hello Matthew!"
})






//
//axios 数据增删改查
let fruit = ["apple", "bananner", "pear"];

//axios页面
router.get("/axios", async ctx => {
        await ctx.render("axios")
    })
    //发送数据
router.get("/axios/data", async ctx => {
        ctx.body = fruit;
    })
    //axios添加数据
router.post("/axios/fruits", ctx => {
    //获取到前端发送过来的数据
    let data = ctx.request.body.fruit;
    console.log(data)
        //将数据添加到数组中，
    fruit.push(data)
        //将整个数据发送到前端
    ctx.body = fruit;
})

//更改数据
router.put("/axios/fruits/:id", async ctx => {
    //ctx.params.id获取id默认的数组索引
    let id = ctx.params.id;
    // 获取前端更新后的数据
    let newFruit = ctx.request.body.newFruit;
    //替换数据
    //splice(index,count,[option])
    fruit.splice(id, 1, newFruit);
    //把这个数组返回前端
    ctx.body = fruit;
})

//delect删除
router.del("/axios/fruits/:id", async ctx => {
        //获取到被删除元素的索引id,
        let index = ctx.params.id;
        //在源数据中删除这个元素
        fruit.splice(index);
        //将fruit返回给前端
        ctx.body = fruit;
    })
    //获取数据
router.get("/axios/data", async ctx => {
    ctx.body = fruit;
})


















app.use(router.routes())

app.listen("8080", () => {
    console.log("启动成功")
})