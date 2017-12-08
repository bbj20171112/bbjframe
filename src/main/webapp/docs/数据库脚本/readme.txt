

--------------------  准备工作  -----------------------------
-- 创建数据库
create database bbj; -- Create the new database
-- 创建用户
CREATE USER bbj@'%' IDENTIFIED BY 'bbjhehaif4'; -- Creates the user
-- 将数据库权限给bbj用户
GRANT ALL ON bbj.* TO 'bbj'@'localhost'; -- Gives all the privileges to the new user on the newly created database
FLUSH  PRIVILEGES ; -- 立即启用修改
	
-- 创建表(base_demo)
use bbj;
create table base_demo(
	id integer,
	attr1 varchar(64), 
	attr2 varchar(64), 
	attr3 varchar(64),
	create_time datetime,
	delete_state int,
	update_time datetime
);
INSERT INTO base_demo (id,attr1,attr2,attr3,create_time,delete_state,update_time) 
VALUES (1,'val1','val1','val1',now(),0,now());
create table base_demo2(
	id integer,
	attr3 varchar(64), 
	attr4 varchar(64), 
	attr5 varchar(64),
	create_time datetime,
	delete_state int,
	update_time datetime 
);
INSERT INTO base_demo2 (id,attr3,attr4,attr5,create_time,delete_state,update_time) 
VALUES (3,'val5','val5','val5',now(),0,now());

--------------------  准备工作  -----------------------------

实现基本对象的根据主键查找操作





