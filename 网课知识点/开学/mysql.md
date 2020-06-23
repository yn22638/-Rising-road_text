# mysql安装
1. 去官网下载mysql安装包，下载的是zip文件
2. 解压到D盘的根目录下 mysql
3. 使用cmd，接着使用管理员权限，进入D盘/mysql/bin里面的bin文件
4. 初始化数据库：mysqld --initalize

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

# mysql命令
1. 创建数据库
``> create database 数据库名称`` 
2. 
3. 切换到指定的库中
``> use  数据库名称``
``Database changed``
4. 查看数据库中有哪些数据表
``> show 表名``
5. 删除数据库
``> drop database 数据库名称``
6. 创建数据表
``> create table 表名 (id(字段名称) int(数据类型),name varchar(8))``
7. 删除数据表
``> drop table 表名称``
8. CRUD操作(增删改查)
```> 插入数据 insert into 表名 (字段类型，字段类型) values (数据1，数据1),(数据2，数据2)
   > 查询所有数据 select * from 表名
   > 指定查询结果 select id,name from 表名（只查询id与name） 
```
9. 


```text
int 数据类型
not null 不能为空
auto_increment 自动增长
commen 注释
default 默认值
primary key 主键
```
创建表
CREATE TABLE `Escore` (
    `sid` int NOT AUTO INCREMENT
    CONSTRAINT `f_eid` FOREiNG KEY (`Eid`) REFERENCES `EmployeeInfo` (`Eid`)
);
定义外键名为f_id,当前表的Eid这列，是外键列,外键对应的是EmployeeInfo表中Eid列


``
order by 排序 
    desc 降序
    asc  升序
    
 group by 分组
 group by 分组信息  having 分组条件
 limit  显示指定条数，limit 3;就是获取三条数据
 
 sum()求和
 max()最大值
 min()最小值
 avg()平均值
 
 --列名 n 别名 n
 from 表名
 where 列名 2>10
 and/or
 列名3 like "李%"
 列名 between --并且 列明4的值 在xx1与xx2之间
 XXX1
 and
 XXx2
 group by  --按照列明2分组
 列名2 
 having     --分组后列2综合大于10的数据
 sum(列)>10
 order by  --排序  desc降序  asc升序
 列名
 desc 降序  
 limit 3 显示3条数据    --后面一个值是显示条数，俩个值是显示俩个值之间数据
 limit 3,5  显示3-5之间】
``