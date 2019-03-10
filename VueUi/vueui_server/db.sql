#xz_news[id/title/ctime/img_url/point/content]
SET NAMES UTF8;
DROP DATABASE IF EXISTS zx_tg;
CREATE DATABASE zx_tg CHARSET=UTF8;
USE zx_tg;
CREATE TABLE xz_news(
   id  INT PRIMARY KEY AUTO_INCREMENT,
   title  VARCHAR(255),
   ctime  DATETIME,
   img_url VARCHAR(255),
   point   INT,
   content VARCHAR(2000)
);
INSERT INTO xz_news VALUES(null,'1231',now(),
'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1232',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1233',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1234',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1235',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1236',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1237',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'1238',now(),
  'http://127.0.0.1:3000/1.png',0,'1239');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12310');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12311');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12312');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12313');
  INSERT INTO xz_news VALUES(null,'12314',now(),
  'http://127.0.0.1:3000/1.png',0,'12314');
  INSERT INTO xz_news VALUES(null,'12315',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'12316',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'12317',now(),
  'http://127.0.0.1:3000/1.png',0,'123');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12318');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12319');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12320');
  INSERT INTO xz_news VALUES(null,'123',now(),
  'http://127.0.0.1:3000/1.png',0,'12321');
  INSERT INTO xz_news VALUES(null,'12322',now(),
  'http://127.0.0.1:3000/1.png',0,'123');




#创建表 xz_comment 评论表
CREATE TABLE xz_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(2000),
  ctime DATETIME,
  nid   INT
);
INSERT INTO xz_comment VALUES(null,'1',now(),1);
  INSERT INTO xz_comment VALUES(null,'2',now(),1);
  INSERT INTO xz_comment VALUES(null,'3',now(),1);
  INSERT INTO xz_comment VALUES(null,'4',now(),1);
  INSERT INTO xz_comment VALUES(null,'5',now(),1);
  INSERT INTO xz_comment VALUES(null,'6',now(),1);
  INSERT INTO xz_comment VALUES(null,'7',now(),1);
  INSERT INTO xz_comment VALUES(null,'8',now(),1);
  INSERT INTO xz_comment VALUES(null,'9',now(),1);
  INSERT INTO xz_comment VALUES(null,'10',now(),1);
  INSERT INTO xz_comment VALUES(null,'11',now(),1);
  INSERT INTO xz_comment VALUES(null,'12',now(),1);
  INSERT INTO xz_comment VALUES(null,'13',now(),1);
  INSERT INTO xz_comment VALUES(null,'14',now(),1);
  INSERT INTO xz_comment VALUES(null,'15',now(),1);
  INSERT INTO xz_comment VALUES(null,'16',now(),1);
  INSERT INTO xz_comment VALUES(null,'17',now(),1);
  INSERT INTO xz_comment VALUES(null,'18',now(),1);
  INSERT INTO xz_comment VALUES(null,'19',now(),1);
  INSERT INTO xz_comment VALUES(null,'20',now(),1);
  INSERT INTO xz_comment VALUES(null,'21',now(),1);
  INSERT INTO xz_comment VALUES(null,'22',now(),1);


#创建商品表
#xz_product
#id       INT
#name     VARCHAR(255)
#img_url  VARCHAR(255)
#price(原价格)    DECIMAL(10,2) 
#bank(库存)     INT

CREATE TABLE xz_product(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  img_url VARCHAR(255),
  price DECIMAL(10,2),#或者使用整型数据保存
  bank  INT
);
INSERT INTO xz_product VALUES(1,'小米笔记本','http://127.0.0.1:3000/img/banner1.png',10.50,999);
  INSERT INTO xz_product VALUES(2,'华为笔记本','http://127.0.0.1:3000/img/banner1.png',13.50,999);
  INSERT INTO xz_product VALUES(3,'苹果笔记本','http://127.0.0.1:3000/img/banner1.png',12.50,999);
  INSERT INTO xz_product VALUES(4,'联想笔记本','http://127.0.0.1:3000/img/banner1.png',11.50,999);
# xz-card
  # id:购物车编号
  # count 数量
  # price 销售价--可能是优惠之后的价格
  # pid 商品编号
  # name商品名称
  # uid 用户编号
  # SELECT id,count,price,name,uid FROM xz-card WHERE uid=?
CREATE TABLE xz_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT,
  price DECIMAL(10,2),
  count INT
);
INSERT INTO xz_cart VALUES (null,1,1,10.00,1);
INSERT INTO xz_cart VALUES (null,1,2,12.00,1);


#用户登录表
CREATE TABLE xz_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25),
  pwd VARCHAR(32)
);
INSERT INTO xz_login VALUES(null,"tom",md5("123456"));
INSERT INTO xz_login VALUES(null,"jerry",md5("123456"));
#浪琴项目 详情页轮播图:优雅之选
#材质
# DIAL
#表带
CREATE TABLE Longin_slider (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  imgUrlSlider VARCHAR(255),
  material VARCHAR(25),
  dial_slider VARCHAR(25),
  strap VARCHAR(25)
);
INSERT INTO Longin_slider  VALUES(null,4,"http://127.0.0.1:2009/img/slider/1.jpg","精钢和黄色PVD涂层","白色哑光","皮表带");
  INSERT INTO Longin_slider  VALUES(null,4,"http://127.0.0.1:2009/img/slider/2.jpg","精钢","白色哑光","精钢");
  INSERT INTO Longin_slider  VALUES(null,4,"http://127.0.0.1:2009/img/slider/3.jpg","精钢和黄色PVD涂层","金色","精钢和黄色PVD涂层");
  INSERT INTO Longin_slider  VALUES(null,4,"http://127.0.0.1:2009/img/slider/4.jpg","精钢和黄色PVD涂层","白色哑光","精钢和黄色PVD涂层");
  INSERT INTO Longin_slider  VALUES(null,3,"http://127.0.0.1:2009/img/slider/5.jpg","精钢","银色太阳饰纹","皮表带");
  INSERT INTO Longin_slider  VALUES(null,3,"http://127.0.0.1:2009/img/slider/6.jpg","精钢",'银色"flinqué"饰纹',"精钢");
  INSERT INTO Longin_slider  VALUES(null,3,"http://127.0.0.1:2009/img/slider/7.jpg","精钢","黑色漆面抛光","皮表带");
  INSERT INTO Longin_slider  VALUES(null,3,"http://127.0.0.1:2009/img/slider/8.jpg","精钢","白色珍珠母贝","皮表带");
#浪琴项目  创建商品系列表 Longin_goodSeris
CREATE TABLE Longin_goodSeris (
  pid INT PRIMARY KEY AUTO_INCREMENT,
  imgUrlItem VARCHAR(255)
);
INSERT INTO Longin_goodSeris VALUES(null,"http://127.0.0.1:2009/img/goods/0_1.jpg");
INSERT INTO Longin_goodSeris VALUES(null,"http://127.0.0.1:2009/img/goods/0_2.jpg");
#浪琴项目  创建商品表 Longin_goodList
CREATE TABLE Longin_goodList (
  id INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    series VARCHAR(25),
    style VARCHAR(255),
    spec VARCHAR(25),
    price DECIMAL(10,2),
    simg_url VARCHAR(255),
    bank INT,
    bimg_url VARCHAR(255),
    D DECIMAL(4,2),
    material_case VARCHAR(25),
    material_strap VARCHAR(25),
    pointer VARCHAR(25),
    dial VARCHAR(25),
    color VARCHAR(25),
    type_num VARCHAR(25),
    type_desc VARCHAR(25),
    shock VARCHAR(255)
);
INSERT INTO Longin_goodList VALUES(null,1,"康卡斯潜水系列","自动机械男士腕表","L3.783.4.96.6",19100,"http://127.0.0.1:2009/img/goods/1.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_1.png",25.5,"精钢","精钢","镀银抛光指针","钻石时标","蓝色太阳饰纹","L595/592","自动上链机械机芯","自动上链机械机芯，每小时振动28,800次，提供40小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,1,"浪琴表名匠系列","自动机械男士腕表","L2.793.4.92.6",16000,"http://127.0.0.1:2009/img/goods/2.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_2.png",25.5,"精钢","精钢","镀银抛光指针","钻石时标","蓝色太阳饰纹","L595/592","自动上链机械机芯","自动上链机械机芯，每小时振动28,800次，提供40小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,1,"浪琴表博雅系列","自动机械男士腕表","L4.810.4.12.6",13500,"http://127.0.0.1:2009/img/goods/3.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_3.png",37,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,1,"浪琴表黛绰维纳系列","石英女士腕表","L5.255.4.71.5",10000,"http://127.0.0.1:2009/img/goods/4.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_4.png",38,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,2,"时尚系列","自动机械男士腕表","L4.921.4.11.2",9200,"http://127.0.0.1:2009/img/goods/5.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_5.png",37.5,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,2,"浪琴表嘉岚系列","自动机械男士腕表","L4.908.2.11.2",12600,"http://127.0.0.1:2009/img/goods/6.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_6.png",36.5,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,2,"浪琴表嘉岚系列","石英女士腕表","L4.209.4.11.6",8300,"http://127.0.0.1:2009/img/goods/7.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_7.png",38.5,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");
  INSERT INTO Longin_goodList VALUES(null,2,"浪琴表律雅系列","石英女士腕表","L4.259.4.72.6",7100,"http://127.0.0.1:2009/img/goods/8.jpg",0,"http://127.0.0.1:2009/img/goods/list_big_8.png",36.5,"精钢","精钢","黑色指针","镶嵌时标","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存。");

INSERT INTO Longin_goodList VALUES(null,4,"时尚系列","自动机械男士腕表","L4.921.2.11.2",9600,"",0,"http://127.0.0.1:2009/img/slider/big_5.png",38.5,"精钢和黄色PVD涂层","皮表带","黑色指针","漆绘罗马数字","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动25,200次，提供64小时动力储存");
  INSERT INTO Longin_goodList VALUES(null,4,"时尚系列","自动机械男士腕表","L4.921.2.11.3",11600,"",0,"http://127.0.0.1:2009/img/slider/big_6.png",39.5,"精钢","精钢","银色指针","漆绘罗马数字","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动35,200次，提供64小时动力储存");
  INSERT INTO Longin_goodList VALUES(null,4,"时尚系列","自动机械男士腕表","L4.921.2.11.4",12300,"",0,"http://127.0.0.1:2009/img/slider/big_7.png",37.5,"精钢","精钢","金黄色指针","漆绘罗马数字","金色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动30,200次，提供64小时动力储存");
  INSERT INTO Longin_goodList VALUES(null,4,"时尚系列","自动机械男士腕表","L4.921.2.11.5",13300,"",0,"http://127.0.0.1:2009/img/slider/big_8.png",40.5,"精钢","精钢","黄色指针","漆绘罗马数字","白色哑光","L619/888","自动上链机械机芯","自动上链机械机芯，每小时振动26,200次，提供64小时动力储存");
  INSERT INTO Longin_goodList VALUES(null,3,"马术系列","石英女士腕表","L6.130.4.87.2",10800,"",0,"http://127.0.0.1:2009/img/slider/big_1.png",26.5,"精钢和黄色PVD涂层","皮表带","蓝钢指针","钻石时标","白色珍珠母贝","L152","石英机芯","");
  INSERT INTO Longin_goodList VALUES(null,3,"马术系列","石英女士腕表","L6.130.4.87.3",10900,"",0,"http://127.0.0.1:2009/img/slider/big_2.png",27.5,"精钢","精钢","蓝钢指针","钻石时标","珍珠母贝","L153","石英机芯","");
  INSERT INTO Longin_goodList VALUES(null,3,"马术系列","石英女士腕表","L6.130.4.87.4",13000,"",0,"http://127.0.0.1:2009/img/slider/big_3.png",28.5,"精钢和黄色PVD涂层","皮表带","蓝钢指针","钻石","白色珍珠母贝","L154","石英机芯","");
  INSERT INTO Longin_goodList VALUES(null,3,"马术系列","石英女士腕表","L6.130.4.87.5",10000,"",0,"http://127.0.0.1:2009/img/slider/big_4.png",27.5,"精钢","皮表带","蓝钢指针","钻石时标","珍珠母贝","L155","石英机芯","");





#浪琴项目 创建购物车表
CREATE TABLE Longin_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  goodId INT,
  count INT,
  price DECIMAL(10,2),
  size DECIMAL(3,1)
);
INSERT INTO longin_cart VALUES(null,1,2,1,16000,17.5);
INSERT INTO longin_cart VALUES(null,1,3,5,16000,17);








