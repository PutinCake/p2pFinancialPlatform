var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5');
const UserModel = require('../db/models').UserModel;
const filter = {password: 0} // 查询时过滤出指定的属性

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//注册路由：用户注册
router.post('/register', function(req,res) {
  //读取请求参数数据
  const {username, password, type} = req.body;
  //处理 查询 根据username
  UserModel.findOne({username}, function(err,user){
      if(user){
        res.send({code:1, msg:'此用户已存在'})
      } else {
        //保存
        new UserModel({username, password:md5(password), type}).save(function(err,user){
          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7}) // 持久化cookie, 浏览器会保存在本地文件
// 3.2. 保
          //返回包含user的jason数据
          res.send({code:0, data:{_id:user._id, username, type}})
        })
      }
 })
  //返回响应数据
});

router.post('/login', function(req, res) {
  const {username, password} = req.body
  //根据username和password查询users,如果没有，返回提示错误信息，如果有，返回
    UserModel.findOne({username, password: md5(password)}, filter, function (err, user)
  {
  // 3. 返回响应数据
  // 3.1. 如果user 没有值, 返回一个错误的提示: 用户名或密码错误
  if(!user) {
  res.send({code: 1, msg: '用户名或密码错误'})
  } else {
  // 生成一个cookie(userid: user._id), 并交给浏览器保存
  res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
  // 3.2. 如果user 有值, 返回user
  res.send({code: 0, data: user}) // user 中没有pwd
  }
  })
})
//更新用户信息的路由
router.post('/update', function(req, res){
  //从请求的cookie中得到userid
  const userid = req.cookies.userid;
  //如果不存在，直接返回一个提示信息
  if(!userid) {
    return res.send({code:1, msg:'请先登录'})
  } 
  //存在，根据userid更新对应的user文档数据
  //得到提交的用户数据
  const user = req.body
  UserModel.findByIdAndUpdate({_id:userid}, user, function(error, oldUser){
    if(!oldUser){
      //通知浏览器删除userid cookie
      res.clearCookie('userid')
      res.send({code:1, msg:'请先登录'})
    }else{
      //准备一个返回的user数据对象
      const {_id, username, type} = oldUser;
      const data = Object.assign(user, {_id, username, type});
      //返回
      res.send({code:0, data})
    }
  })
})

module.exports = router;
