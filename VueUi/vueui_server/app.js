const express=require("express");
const pool = require("./pool.js");
//安装npm run express-session模块
//express-session 模块加载，创建session对象
const session = require("express-session");
// const bodyParser = require('body-parser');
//cors模块下载命令 npm i cors
//加载cors模块
const cors=require("cors");
var app=express();
app.listen(2009);
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"))
//请求图片地址http://127.0.0.1:2009/img/banner1.png

// 7.2 对express-session模块进行配置<----开启session后,发请求时为req 自动添加session属性
// 为session赋值时：req.session.id="值";
// 获取session值 req.session.id="";
app.use(session({
  secret:"128位随机字符",//sessionid+secret=随机签名
  resave:false,//每次请求后是否重新存储session数据
  saveUninitialized:true,//第一次初始化的session对象是否保存
  cookie:{//设置客户端保存session id有效时间为一天
    maxAge:1000 * 60 * 60 * 24
  }
}));
//跨域访问配置
app.use(cors({
    origin:[//允许跨域访问程序列表
       "http://127.0.0.1:8081","http://localhost:8081",
       "http://127.0.0.1:8080","http://localhost:8080",
    ],//允许此地址(客户端发起请求的网页宿主)访问服务器
    credentials:true//经过验证允许客户端保存session值
}))
 
// 浪琴项目 用户的注册
app.get("/register",(req,res)=>{
  // 1 参数 name pwd 
    var name= req.query.name;
    var pwd = req.query.pwd;
  // 1.1：验证
  var reg = /^[a-z0-9_]{3,12}$/;//8-12 位
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"})
    return;
  }
  // 2 sql INSERT INTO Longin_login VALUES(null,?,md5(?)) 
  var sql ="INSERT INTO `Longin_login`(`id`, `name`, `pwd`) VALUES (null,?,md5(?))"
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"})
    }else{
      res.send({code:-1,msg:"注册失败"})
    }
  })
  
  // 3 json 
})
// 浪琴项目 用户登录
app.get("/login",(req,res)=>{
  // 1获取参数
 var name= req.query.name;  
 var pwd= req.query.pwd;  
  // 2 正则
  // 3 创建sql
  var sql = " SELECT count(id) as c,id FROM Longin_login WHERE name = ? AND pwd = md5(?)" 
  // 4 如果参数匹配成功 将用户id 保存在session对象
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    var c = result[0].c;
    if( c == 1 ){
      req.session["uname"] = name;
      req.session.uid = result[0].id;
      res.send({code:1,msg:"欢迎回来",uname:req.session["uname"]});
      // console.log("session['uname']:"+req.session["uname"]);
    }else{
      res.send({code:-1,msg:"用户名或者密码错误"})
    }
  })
  // 5 返回结果
    // {code:1,msg:"登录成功"}
    // {code：-1，msg:"用户名密码错误"}
})
//浪琴项目 验证用户名是否已存在
app.get("/existName",(req,res)=>{
  // 1 参数 
  var name=req.query.name;
  // 2 sql
  var sql="SELECT COUNT(id) as c FROM Longin_login WHERE name=?";//对name=tom的id进行计数
  // 3 json
  pool.query(sql,[name],(err,result)=>{
    // console.log(result);
    if(err) throw err;
    if(result[0].c >0){
      //[ RowDataPacket { c: 1 } ]
      res.send({code:-1,msg:"用户名已经存在"})
    }else{
      res.send({code:1,msg:"可以注册"});
    }
  })
})
// 浪琴项目 用户退出
app.get("/logout",(req,res)=>{
  req.session.uid=null;
  // console.log("session.uid:"+req.session.uid);
  res.send({code:1,msg:"退出成功"});
})
// 浪琴项目 置空用户uid
app.get('/empty',(req,res)=>{
  req.session.uid=null;
  res.send({code:1,msg:'置空uid成功'})
})
//浪琴项目 首页轮播
app.get("/getImages",(req,res)=>{
    var rows = [
        {id:1,img_url:"http://localhost:2009/img/car_1.jpg"},
        {id:2,img_url:"http://localhost:2009/img/car_3.jpg"},
        {id:3,img_url:"http://localhost:2009/img/car_4.jpg"},
        {id:4,img_url:"http://localhost:2009/img/car_5.jpg"}
    ];
    res.send(rows);
    //测试地址http://127.0.0.1:2009/getImages、
    //http://localhost:2009/img/banner1.png 如果成功80%服务器没问题
})
// 浪琴项目 详情页轮播图信息
app.get("/DetailSliser",(req,res)=>{
  var pid3 = req.query.pid3;
  var pid4 = req.query.pid4
  var progress = 0;
  var obj ={code:1};
  var sql_s = " SELECT s.id,s.pid,s.imgUrlSlider,s.material,s.dial_slider,s.strap FROM  Longin_slider s WHERE s.pid = ? OR s.pid = ? ";
  var sql_g = " SELECT  g.series, g.style, g.spec, g.price, g.simg_url, g.bank, g.bimg_url, g.D, g.material_case, g.material_strap, g.pointer, g.dial, g.color, g.type_num, g.type_desc, g.shock FROM Longin_goodList g WHERE g.pid = ? OR g.pid = ? ";
  pool.query(sql_s,[pid3,pid4],(err,result1)=>{
    if(err)  throw err;
    obj.data_s = result1;
    progress +=50;
    if(progress ==100){
      res.send(obj);
    }
  });
  pool.query(sql_g,[pid3,pid4],(err,result2)=>{
    if(err) throw err;
    obj.data_g = result2;
    progress +=50;
    if(progress ==100){
      res.send(obj);
    }
  })
})
// 浪琴项目 获取规格大图片
app.get("/goodSeris",(req,res)=>{
  var sql = "SELECT pid,imgUrlItem FROM Longin_goodSeris";
  pool.query(sql,(err,result)=>{
    if(err)  throw err;
    var obj ={} ;
    obj.data = result;
    res.send(obj);
  })
})
// 浪琴项目  查询所有规格腕表信息
app.get("/getDataUl",(req,res)=>{
  var obj = {};
  var data = [];
  var pid = 1 ;
  var sql = "SELECT `id`, `pid`, `series`, `style`, `spec`, `price`, `simg_url`, `bank`, `bimg_url`, `D`, `material_case`, `material_strap`, `pointer`, `dial`, `color`, `type_num`, `type_desc`, `shock` FROM `longin_goodlist` WHERE  pid = ?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    for(var i=0;i<result.length;i++){
      data.push(result[i]);
    }
    var pid = 2 ;
    var sql = "SELECT `id`, `pid`, `series`, `style`, `spec`, `price`, `simg_url`, `bank`, `bimg_url`, `D`, `material_case`, `material_strap`, `pointer`, `dial`, `color`, `type_num`, `type_desc`, `shock` FROM `longin_goodlist` WHERE  pid = ?";
    pool.query(sql,[pid],(err,result)=>{
      if(err) throw err;
      for(var i=0;i<result.length;i++){
        data.push(result[i]);
      }
      obj.data = data;
      res.send(obj);    
    })
  })
})
// 浪琴项目 查询购物车商品列表信息
app.get("/getCartList",(req,res)=>{
  // 1 获取参数 uid
  var uid=req.session.uid; 
  // console.log("|"+uid+"|")
  if(uid != undefined){
    // 2 sql
    var sql = " SELECT g.series,g.spec,g.simg_url,c.id,c.goodId,c.price,c.count,c.size FROM Longin_goodList g,longin_cart c WHERE c.goodId = g.id  AND c.uid = ? "
    //  购物车c里的商品编号pid===商品表p里的商品编号id
    pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      res.send({code:1,data:result})
    })
  }else{
    res.send({code:-1,msg1:"用户未登录!",msg2:"3s 之后跳转到登录页"});
  }
})
// 浪琴项目 同步购物车中商品数量
app.get("/updateCart",(req,res)=>{
  var id = parseInt( req.query.id);
  var count = parseInt(req.query.count);
  var  sql="UPDATE longin_cart SET count = ? WHERE id = ?";
  pool.query(sql,[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows >0 ){
      res.send({code:1,msg:"商品数量更新成功"});
    }else{
      res.send({code:-1,msg:"商品数量更新失败"});
    }
  })
})
// 浪琴项目 删除购物车中的商品
app.get("/deleteCartItem",(req,res)=>{
  var id = parseInt(req.query.id);
  var sql = "DELETE FROM Longin_cart WHERE id= ? ";
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"商品被删除"})
    }
  })
})
// 浪琴项目 更新购物车等页面公用数据
app.get("/updataPublicData",(req,res)=>{
  var uid = req.session.uid;
  if(uid != undefined){
    var sql = "SELECT  COUNT(id) as c FROM Longin_cart WHERE uid = ?";
    pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      // console.log(result[0].c);
      res.send({code:1,message:`${result[0].c}`})
    })
  }
})
//浪琴项目 将商品信息添加至购物车
app.get("/addCart",(req,res)=>{
  var uid = req.session.uid;
  if(uid == undefined){
    // console.log(uid);//undefiend
    // console.log(parseInt(uid));//NaN
    res.send({code:0,msg:"用户未登录，请先登录!"});
  }else{
    uid  = parseInt(uid);
    // console.log(uid);
    var goodId = req.query.goodId;
    var price = req.query.price;
    var count  = req.query.count;
    var size  = req.query.size;
    var sql = "INSERT INTO `longin_cart`(`id`, `uid`, `goodId`, `count`, `price`, `size`) VALUES ";
    sql += " (null,?,?,?,?,?) ";
    pool.query(sql,[uid,goodId,count,price,size],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows > 0 ){
        res.send({code:1,msg:"添加购物车成功"});
      }else{
        res.send({code:-1,msg:"添加购物车失败"});
      }
    })
  }
})
// 浪琴项目 查询商品详细信息
app.get("/getProduct",(req,res)=>{
  //1:参数 商品id
  var id = parseInt(req.query.id);
  var sql ="SELECT `id`, `pid`, `series`, `style`, `spec`, `price`, `simg_url`, `bank`, `bimg_url`, `D`, `material_case`, `material_strap`, `pointer`, `dial`, `color`, `type_num`, `type_desc`, `shock` FROM `longin_goodlist` WHERE id = ?";
  pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result[0]});
  });
  //3:json {code:1,data:{}}
});
// 浪琴项目  实现商品页面分页
app.get("/getMore",(req,res)=>{
  // pno 页码;pageSize 页大小
  var pid = req.query.pid;
  var pno_3 = req.query.pno_3;
  var pno_4 = req.query.pno_4;
  var ps  = req.query.pageSize;
  if(!pno_3){
    pno_3 = 1;
  }
  if(!pno_4){
    pno_4 = 1;
  }
  if(!ps){
   ps= 1;
  }
  // console.log(pno_3,pno_4,pid,ps);
  //2:验证正则表达式
  /*
    var reg = /^[1-5]$/;
    if(!reg.test(pno_3)){
      console.log("OKK");
        res.send({code:-1,msg:"我到底啦pno_1"});
        return;
    }else if(!reg.test(pno_4)){
      res.send({code:-1,msg:"我到底啦pno_2"});
      return;
    } 
  */
  // 查询商品系列为pid的全部商品的总页数
  var sql ="SELECT count(id) as c FROM  longin_goodlist WHERE pid = ? ";
  var obj ={code:1};
  progress = 0;
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    var pageCount =Math.ceil(result[0].c/ps);
    obj.pageCount  = pageCount;
    progress += 50;
    if(progress == 100){
      res.send(obj);
    }
  })
  //查询要实现加载更多商品系列为pid的商品的分页内容 
  var sql = "SELECT `id`, `pid`, `series`, `style`, `spec`, `price`, `simg_url`, `bank`, `bimg_url`, `D`, `material_case`, `material_strap`, `pointer`, `dial`, `color`, `type_num`, `type_desc`, `shock` FROM `longin_goodlist` WHERE  pid = ? LIMIT ? , ?";
  var pageIndex = pid ==3 ? parseInt( (pno_3-1)*ps) : parseInt((pno_4-1)*ps);//从第pageIndex 条往后查询
  ps = parseInt(ps);
  pool.query(sql,[pid,pageIndex,ps],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    obj.data = result;
    progress += 50;
    if(progress ==100){
      res.send(obj);
    } 
  })
})//浏览器测试数据地址 http://127.0.0.1:2009/getMore?pid=3&pno_3=1&pageSize=2


//功能二:新闻分页显示
app.get("/getNews",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[1-9]([0-9])*$/;//限制pno第一位数字不能为0
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
                  //C:count(id)
  var sql = "SELECT count(id) as c FROM xz_news";
  var progress = 0; //控制sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
      //  console.log(result);//[ RowDataPacket { c: 21 } ]
      //  console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);//{ c: 21 }
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
  var sql=" SELECT id,ctime,title,img_url,point";
      sql +=" FROM xz_news";
      sql +=" LIMIT ?,?"
  var offset = parseInt((pno-1)*pageSize);//从第offset条往后查询
  pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    // console.log(result);//[RowDataPacket{},RowDataPacket{},RowDataPacket{}...]
    obj.data = result;
    progress += 50;
    if(progress == 100){
      res.send(obj);//{"code":1,"pageCount":3,"data":[{},{},{}..]}
    }
  }); 
  // 
})
//功能三:依据新闻编号查询新闻详细信息
app.get("/getNewsInfo",(req,res)=>{
  //1:参数   id
  var id = req.query.id;
  //2:sql    SELECT id,title,ctime,content FROM 
  //         xz_news WHERE id = ?
  var sql=" SELECT id,title,ctime,content";
      sql+=" FROM xz_news WHERE id = ?";
  //3:json   {code:1,data:obj}
  pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result[0]});
  })
})
//功能四  发表评论
app.get("/addComment",(req,res)=>{
  // 1 参数 nid content
  var nid=req.query.nid;
  var content = req.query.content;
  // 2 INSERT INTO
  var sql="INSERT INTO xz_comment(id,content,ctime,nid)VALUES(null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    //影响行数
    if(result.affectedRows>0){
      res.send({code:1,msg:"评论发表成功"});
    }else{
      res.send({code:-1,msg:"评论发表失败"});
    }
  })
  // 3 json
})
//功能五 依据新闻编号(id)查询出指定新闻编号新闻评论列表
app.get("/getComments",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = parseInt(req.query.nid);
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[1-9]([0-9])*$/;//限制pno第一位数字不能为0
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
                  //C:count(id)
  var sql = "SELECT count(id) as c FROM xz_comment WHERE nid = ? ";
  var progress = 0; //控制sql执行进度
  obj = {code:1};
  pool.query(sql,[nid],(err,result)=>{
       if(err)throw err;
      //  console.log(result);//[ RowDataPacket { c: 21 } ]
      //  console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);//{ c: 21 }
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
  var sql=" SELECT id,ctime,content";
      sql +=" FROM xz_comment";
      sql +=" WHERE nid = ?"
      sql += " ORDER BY id DESC"//按照编号降序排列,以使发表的最新的评论显示在首行
      sql +=" LIMIT ?,?"
      
  var offset = parseInt((pno-1)*pageSize);//从第offset条往后查询
  pageSize = parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    // console.log(result);//[RowDataPacket{},RowDataPacket{},RowDataPacket{}...]
    obj.data = result;
    progress += 50;
    if(progress == 100){
      res.send(obj);//{"code":1,"pageCount":3,"data":[{},{},{}..]}
    }
  }); 
  // 浏览器测试数据地址 http://127.0.0.1:2009/getNews?pno=6&pageSize=3
})
//#功能六:商品列表//分页
app.get("/getGoodsList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var pid = 1;
  // console.log(pid);
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  // var reg = /^[1-9]?$/;//最多一次 可有可无
  // var reg = /^[1-9]{1,}$/;相当于/^[1-9]+$/ 至少一次 多则不限
  var reg = /^[1-9]([0-9])*$/;//限制pno第一位数字不能为0//可有可无 多则不限
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM Longin_goodList WHERE pid = ? ";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pid = parseInt(pid);
  pool.query(sql,[pid],(err,result)=>{
       if(err)throw err;
       console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
  var sql=" SELECT id,pid,series,style,spec,price,img_url,bank";
  sql +=" FROM Longin_goodList WHERE pid = ? ";
  sql +=" LIMIT ?,? ";
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
  pid = parseInt(pid);
  pool.query(sql,[pid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});








