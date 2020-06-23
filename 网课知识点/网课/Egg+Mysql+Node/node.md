# node

Node.js 是一门动态语言，运行在服务端的 Javascript

### 环境搭建

1. Node 官网下载安装文件下载完后进行安装，建议安装到默认路径，注意不要有中文路径
2. 配置环境变量
3. 在命令窗口中输入 node -v，如果正常显示版本号则表示安装成功

### npm 包管理工具 需要其他的 npm 直接去搜 npm

- 自己必须先要有一个包描述文件 包管理工具
- 创建一个包的描述文件`npm init`
- 安装淘宝镜像 `npm install art-template jquery@1.2.1 --save`
  - 记录依赖`--save`
- 根据 package.json 文件中的`dependencise`属性来恢复依赖
  - 恢复包`npm install`
- 卸载一个包`npm uninstall jquery@1.5.1 --save`
- 查看一个包的信息`npm info jquery`
- 查看包信息中的某个字段`npm info jquery versions`
- 查看包的文档`npm docs jquery`
- 安装全局命令行工具`npm install -g http-server`
- 卸载全局命令行工具`npm uninstall -g http-server`
- 查看全局包下载路径`npm root -g`

### 创建 Node.js 应用

- 步骤一、引入 required 模块

```js
var http = require("aaa");
```

#### 分类

- 全局对象: 何时何处都能访问
- 核心对象: 向系统索要,引入即可使用
- 自定义对象: 按路径引入即可

### 核心模块

#### fs

> fs 模块是 node 的文件系统模块，通过此模块的 readFile 方法可以读取文件，我们新建一个 readFile.js 文件，然后在其目录同级创建一个 txt 文件，内容为 hello node，然后编辑 readFile.js 文件，代码如下所示：

```js
const fs = require("fs");
fs.readFile("a.txt", (err, data) => {
  if (err) {
    console.log(err); //flase
  }
  console.log(data.toString()); //true
});
```

### koa 框架

- koa 基于 node 的 web 服务器框架

  - 安装 -`npm i koa save`

- 引用
  - 在项目中使用核心模块一样 使用 `require('koa')`

## node 启动项目

#### 用 node 启动项目

`node app.js`

#### 用 nodemon 启动项目

1. 安装 `cnpm install -g nodemon`S
   启动 `nodemon app.js`S

### 为什么用 nodemon 启动项目

```
    在编写调试Node.js项目，修改代码后，需要频繁的手动close掉，然后再重新启动，非常繁琐。现在，我们可以使用nodemon这个工具，它的作用是监听代码文件的变动，当代码改变之后，自动重启。
```

### 路由 Koa - router


- 在浏览器地址栏直接输入地址的方式，这种请求是get请求

    - 常用请求有
        1. get请求： 用来获取页面，获取数据
        2. post请求： 用户用来提交数据，一般在注册，登录使用，post

    - 先学get

    - 安装：`npm i koa-router --save`
    - 引入：`const koaRouter = require('koa-router')()`直接引入的是一个函数，要使用这个函数，返回一个对象


# 写路由规则(配置路由)

```js
koaRouter.get("/", async (ctx) => {
  ctx.body = "<h1>首页</h1>";
});
// 安装插件(注册路由) `app.use(koaRouter.routes());`
```

# 页面中怎么加载图片

### 静态文件 koa-static

```js
koa -
  static//安装： //设置静态目录文件
  `npm i koa-static --save`// 引入：
  `const koaStatic = require('koa-static')()`; //直接引入的是一个函数，要使用这个函数，返回一个对象

// 设置静态目录：
//__dirname 是当前项目的绝对路径
router.use(koaStatic(__dirname + "/static"));

//配置好之后可以通过  `/文件/图片名`   获取到相对应的静态资源

koaRouter.get("/video/1", async (ctx) => {
  ctx.body = `
                <link rel = "stylesheet" href = "/css/main.css">
                <h1>视频</h1>
                <img src ="/img/1.gif">
            `;
});
```

# 模板引擎 Nunjunks

### 安装

```js
    npm install nunjunks --save
    npm install koa-views --save
```

- nunjunks 在使用 kos 框架创建的项目中，不能单独使用依赖于 koa-views
- koa-views 负责配置模板引擎
- 引入模块
  > require('nunjunks'),require('koa-views')

```js
//koaviews(模块存放地址，{固定使用哪个模板去解析})；
//nunjunks 必须放在router前面
app.use(KoaViews(__dirname + "/views"), {
  map: {
    http: "nunjunks",
  },
});
app.use(async (ctx) => {
  //render(模板,可选数据)
  await ctx.render("index", { title: "hello word!" }); //渲染模板
});
```

# 表单 from

```html
<body>
  <!-- action 指定表单提交数据的路径 -->
  <!-- method 既定表单提交时的方式 有get，post默认是get -->
  <form action="url" method="get">
    <!-- name属性规定传输数据的字段 -->
    <input type="name" />
    <input type="submit" />
  </form>
</body>
```

## 拿到 post 方式提交的数据 需要使用 koa-parser

- 安装`npm i koa-parser --save`
- 引入`const koaParser = require('koa-parser')`
- 使用插件`app.use(koaparser())`
- 获取到数据 `ctx.require.body`

## 模板语法

```html
<!-- 遍历与条件判断 -->
<h1>睡过列表</h1>
{% if list.length > 0 %}
<ul>
  {% for item in list %}
  <li>{{item}}</li>
  {% endfor %}
</ul>
{% else %}
<p>无数据</p>
{% endif %}
```

### http 协议状态码

http 的状态码被分为 5 大类，状态码为客户端提供一种理解事务处理结果的便捷方式，我们在 network 工具中可以看到响应头中的的状态码。

1. 100~199（信息性状态码）：HTTP/1.1 向协议中引入了信息性状态码
2. 200~299（成功状态码）：客户端发起请求时，这些请求通常都是成功的。服务器有一组用来表示成功的状态码，分别对应于不同类型的请求
3. 300~399（重定向状态码）：重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源，要么就提供一个替代的响应而不是资源的内容
4. 400~499（客户端状态码）：有时客户端会发送一些服务器无法处理的东西。浏览网页时，我们都看到过臭名昭著的 404 Not Found 错误码，这只是服务器在告诉我们，它对我们请求的资源一无所知
5. 500~599（服务器状态码）：有时客户端发送了一条有效请求，服务器自身却出错了，这些会返回 5xx 状态码
   下面三个常用的 HTTP 状态码使我们必须要记住的：

6. 200 OK ：请求被正常处理
7. 404 Not Found：服务器找不到客户端请求的资源，也有可能是服务器不想 让你访问而故意返回 404
8. 500 Internal Server Error：服务器内部错误

### 使用 Ajax 增删改查

```js
//数据
let dataList = ["香蕉", "苹果", "鸭梨"];

//get查看
router.get("/fruits", (ctx) => {
  ctx.body = dataList;
});
//post添加
router.post("/fruits", (ctx) => {
  let fruit = ctx.request.body.fruit;
  dataList.push(fruit);
  ctx.body = dataList;
});

//put修改
router.put("/fruits/:id", (ctx) => {
  let id = ctx.params.id;
  let fruit = ctx.request.body.fruit;
  dataList.splice(id, 1, fruit);
  ctx.body = dataList;
});
//delete删除
router.delete("/fruits/:id", (ctx) => {
  let id = ctx.params.id;
  dataList.splice(id, 1);
  ctx.body = dataList;
});
```
