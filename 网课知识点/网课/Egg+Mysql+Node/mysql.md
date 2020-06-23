### 数据库基本命令：

1. 在 MySQL 服务器以启动的情况下，连接数据库：

```shell
mysql> mysql -u root -p
enter password: 123456
```

2. 查看数据库 `show databases`

```shell
mysql> show databases;
```

3. 创建数据库 `create database db_ name`

```shell
mysql> create database test;
Query OK, 1 row affected (0.01 sec)
```

创建数据库是可以规定字符集 5`if not exists` 如果不存在就创建

```shell
mysql> create database if not exists test default charset utf8 collateutf8_ general_ ci
```

4. 删除数据库 `drop database db_name`

```shell
mysql> drop database test;
Query 0K,0 rows affected (0.03 sec)
```

5. 选择数据库 `use db_ name`

```she1l
mysq1> use mysql;
database changed
```

6. 显示数据库表(table) `show tables`

```shell
mysql> show tables;
+---------------------------+
|     Tables_ in_ mysq1     |
+---------------------------+
|db                         |
|user                       |
+---------------------------+
2 rows in set (0.01 sec)
```

7.  创建表 `create table table_name (key int,key2 chat...)`

```shell
mysql>  create table student (
    stu_ id int,
    stu_ name char(32),
    createTime datetime
      );
 Query OK, 0 rows affected (0.04 sec)
```

8. 删除表 `drop table table_ name`

```shell
mysql> drop table student;
Query OK, 0 rows affected (0.02 sec)
```

9. **向表中插入数据** `insert into table_ name (对应的键) values(对应键的值)`

```shell
mysql> insert into student (stu_ id, stu_ name, createTime)
    values
    (0, "张三"，Now());
```





10. **查看表中的数据** `select * from table_ name`

```shell
mysql> select * from student;
+--------+----------+------------+
| stu_id | stu_name | createTime |
+--------+----------+------------+
|      0 | 张三     | 2020-04-29 |
+--------+----------+------------+
1 row in set (0.00 sec)
```

可以查询指定键对应的内容 `select keyname, key1name from table_ name`

```shell
mysql> select stu_name from student;
+----------+
| stu_name |
+----------+
| 张三     |
| 李四     |
+----------+
2 rows in set (0.00 sec)
```

11. 更新数据 `update table_ name set (新的内容) where 条件`

```shell
 mysq1>  update student set stu_name="张大三" where id=0;
 Query OK, 1 row affected (e.e0 sec )
RowS matched: 1 Changed: 1 Warnings: 0
```

** 主键 **：`primary key`
含义: 非空且唯一 1. 一张表之能有一个字段为主键 2. 主键就是表中记录的唯一标识
** 自动增长 **：`auto_increment`

12. 删除数据 `delete from table_name where 条件`

```
mysql> delete from  user where brithday="2000-01-02";
```

13. **where 语句**
    以下是 SQL SELECT 语句使用 WHERE 子句从数据表中读取数据的通用语法:

```shell
SELECT field1, field2... .fieldN FROM table_ name1, table name2...[WHERE condition1 [AND [OR]] condition2.....
```

- 查询语句中你可以使用一个或者多个表，表之间使用逗号，分割，并使用 WHERE 语句来设定查询条件。
- 可以在 WHERE 子句中指定任何条件。 > != = >= <= <>
- 可以使用 AND(逻辑与)或者 OR(逻辑或)指定一个或多个条件。
- WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
- WHERE 子句类似于程序语言中的 if 条件.根据 MySQL 表中的字段值来读取指定的数据。

14. **排序** `order by`

15. **alter 命令**

alter 更改
当我们需要修改数据表名或者修改数据表字段时，就需要使用到 alter 命令

- 将数据库修改为 UTF8 `alter database数据库库名 character set utf8`
- 给数据库中的表增加字段 `alter table 表名 add 字段名 字段类型`
- 修改字段名称 `alter table <表名> change <字段名> <字段新名称> <字段的类型>` 更改时注意数据类型，也要设置，不然会报错
- 删除字段 `alter table 表名 drop 字段名`
- modify 与 change 的区别
  - change 后面要跟两个字段名(旧的字段名,新的字段名)可以更改字段名
  - modify 后面只跟一个字段名, 更改的是字段的信息,不可以更改字段名

16. 查看数据表有哪些字段 `desc tb_name`

```shell
mysql> desc user;
+---------+----------+------+-----+---------
| Field   | Type     | Null | Key | Default | Extra |
+---------+----------+------+-----+---------+-------+
| user_id | int      | YES  |     | NULL    |       |
| name    | char(32) | YES  |     | NULL    |       |
| tel     | int      | YES  | UNI | NULL    |       |
+---------+----------+------+-----+---------
3 rows in set (0.00 sec)
```

`show create table tb_name`

```shell
mysql>show create table user;
+-------
| user  | CREATE TABLE `user` (
  `user_id` int DEFAULT NULL,
  `name` char(32) DEFAULT NULL,
  `brithday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+-------
1 row in set (0.01 sec)
```

17. 注释 comment

```shell
create table 'user' (
  'name' char(32) default null comment '姓名'
)
```

- 查看数据表中字段注释 `show full columns from 表名`

- 给已经存在的字段添加注释 `alter table 表名 modify tb_字段 数据类型 comment "注释内容"`

```shell
mysql> alter table user modify brithday date comment "生日";
# 删除注释 可以通过更新字段的形式来实现
mysql> alter table user modify brithday date;
```

18. 设置唯一值 `unique`

```shell
# 将数据表 user 中 tel 字段 设置成唯一值
mysql> alter table user modify tel char (12) unique
# 如果添加的数据已经存在,在数据库中会报错,不能添加
mysql> update user set tel=131 where user_id=4;
ERROR 1062 (23000): Duplicate entry '131' for key 'user.tel'
```

19. 视图 view 视图不是真实存在的 是虚拟的表

- `create view 视图名 as 查询语句`

```shell
mysql> create view user_v as select name,tel from user;
```

- 查询视图 `select * from 视图名`
- 更改视图 ``alter view 视图名称 as 查询语句`
- 删除视图 `drop view 视图名称`
- 查看数据库中所有视图 `show table status where comment="view";`

20. 多表联查
    1. 内连接
    - `select * from 表1 inner join 表2 on 表1.字段=表2.字段` 这种方式查询的公共的记录:
    - `select * from 表1,表2 where 表1.字段=表2.字段`
    2. 外连接
    - 左外连接:会以连接中的左表为标准,查询左表中
21. 给查询结果的字段设置别名 as

- `select 字段1 as "姓名" , 字段2 as "年龄" from 表名`
- `select 表1.字段1 as "姓名" , 表1.字段2 as "年龄" from 表1`

22. 给表设置别名 `表名 别名` `表名 as 别名`

```js
  mysql>select a.t_id,t_name from teacher a;
  +------+------+
  | t_id +------|
  +------+------+
  | 01   | 张三 |
  | 02   | 李四 |
  +------+------+
  2 row in set (0.00sec)
```

23. 函数
1. 求和 sum (字段)
2. 求平均值 avg (字段)
3. 最大值 max()）
4. 最小值 min()
5. 计数量 count (字段)

24. 分组 group by 语句根据一个或多个列对结果进行分组
   语法:`select 字段 from 表 when 条件 group by 字段`
   或者
   `select 字段 from 表 where 条件 group by 字段 having`

25. 正则匹配 `条件 字段 regexp '^12|sdf$'`
   语法:`select * from student where name regexp 'ok$'`

26. 限制显示的条数 `limt count`

27. 条件 `case 字段 where 值1 then 新值1 ... else 值 end`
1. 当 case 后面跟字段的时候 where 后面写的内容是具体值, 不能做比较(不可以使用><>) (不能是范围值)
2. 当 case 后面不跟字段的时候 when 后面 可**以使用比较表达式** case 后面不能加字段
   语法 `case when 条件(范围) then 值 ... else 值 end`

28. 外键 forgien key
1. 创建表时添加外键 ``constraint fk_id (自定义的外键名称) foreign key (当前表的字段,表中必须存在这个字段) references 外表表名 (外表字段)``
```shell
  create table students (
    id int primary key auto_increment,
    name varchar(20),
    sex varchar(8),
    cid int,
    constraint fk_001 foregin key (cid) references class (id)
  );
```
2. 添加外键 ``alter table 表名 add contraint FK_ID foreign key(外键字名) ``
```shell
  alter table students add constraint stu_c_id foreign key (cid) references class (id)
```
3. 删除外键 ``alter table 表名 drop foreign key 外键名``
```shell
  alter table students drop foreignkey (cid);
```
4. 外键关联表联合删除 ``alter table 表名 add contrain KF_ID foreign key (外键字段名) references 外表表名 (主键字段名)``
``[on delete {casede | set null | no action| retrict}]``
````[on update {casede | set null | no action| retrict}]````
* restrict 是默认操作 表示拒绝删除或修改外键关联列 这是最安全的设置
* casede 表示删除包含与已删除键值有参考关系的所有记录
4. 创建表时添加外键``foreign key (当前表的字段) references 外表表名 (外表字段)``
```shell
create table students (
id int primary key auto_increment,
name varchar(20),
sex varchar (8),
cid int,
 foreign key (cid) references class (id)
);
```
29. 其他 关于更多sql语句 菜鸟教程 


30. 存储引擎
    * 显示存储引擎  ``show engines``;
    * 显示数据表的存储引擎 ``show create table 表名``
    * 不同的存储引擎有各自的作用
     * INNODB 支持事务 修改较多时
     * MYISAM 节省存储空间 查询较多
     * MEMORY 数据存储在内存中 不是永久保存的数据可以使用这种引擎
````shell
mysql>create table test_engine (
  id int primary key auto_increment unique ,  -- primary key 主键  auto_increment 自动增长 unique 唯一性
) engine = innodb default chaeset=utf8  -- engine =innodb 设置引擎  默认也是innodb
````

31. 事务 transaction 
    事务主要用于处理操作量大 复杂度高的数据
    1. 在mysql中只有innodb数据库引擎支持事务
    2. 事务处理可以维护数据的完整性 保证成批的sql语句 要么全部执行 要么全部不执行
    3. 管理 insert、update、delete、语句

  事物的特性:
    1. 原子性 事物的最小单位 不可分割 要么全部执行 要么全部不执行
    2. 一致性 要求全部成功 或者全部失败
    3. 隔离性 事务A和事务B 之间有隔离性
    4. 持久性 事务处理结束之后 对数据的修改是永久的 系统故障数据也不会丢失
  
  处理事务的语句:
    1. 开启事务 start transaction
    2. 结束事务 end transaction
    3. 提交事务 commit transaction    **重点**
    4. 回滚事务 rollback transaction  **重点**


32. 索引
      可以提高数据检索的速度 相当于目录
      - 创建索引
        - create index 索引名称 on 表名(列名/字段)
      - 添加索引
        - alter table 表名 add index 索引名称(字段名)
      - 创建表时直接指定索引
      ````shell
        create table mytable (
          id int,
          name varchar(16),
          index id_index(id)     -- 指定索引是id
        );
      ````
      - 删除索引
        - ``drop index 索引名称 on 表名``
      - 查看索引信息
        - ``show index from 表名``

**create index 与 alter table 区别**
  1. CREATE INDEX必须提供索引名,对于ALTER　TABLE,将会自动创建 如果你不创建 ``alter table 表名 add index (字段名)``
  2. CREATE INDEX 一个语句一次只能建立一个索引 ALTER TABLE 可以在一个语句建立多个 如:
    ``ALTER TABLE HeadOFState ADD PRIMARY KEY (ID), ADD INDEX (LastName,FirstName);``
  3. 只有ALTER TABLe才能创建主键



## 总结:

## sql语句分类

1. DQL (date definition language): 数据定义语言,主要是定义表、视图、索引
  - ``create table 表名 (列名 数据类型)``
  - ``create view 视图名称 as select * from``
  - ``create index 索引名称 on 表名(列名)`` 
  - ``alter table/database ...``

2. DQL (data query language): 数据查询语言,对数据库的查询
  - select *, count(),sum(id),... from tablename where
    - from 表名
    - where 子句 筛选条件
    - group by 将数据分组
    - 使用mysql 中的函数 sum() destinct 字段 去除重复
    - having 筛选的是分组后的数据
    - order by 排序 asc 升序默认、desc降序 
    - limit 
    - 其他

3. DML (data Manipulation language):数据操作语言 主要对数据库可插入、删除、更新
    - ``insert into 表名 (字段/列名) values (数据),(数据);``
    - ``delete from 表名 where ...`` 不加条件会将整个表格的数据删除
    - ``update 表名 set 字段=新的值 where 条件``

4. DCL (data control language):数据控制语言设置用户的访问权限和安全级别
    - grant
    - revoke


## 多表联查
  - 内连接 inner join 可以简写成 join
    * 如果是两个表连接时 可以理解成两个表共同包含的内容
      ``select * from tableA inner join tableB on tableA.id=tableB.id;``
  - 外连接
    - 左外连接 left join  以左面表的数据为基础去查询数据 如果左表的某一条在右表中没有对应的数据 对应的值为null
       ``select * from tableA left join tableB on tableA.id=tableB.id;``
    - 右外连接 right join 以右表中的数据为基础去查询数据 如果右表的某一条在左表中没有对应的数据 则对应值为null
     ``select * from tableA  right join tableB on tableA.id=tableB.id;``



## 设置权限

1. 创建用户: create user 'username'@'host' identified by "password";
  - username 是创建的用户名
  - host 指定主机 本机是localhost
  - password 自己设置的密码
2. 添加权限 grant all privileges on *.* to 'username'@"host" with grant option;
  - all privileges 所有权限
  - *.* 库.表      制定用户对哪个库、表的权限  *.* 所有的库和表
  'username'@"host" 是用户名 host 是主机
  - with grant option 等同于之前的   identified by "password";
3. 刷新权限 flush privileges; 添加好权限后一定要更新


## 更改加密方式
1. ALTER USER 'root'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
2. mysql8+版本 mysql_native_password 加密方式 其他软件可以通过密码去访问: 
  - ``alter user "username"@"host" identified with mysql_native_password by "123456"``
  - 更改用户的密码 密码的加密方式 mysql_native_password 8版本之前的加密方式
