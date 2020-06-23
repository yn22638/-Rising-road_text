# Node
### 创建项目流程：
* 创建项目目录
* 执行``npm init``初始化项目package.join
* 下载项目必须得模块：``npm install koa koa-router view parser static nunjucks``
* 创建入口文件app.js
* app.js中引入模块``require("koa")``
* 创建web实例（Koa实例）
* 做一些必要的配置 use() , (__dirname)
  1. 设置模板引擎
  2. 设置静态文件目录
  3. 配置路由-> 路由安装到实例中``router.routes()``
* 监听端口
* 以上文件配置好后，运行``nodemon app.js``启动项目
* 启动后，访问``http://127.0.0.1:端口号`` / ``http://localhost:端口号``

### 安装``nodemon``
`npm install -g nodemon`

### 核心模块

* fs (file system 文件系统)
* http 
* path
* url

#### fs
```js
    const fs = require("fs");

    fs.readFile("1.txt", "utf8", (err, data) => {
        console.log(err); // null
        console.log(data); // Hello
    });
    readFile("url","utf8","callback(err,data)")
    writeFile("写入路径","写入内容","callback(err)")                

```


### 转换数据类型
```$xslt
    String(data), 请定义转换
    data.toString(), 调用toString方法转换
```


#### http
使用Http模块，可以创建一个web服务器
```js
    //引入模块
    const http = require("http");
    const server = http.createServer((resquest,response) =>{
        //resquest 请求
        //response 响应
        //解决中文乱码，设置响应头
        response.writeHead(200,{"Content-Type":"text/html;charser=utf-8"})
        /*
            /user ->用户信息
            /user/login -> 登录页面
            // / -> 首页
            //如果是其他地址 -> 404，请求地址错误
            

        */
        let reqUrl = request.url;
        if (reqUrl == "/"){
            response.write("<p>我是首页</p>")
        } else if(reqUrl == "/book"){
            response.write("<p>我是书籍页</p>")
        } else if(reqUrl == "/book/section"){
            response.write("<p>我是书籍章节页</p>")
        }             

        response.write("<p>我是一个段落！！</p>")
        response.end("hello node!");//结束响应
    })
    //监听端口
    server.listen(3000,()=>{
        console.log("服务器已在3000端口上运行")
    })
```

```js
    http.createServer(callback(req,res))//创建一个web服务器对象
        //resquest 请求 是携带请求信息的对象，制度对象
        //response 响应 响应数据对象，可以使用对象里面的一些方法，也可以更改属性值
```


### koa模块
```js
    //引入模块koa
    const Koa = require("koa")
    //创建对象实例
    const app = new Koa();

    //use(中间件)
    app.use(async (ctx,next) =>{
        ctx.body = "hello World!"//在页面输出hello world
        await next();//继续向后执行
    })
    app.use(async (ctx,next) =>{
        ctx.body = "hello Node!"//在页面输出hello Node，替换hello world
    })


    //监听端口
    app.listen(400,()=>{
        console.log("https:127.0.0.1//4000")
    })
```


```js
    //koa-router
    //安装： npm i koa-router --save
    //项目引入：const router = require("koa-router")()!!!小括号代表函数调用
    

    router.get("/",async ctx =>{
        // ctx 上下文对象，包含了请求对象，响应对象
        // ctx.body = "首页"
        //渲染页面rander()
        await  ctx.render("index",{
            msg:"aaaa",
        })
    })
    router.get("/about",async ctx =>{
        // 响应体
        ctx.body = "关于我们"
    })
    
    //use(中间件)
    app.use(async (ctx,next) =>{
        ctx.body = "hello Node"//在页面输出hello Node，替换hello world
        //ctx.body = "404";访问其他路由显示404
    })


    //安装路由
    app.use(router.routes());
```

### nunjucks
```js
    //安装koa - views nunjucks
    //项目中引入koa-views,nunjucks不需要在项目中引入：`const KoaViews = require("koa-views")`
    //配置模板引擎：KoaViews(path,options)
        //path:模板存放的位置
        //options：设置使用哪个模板引擎去解析文件
        //__dirname 获取当前文件所在的目录的绝对路径，主文件路径
        //__dirname + "/views"
    //渲染模板`ctx.render(模板,[options可选])`
    //模板语法
    /*
        //俩个大括号可以显示变量``{{name}}``
        //条件语句：`{% if true %} 展示的内容{% endif %}  endif是结束
        //循环语句{% for .. in .. %}
        //遍历数组 
                {% for item in arr %}
                    item代表数组中的元素
                    loop.index 可以获取数组中索引 ，从1开始
                    loop.index0 可以获取数组中索引，从0开始
        //遍历对象 {% for key,value in object %}
                key 是属性名
                value 是属性值
                注意：遍历对象时 key 和 value 不能省略
        //include
    */
    app.use(KoaViews("./views",{
        map:{
            "html":"nunjucks"
        }
    }))

    //渲染页面rander()
          await  ctx.render("index",{
              msg:"aaaa",
          })

    
```
## 页面中怎么加载图片

### 静态文件 koa-static
```js
    koa-static //设置静态目录文件
    //安装：
        `npm i koa-static --save`
    // 引入：
    `const koaStatic = require('koa-static')()` //直接引入的是一个函数，要使用这个函数，返回一个对象
    
    // 设置静态目录：
        //__dirname 是当前项目的绝对路径
        router.use(koaStatic(__dirname + '/static'))


    //配置好之后可以通过  `/文件/图片名`   获取到相对应的静态资源

        koaRouter.get("/video/1", async(ctx) => {
            ctx.body = `
                <link rel = "stylesheet" href = "/css/main.css">
                <h1>视频</h1>  
                <img src ="/img/1.gif">
            `;
        });
```
____
### koa-parser
#### 拿到post 方式提交的数据 需要使用 koa-parser

* 安装`npm i koa-parser --save`
* 引入`const koaParser = require('koa-parser')`
* 使用插件`app.use(koaparser())`
* 获取到数据 `ctx.require.body`
例
```js
    router.post("/data", async ctx => {
        let username = ctx.request.body.username;
        await ctx.render("data",{usr:username})
    })
```    
## **获取用户传递数据的几种方式**

1.  ctx.query  获取查询数据,不能获取重复的key值 /news?id=1234 ,获取到的结果是对象 {id: 1234}；ctx.query 等价于 ctx.request.query
2.  ctx.queries  获取查询数据,可以获取重复的key值 /news?id=12&id23获取到的结果是对象 {id: ["12","23"]}; ctx.queries 等价于 ctx.request.queries
3.  ctx.params   获取的是命名参数（动态路由）"/news/:id" ,用户输入的地址"...../news/123456",获取到的结果也是一个对象 {id: "123456"}
4.  ctx.request.body  获取post方式提交的数据，结果是一个对象

我们通过上面的代码定义了一个 UserController 的类，类里面的每一个方法都可以作为一个 Controller 在 Router 中引用到，我们可以从 app.controller 根据文件名和方法名定位到它。

#### npm难以安装包的解决方法
``npm config set strict--ssl false``








