## egg.js

<!-- keystone.js 也是一个mvc框架 -->

Egg.js 为企业级框架和应用而生， Egg.js 孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。

* 特性
  - 提供基于 Egg 定制上层框架的能力
  - 高度可扩展的插件机制
  - 内置多进程管理
  - 基于 Koa 开发，性能优异
  - 框架稳定，测试覆盖率高
  - 渐进式开发

### 创建egg项目

1. 创建egg的环境，只需要在电脑上面配置一次就可以， egg-init是项目脚手架
````js
npm i egg-init -g
````

2. 创建项目
````js
egg-init 项目名称 --type=simple
````

3. 进入到这个文件夹
````js
cd 项目文件夹名
````

4. 安装依赖
```js
npm install
```

5.启动项目
````js
npm run dev
````

安装成功后直接执行``npm run dev``，默认端口是7001，然后在浏览器中打开``localhost:7001``如果出现如下图所示就说明初始化目成功了，如果安装依赖失败那么可以强制npm清理一下缓存``npm cache clean --force``然后再安装，如果还是报错可以翻墙到面再试下。

### 项目目录结构

````
egg-project(项目名)
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.html
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
````
如上，由框架约定的目录：
* app/router.js 用于配置 URL 路由规则
* app/controller/ 用于解析用户的输入，处理后返回相应的结果
* app/service/ 用于编写业务逻辑层，可选，建议使用
* app/middleware/ 用于编写中间件
* app/public/ 用于放置静态资源
* app/extend/ 用于框架的扩展
* config/config.{env}.js 用于编写配置文件
* config/plugin.js 用于配置需要加载的插件
* test/ 用于单元测试
* app.js 和 agent.js 用于自定义启动时的初始化工作，可选
* app/public/ 用于放置静态资源
* app/schedule/ 用于定时任务
* app/view/ 用于放置模板文件，由模板插件约定，
* app/model/ 用于放置领域模型，由领域类相关插件约定，如 egg-sequelize。

### 路由（Router）

Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系， 框架约定了 app/router.js 文件用于统一所有路由规则。

#### 如何定义 Router

app/router.js 里面定义 URL 路由规则
````js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/user/:id', controller.user.info);
  // get请求方式，内容去控制器controller下去找user.js,再找到user.js里面的info方法
};
````

app/controller 目录下面实现 Controller
````js
// app/controller/user.js
const Controller = require("egg").Controller;

// es6的类
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    // ctx.body 等价于 ctx.response.body  响应
    ctx.body = {
      name: `hello ${ctx.params.id}`,
    };
  }
}
````

这样就完成了一个最简单的 Router 定义，当用户执行 GET /user/123，user.js 这个里面的 info 方法就会执行。

#### Router 详细定义说明

下面是路由的完整定义，参数可以根据场景的不同，自由选择：
````js
router.verb('path-match', app.controller.action);
router.verb('router-name', 'path-match', app.controller.action);
router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);
````

路由完整定义主要包括5个主要部分:

* verb - 用户触发动作，支持 get，post 等所有 HTTP 方法，后面会通过示例详细说明。
  * router.head - HEAD
  * router.options - OPTIONS
  * router.get - GET
  * router.put - PUT
  * router.post - POST
  * router.patch - PATCH
  * router.delete - DELETE
  * router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
  * router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。
* router-name 给路由设定一个别名，可以通过 Helper 提供的辅助函数 pathFor 和 urlFor 来生成 URL。(可选)
* path-match - 路由 URL 路径。
* middleware1 - 在 Router 里面可以配置多个 Middleware。(可选)
* controller - 指定路由映射到的具体的 controller 上，controller 可以有两种写法：
  * app.controller.user.fetch - 直接指定一个具体的 controller
  * 'user.fetch' - 可以简写为字符串形式

**注意事项**

* 在 Router 定义中， 可以支持多个 Middleware 串联执行
* Controller 必须定义在 ``app/controller`` 目录中。
* 一个文件里面也可以包含多个 Controller 定义，在定义路由的时候，可以通过 ``${fileName}.${functionName}`` 的方式指定对应的 Controller。
* Controller 支持子目录，在定义路由的时候，可以通过 ``${directoryName}.${fileName}.${functionName}`` 的方式制定对应的 Controller。

**提醒**

* ``ctx.request.query.id`` 和 ``ctx.query.id`` 是等价的，`ctx.response.body=` 和 `ctx.body=` 是等价的。
* 需要注意的是，获取 POST 的 body 应该使用 `ctx.request.body`，而不是 `ctx.body`。

#### 控制器（Controller）

Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

* HTTP 传递过来的请求参数。
* 校验、组装参数。
* 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
* 通过 HTTP 将结果响应给用户。

**编写 Controller**

所有的 Controller 文件都必须放在 app/controller 目录下，可以支持多级目录，访问的时候可以通过目录名级联访问。Controller 支持多种形式进行编写，可以根据不同的项目场景和开发习惯来选择。

通过定义 Controller 类的方式来编写代码：
````js
// app/controller/user.js
// 引入控制器
const Controller = require("egg").Controller;

// 创建一个类，继承Controller
class UsersController extends Controller {
  async info(ctx) {
    const data = ctx.params
    ctx.body = data;
  }
}

module.exports = UsersController;
````

**获取用户传递数据的几种方式**

1.  ctx.query  获取查询数据,不能获取重复的key值 /news?id=1234 ,获取到的结果是对象 {id: 1234}；ctx.query 等价于 ctx.request.query
2.  ctx.queries  获取查询数据,可以获取重复的key值 /news?id=12&id23获取到的结果是对象 {id: ["12","23"]}; ctx.queries 等价于 ctx.request.queries
3.  ctx.params   获取的是命名参数（动态路由）"/news/:id" ,用户输入的地址"...../news/123456",获取到的结果也是一个对象 {id: "123456"}
4.  ctx.request.body  获取post方式提交的数据，结果是一个对象

我们通过上面的代码定义了一个 UserController 的类，类里面的每一个方法都可以作为一个 Controller 在 Router 中引用到，我们可以从 app.controller 根据文件名和方法名定位到它。
````js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.post('user', '/user/:id/:name', controller.post.user);
}
````

定义的 Controller 类，会在每一个请求访问到 server 时实例化一个全新的对象，而项目中的 Controller 类继承于 egg.Controller，会有下面几个属性挂在 this 上。

* this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
* this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
* this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
* this.config：应用运行时的配置项。
* this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

## service

几点好处：
* 保持controller里面更加简洁；
* 保持业务逻辑的独立性，可以被多个controller重复调用
* 逻辑与展现分层，对于代码测试会更方便

### 定义service

在app目录下创建service目录，在目录下创建业务逻辑

代码如下：
````js
// app/service/news.js

// 引入service
const Service = require("egg").Service;
class NewsService extends Service {
  async findOne(id) {
    // 复杂的业务逻辑

    // 查找到一条新闻，并返回
    return "美国疫情越来越严重"
  }
}
// 发布接口
module.exports = NewsService;
````

### 注意事项

* 一个Service文件只能包含一个类，这个类用module.exports方式返回
* 通过class定义类，父类必须是egg.Service
* Service不是单例，是请求级别的对象，在请求的时候首次访问Service.xx时，延迟实例化，可以通过this.ctx获取当前的上下文






# 数据库


## 安装

* 数据库安装路径不要有中文目录
* 安装好之后，在mysql/bin目录下 命令行执行``mysqld --initalize --console`` ,初始化数据库，并且显示随机密码，``····generated for root@localhost：····``:后面的内容是密码,需要记住
````shell
2020-04-17T01:07:02.906967Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: 5#;OAMlL&w(5
````
* 安装mysql服务 在mysql/bin目录下 执行``mysqld install mysql``
* 启动mysql服务，``net start mysql``
* 进入程序 没有配置环境变量时，在mysql/bin目录下 ``mysql -u 用户名 -p``,回车确认，提示我们输入前面记录的初始密码 ，
* 进来后我们修改密码： ``alter user user() identified by "123456";`` /

## 一、SQL语句 分类

* DDL:数据定义语言，可以用来操作数据库对象：库，表，列等
适用范围：对数据库中的某些对象(例如，database,table)进行管理，如Create,Alter和Drop

* DML:数据操作语言，增删改数据
适用范围：对数据库中的数据进行一些简单操作，如insert,delete,update,select等.

* DCL:数据控制语言，用来设置访问权限和安全级别
通过GRANT和REVOKE，确定单个用户或用户组对数据库对象的访问权限。

* DQL:数据查询语言，用来查询数据库中的数据
数据检索语句，用于从表中获取数据。通常最常用的为保留字SELECT,并且常与FROM子句、WHERE子句组成查询SQL查询语句。

## 二、数据类型

* int:整型数字
* double:内部浮点计算的类型
* char:固定长度 字符串
* varchar:可变长度 字符串
* text:大文本内容，博客存储文章 字符串
* blob:是一个二进制大型对象，是一个可以存储大量数据的容器，它能容纳不同大小的数据。

* date:日期 当业务需求中只需要精确到天时，可以用这个时间格式  `2020-04-16`
* time:时间,当业务需求中只需要每天的时间，可以用这个时间格式 `10:39:25`
* titmestamp:时间戳
* datatime:日期和时间的组合，2020-04-16 10:39:25 当业务需求中需要精确到秒时，可以用这个时间格式

* char和varchar的区别：
char(M)类型的数据列里，每个值都占用M个字节，如果某个长度小于M，MySQL就会在它的右边用空格字符补足．（在检索操作中那些填补出来的空格字符将被去掉）在varchar(M)类型的数据列里，每个值只占用刚好够用的字节再加上一个用来记录其长度的字节（即总长度为L+1字节）

## 三、常用操作命令

第一步启动数据库服务
数据库已经启动的时候，进入数据库：
```js
./mysql -u username -p
enter password: 123456
```

*  显示所有数据库：``show databases``;

* 创建数据库：
````js
` create database` 数据库库名
 create database a
 ///
 create database if not exists 数据库库名 default charset utf8 collate utf8_general_ci
 create database if not exists b default charset utf8 collate utf8_general_ci;//用反引号
将数据库修改为 UTF8：
alter database 数据库库名 character set utf8;
alter database db_name character set utf8;
````

**切换数据库：**

use 数据库库名；
```use database_name```

**删除数据库**：
```js
drop database  数据库库名；
drop database db_name;
```

**创建表：**
create table 表名(
    字段名称 int(6),
    字段名称 varchar(20)
    );
```js
create table student(
    id int(6),
    name varchar(20)
    );
```

**显示数据库所有表:**
```js
show tables;
```

**查看表数据**
```js
select * from 表名;
select * from student;
```

**增加字段:**
```js
alter table 表名 add 字段名 字段类型
alter table book add count int;
```

**修改字段名称:**
```js
alter table <表名> change <字段名> <字段新名称> <字段的类型>。
alter table li change name wang varchar(25);
```

**删除字段:**
```js
alter table 表名 drop 字段名
alter table book drop count;
```

**向表中插入数据**
```js
insert into 表名(想插入的字段名称,...) values(想插入的字段的值)
insert into 表名 values(表中所有字段的值)
```

**删除指定的某一行**
```
delete from 表名 where 条件表达式;
delete from student where id=1;
```

**修改表中记录**
update 表名 set 字段名=新的字段值 where 条件表达式
update student set name=小李 where id=1;

**修改表名**
RENAME TABLE <旧表名> TO <新表名>;
rename table jiu to xin

**删除表：**
drop table 表名;
drop table table_name;

**查看表结构：**
desc 表名
desc table_name;

**清空表**
delete from 表名;
delete from student;
以上是一些常用的 SQL 语句和函数的示例代码：
更多的 SQL 语句在右方示例代码内
→
示例代码

### 四、存储引擎
show engines; --显示所有存储引擎
--创建表的时候可以指定存储引擎，如果不指定就会使用默认的存储引擎
show create table user; --查看user表当前使用的存储引擎。
--不同存储引擎的特性不同
MyISAM:节省存储空间，查询较多。

InnoDB:支持事务，修改较多。

MEMORY:数据存储在内存中，可以存储非永久保存的数据

五、事务 transaction
事务可以保证多个任务的原子性，例如三个任务如果有一个没有完成，那么三个都不执行。

可以保证多个操作要么全部成功，要么全部失败。

事务的特征

原子性(A)：事务是最小单位，不可再分

一致性©：事务要求所有的 DML 语句操作的时候，必须保证同时成功或者同时失败

隔离性(I)：事务 A 和事务 B 之间具有隔离性

持久性(D)：是事务的保证，事务终结的标志(内存的数据持久到硬盘文件中)

* 关于事务的一些术语
开启事务：Start Transaction
事务结束：End Transaction
提交事务：Commit Transaction
回滚事务：Rollback Transaction
* 和事务相关的两条重要的SQL语句(TCL)

commit:提交
rollback：回滚
开启标志：
- 任何一条DML语句(insert、update、delete)执行，标志事务的开启
结束标志(提交或者回滚)：
 提交：成功的结束，将所有的DML语句操作历史记录和底层硬盘数据来一次同步
 回滚：失败的结束，将所有的DML语句操作历史记录全部清空
事务的四个隔离级别

读未提交：read uncommitted

读已提交：read committed

可重复读：repeatable read

串行化：serializable

隔离级别

六、索引
提升数据库查询效率，表中每一个字段都可以添加索引，主键会自动添加索引，所以按照主键查询效率更高。

什么情况下添加索引

该字段数据量庞大

该字段很少的 DML 操作

该字段经常出现在 where 条件中

--创建索引
--create index 索引名 on 表名(列名);
create index name_index on user(name);
--查看索引
show index from user;
--删除索引
drop index name_index on user;
七、视图
视图就是一个查询结果，可以隐藏表中的细节。
--创建视图
--create view 视图名称 as 查询语句;
create view user_view as select name,age,sex from user;
--查询视图
select * from user_view;
--修改视图
alter view user_view as select name,age from user;
--删除视图
drop view user_view if exists user_view;
八、MySQL 约束
概念：对表中的数据进行限定，保证数据的正确性、有效性和完整性
唯一约束
unique，某一列的值不能重复(写在你要加的字段里面)
 1. 注意：
        * 唯一约束可以有NULL值，但是只能有一条记录为null
    1. 在创建表时，添加唯一约束
    语法：
    create table 表名(
        字段名 数据类型,
        字段名 数据类型 unique
    )
        CREATE TABLE stu(
            id INT,
            phone_number VARCHAR(20) UNIQUE
        );

    1. 删除唯一约束
    语法:alter table 表名 drop index 字段名
        ALTER TABLE stu DROP INDEX phone_number;

    1. 在表创建完后，添加唯一约束
    语法:alter table 表名 modify 字段名 数据类型 unique
        ALTER TABLE stu MODIFY phone_number VARCHAR(20) UNIQUE;
非空约束
not null
  1. 创建表时添加约束
        CREATE TABLE stu(
            id INT,
            NAME VARCHAR(20) NOT NULL -- name为非空
        );
    2. 创建表完后，添加非空约束
    语法:alter table 表名 modify 字段名 数据类型 not null
        ALTER TABLE stu MODIFY NAME VARCHAR(20) NOT NULL;

    3. 删除name的非空约束
    语法:alter table 表名 modify 字段名 数据类型
        ALTER TABLE stu MODIFY NAME VARCHAR(20);
同一个字段可以加上多个约束不需要用逗号隔开

主键约束
非空约束和唯一约束的一个组合我们称之为主键约束
primary key
  1. 注意：
        1. 含义：非空且唯一
        2. 一张表只能有一个字段为主键
        3. 主键就是表中记录的唯一标识

    2. 在创建表时，添加主键约束
        create table stu(
            id int primary key,-- 给id添加主键约束
            name varchar(20)
        );

    3. 删除主键
        -- 错误 alter table stu modify id int ;
    语法：alter table 表名 drop primary key;
        ALTER TABLE stu DROP PRIMARY KEY;

    4. 创建完表后，添加主键
    语法:alter table 表名 modify 字段名 数据类型 primary key;
        ALTER TABLE stu MODIFY id INT PRIMARY KEY;

    5. 自动增长：
        1.  概念：如果某一列是数值类型的，使用 auto_increment 可以来完成值得自动增长

        2. 在创建表时，添加主键约束，并且完成主键自增长
        create table stu(
            id int primary key auto_increment,-- 给id添加主键约束
            name varchar(20)
        );


        3. 删除自动增长
    语法:alter table 表名 modify 字段名 数据类型;
        ALTER TABLE stu MODIFY id INT;
        4. 添加自动增长
    语法:alter table 表名 modify 字段名 数据类型 auto_increment;
        ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;
外键约束
foreign key,让表于表产生关系，从而保证数据的正确性
下面为外键约束实际操作
 1. 在创建表时，可以添加外键
        * 语法：
            create table 表名(
                ....
                外键列
                constraint 外键名称 foreign key (外键列名称) references 主表名称(主表列名称)
            );

    2. 删除外键
        ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;

    3. 创建表之后，添加外键
        ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);

在 msqyl 中外键必须得是另一张表的主键

# sequelize


# node 连接数据库 使用mysql模块

1. 想要连接数据库，需要对数据库做配置 mysql8.0+
  <!-- - 创建用户： create user "username"@"host" identified by "password" password expire never;
  - 8.0+版本加密方式和以前是不一样，需要将加密方式做个更改： alter user "username"@"host" identified by "password" password expire never; -->
  - 只用这一句话就可以，将加密方式改为 mysql_native_password:: ``alter user "username"@"host" identified with mysql_native_password by "password";``
  - 添加权限 grant all privileges on *.* to  "username"@"host" with grant option;
  - 刷新权限： flush privileges;

2. 配置好数据库之后，可以再项目中做配置
  - 安装mysql模块 ``npm install mysql --save``
  - 在项目中引入模块 ``const mysql = require("mysql")``
  - 创建连接对象
  - 连接数据库
  ````javascript
    const mysql = require("mysql");
    /* 创建连接对象 */
    const connect = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "shengbang"
    })
    /* 连接数据库 */
    connect.connect( err => {
      if(err) {
        throw err;  // 抛出异常
      } else {
        console.log("连接数据库成功")
      }
    })
  ````

3. 数据的增删改查 均使用 连接对象的query方法
```javascript
const CREATE_SQL = `create table if not exists test (
                    id int not null primary key auto_increment,
                    message varchar(200)
                  )`;
const SELECT_SQL = "select * from student";
const INSERT_SQL = "insert into teacher(t_id,t_name) values (?,?)";
const UPDATE_SQL = `update teacher set t_name=? where t_id=? `;
const DELETE_SQL = 'delete from teacher where t_id=?';

connect.query(INSERT_SQL, [10,"zhangsan"], (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log(result);
  }
})
```


拓展作业：
  在前端页面中显示一个表格  http://localhost:8080/students
  +--s_id---+---s_name---+---s_sex-----+---s_birth---+
  |学员编号  | 学员姓名    | 出生日期    | 性别        |
  | 01      | 赵雷        | 1990-01-01 | 男          |
  | 02      | 钱电        | 1990-12-21 | 男          |
  | 03      | 孙风        | 1990-05-20 | 男          |
  | 04      | 李云        | 1990-08-06 | 男          |
  | 05      | 周梅        | 1991-12-01 | 女          |
  | 06      | 吴兰        | 1992-03-01 | 女          |
  | 07      | 郑竹        | 1989-07-01 | 女          |
  | 08      | 王菊        | 1990-01-20 | 女          |
  | 10      | 张三        | 1998-02-04 | 女          |
  | 11      | 李四        | 1998-02-04 | 女          |
  | 12      | 王三        | 1998-02-04 | 女          |
  | 13      | 王三        | 1998-02-04 | 女          |
  | 9       | 张三        | 1998-02-04 | 男          |
  +---------+-------------+------------+------------ +
   - 需要的模块 koa koa-router koa-views nunjucks mysql
   - 安装模块 ``npm install koa koa-router koa-views nunjucks mysql --save``



# egg 连接数据库 egg-mysql

1. 在项目中安装 egg-mysql  ``npm install egg-mysql --save``
2. 在``config/plugin.js`` 文件中开启插件
```javascript
// config/plugin.js 文件
module.exports = {
  // 开启插件
  mysql: {
    enable: true,
    package: "egg-mysql"
  }
};
```
3. 在``config/config.default.js``,文件中配置数据库的基本信息
```javascript
// ....
config.mysql = {
      // 单数据库信息配置
    client: {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "123456",
      database: "shengbang"
    },
    //是否挂载到app上 默认挂载
    app: true,
  }
// ....
```
4. 在service层做业务处理
```javascript
// 引入service 类
const Service = require("egg").Service;

class StudentService extends Service {
  // 查询表中的数据
  async find() {
    const student = await this.app.mysql.query("select *  from student","");
    return {student:student};
  }
}
module.exports = StudentService;
```
5. crud处理 create-增加 read-查询 update-更新 delete-删除
```javascript
// 以下的语句都写在service里面
  // 查询语句
  // 查询整表 select(表名)
  const student = await this.app.mysql.select("student");
  // 查询一条信息 get(表名,条件)
  const student = await this.app.mysql.get("student",{s_id:"01"})

  // 插入语句
  // insert(表名，插入的内容) 插入的内容是包含表的字段，字段值
  const result = await this.app.mysql.insert("student",{s_name: "王麻子"});
  // result
  /* OkPacket {
  fieldCount: 0,affectedRows: 1,insertId: 0,serverStatus: 2,warningCount: 0,message: '',protocol41: true,changedRows: 0
  }
 */

  // 更新语句
  // update(表名，更新后的值, 指定行/条件)
  const result = await this.app.mysql.update("studtent",{s_birth: "2000-04-01",s_sex:"女"},{ where:{s_id: "101"} })

  // 删除语句
  // delete(表名，条件)
  const result = await this.app.mysql.delete("student",{s_id: "101"});
```

# 模板  egg-view-nunjucks

1. 安装插件 ``npm i egg-view-nunjucks --save``
2. 启用插件
```javascript
// config/plugin.js
// 方式一
exports.nunjucks = {
  enable: true,
  package: "egg-view-nunjucks"
}
// 方式二
module.exports = {
  // ... 省略其他代码
  // 开启插件
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks"
  }
};
```
3. 配置插件
```javascript
// 在config/config.default.js
  // ...
 // 配置模板基本信息
  config.view = {
    mapping: {
      ".html": "nunjucks"  // 在app/view文件夹下以 “.html”为扩展名的文件使用nunjucks模板引擎去解析
    }
  }
  // ....
```
4. 在目录app下创建view目录，在view下创建模板文件
5. 在控制器（contoller中去渲染模板）ctx.render(模板名，options)

## 复习：egg-mysql egg-view-nunjucks

1. 安装node  去官网安装 一直下一步安装就可以
2. 去git官网下载： https://git-scm.com/  一直下一步安装就可以
3. 安装：egg-init  安装好node后  在命令行：``npm i -g egg-init``
4. 创建项目 ``egg-init 项目名称  --type=simple``
5. 项目创建后，在项目目录下 安装项目依赖的模块：``npm install``
6. 启动项目 ``npm run dev``
7. 配置插件：``egg-mysql egg-view-nunjucks``
```javascript
// config/plugin.js
// 方式一
module.exports = {
  // ... 省略其他代码
  // 开启插件
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks"
  },
  mysql: {
    enable: true,
    package: "egg-mysql"
  }
};
```
```javascript
// 在config/config.default.js
  // ...
  //配置数据库
  config.mysql = {
    client: {
      host:"主机地址",
      port: "端口号",
      user:"mysql用户名",
      password: "密码",
      database:"数据库名"
    }
    // 将mysql挂在到app上
    app:true
  };
  // 配置模板基本信息
  config.view = {
    mapping: {
      ".html":"nunjucks"  // 在app/view文件夹下以 “.html”为扩展名的文件使用nunjucks模板引擎去解析
    }
  };
  // ....
```

## 实现数据的增删改查

1. 查： 获取数据库中的内容，并在页面中显示
  - 模板： 在app目录下创建 view文件夹，在view在去创建模板
  - 业务层操作数据库： 在app目录下创建 service文件夹，在service文件加下实现具体数据表的业务逻辑
    - 操作数据表student: 创建一个student.js
      -  查询整表方法：
         ```javascript
            //查询整表方法 方法我们自定义
            async find() {
               // 将查询结果存储到变量students中
               // 使用的是egg-mysql的 select(表,条件) 返回值是查询到的结果
               const students = await this.app.mysql.select("student");
               return students;
             }
         ```
      -  更新表的信息方法：
      -  删除方法
  - 控制层调用业务层的方法  ``ctx.service.xx.方法`` ，将数据发送给前端，前端处理数据
2. 添加数据：
  - 要有一个单独页面去做添加数据操作 ，
    - 创建模板
    - 写控制器，写对应的方法，渲染上面创建的模板
    - 配置路由‘/student/insertPage’、指定控制器中对应的方法
    - 点击提交的时，处理提交数据的路由“/student/insert”,提交方式为post方式，在指定一个控制器，
    - 控制器调用业务层里面插入数据的方法insertStudent()
    - insertStudent() 方法里面去实现向数据库中添加数据
3. 更新数据：
    - 不写更新页面，可以做一个模态框，当我点击更新按钮时，弹出模态框，模态框中有对应的数据，
    - 可以再模态框中对数据进行更改
    - 可以保存，实现数据库中内容的更新
4. 删除数据:
    - 创建路由，包括前端的处理
    - 控制器
    ```javascript
      async del() {
        const { ctx } = this;
        // 获取被删除元素的id
        let s_id = ctx.request.body.s_id;
        // 调用业务层的删除方法
        const result = await ctx.service.student.delStudent(s_id);
        ctx.body = result;
      }
    ```
    - 业务层
    ```javascript
      //  删除学员
      async delStudent(id) {
        const result = await this.app.mysql.delete("student",{
          s_id: id
        })

        return result;
      }
    ```

## egg-sequelize

egg-sequelize 是一个ORM框架；

### ORM框架

本质就是将数据从一种形式转换为另外一种形式。 对象关系映射（object relational mapping）,通过使用描述对象和数据库之间映射的元数据，将面向对象语言中间的对象自动持久化到关系数据库中。

好处：
  - 简单
  - 容易理解
  - 精确

缺点：
  - 业务需求发生变更，需要修改持久化层的接口
  - 加大软件的维护程度

### 在egg中使用

1. 安装模块  ``egg-sequelize``  ``mysql2``;
2. 开启插件,在项目目录下，config文件夹下的plugin.js文件中做配置
```javascript
  modele.exports = {
    // 开启插件
    sequelize: {
      enable: true,
      package: "egg-sequelize"
    }
  }
```
3. 配置数据库，在项目目录下，config文件夹下的config.default.js文件中做配置
```javascript
  // 省略其他代码
  config.sequelize = {
    dialect: "mysql", // 规定连接的是mysql数据库
    host: "localhost",
    port: "3306",
    username: "root",
    password: "123456",
    database: "shengbang"
  }
  // 省略代码
```
4. 项目根目录下去创建一个``app.js``的文件,内容如下
```javascript
module.exports = app => {
  app.beforeStart( async function() {
    // 不写这段代码，不能通过model创建表，
    // 这段代码会永久保存数据
    // await app.model.sync({})
    await app.model.sync({force:true}) // 开发环境下，每次重新启动服务时会清空数据表
  })
}
```
5. 创建数据模型

在app文件夹下去创建model的文件夹，将数据模型都放到model文件夹下
  ```javascript
    /* app/model/user.js */
    module.exports = app => {
      // 获取数据类型
      const { STRING, INTEGER, DATE } = app.Sequelize;

      // 定义表 define("表名",{字段},其他参数)
      // 创建表时，在数据表中会默认给表加“s”,复数形式，也就是说如果创建的是user表，我们在数据库中保存的是users这个表
      const User = app.model.define("user", {
        uid: {
          type: INTEGER,  // 规定数据类型
          primaryKey: true, // 主键
          autoIncrement: true, // 自动增长
          unique: true  // 是否唯一
        },
        uname: STRING,  // 直接规定数据类型
        upsw: STRING,
      },{
        freezeTableName: true,// 默认值是false,会自动在表名后加s
        timestamps: true, // 默认值是true,会自动添加created_at和updated_at字段
      })

      // 设置返回值
      return User;
    }
  ```
6. 可以controller和service 通过ctx/app获取到数据模型 ``ctx.model.名称.方法``/ ``app.model.名称``

**实现步骤：**
1. egg-sequelize 去操作数据库；
2. 构建数据模型（数据表），具体代码放到特定的文件夹``model``下； model 模型
3. 在model文件夹下去创建js文件，在js文件中去写具体的实现代码；
4. 使用``app.model.define("表名",{具体字段}) ``方法 去构建数据模型;
5. 够建好模型后，可以再控制器（controller）和业务层(service)中去操作数据库，app/ctx.model.数据模型名称.具体方法
6. 操作数据库的一些方法
   - 创建数据模型（表） app.model.define(表名，{字段}，其他参数)
   - CRUD操作方法
     - 创建  ctx/app.model.表.create({向表中插入的值：key:value})
     - 查找全部  ctx/app.model.表.findAll() 查找整表
       - 指定查询字段 例：``xx.findAll({attributes: ["uid","uname"])``
       - 指定查询字段,并且给字段起别名 ``xx.findAll({attributes: [["uid",id],"uname"])``
       - where语句 例：``xx.findAll({ where: {uid:5,uname:"xx"} )`` 对应sql语句 ``select * from user where uname="xx" and uid=5``
       - Op对象中有相关子句，例如or ，and，大于等，通过ctx/app.model.Sequelize.Op来获取到Op对象
         - Op.or 例：``xx.findAll({where: { uid:{[ctx.model.Sequelize.Op.or]: [5,6]} })`` 对应sql语句 ``select * from user where uid=6 or uid=5``
         - Op.gt 例：``xx.findAll({where: { uid:{[ctx.model.Sequelize.Op.gt]: 5} })`` 对应sql语句 ``select * from user where uid>5``
         - Op更多用法参照 [sequelize官网API](https://sequelize.org/v5/manual/models-usage.html)..
       - limit  查询数量
       - offset 偏移量
       - group  分组
       - order  排序
     - 通过主键查找 ctx/app.model.表.findByPk(主键的值)


# router知识点补充：

RESTful风格的编码方式，快速的定义CRUD路由结构，egg提供了 ``app.router.resources("routeName","path",controller)``

```javascript
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources("posts","/posts",controller.posts); // app/controller/posts.js
}
```

上面的路由包含以下路径，我们只需要在``app/controller/posts.js``里面实现对应的函数就可以。

![表格](images/1590646772(1).png)

如果不需要其中的一些方法，在user.js中不创建方法就可以，在router中也不会注册路由。