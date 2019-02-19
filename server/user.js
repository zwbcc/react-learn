const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list',(req,res)=>{
  // User.remove({},(e,d)=>{})
  User.find({},(err,doc)=>{
    return res.json(doc)
  })
})

Router.post('/login',(req,res)=>{
  const {user,pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},(err,doc)=>{
    if(err){
      return res.json({code:1,msg:'出错'})
    }
    if(!doc){
      return res.json({code:1,msg:'用户名或密码不存在'})
    }
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
  })
})


Router.post('/register',(req,res)=>{
  console.log(req.body)
  const {user,pwd,type} = req.body
  User.findOne({user:user},(err,doc)=>{
    if(doc){
      return res.json({code:1,msg:'用户重复'})
    }
    const UserModel = new User({user,type,pwd:md5Pwd(pwd)})
    UserModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:'出错'})
      }
      const {user,type,_id} = d
      res.cookie('userid',_id)
      return res.json({code:0,data:{user,type,_id}})
    })
    User.create({user,type,pwd:md5Pwd(pwd)},(e,d)=>{
      if(e){
        return res.json({code:1,msg:'出错'})
      }
      return res.json({code:0})
    })
  })
})
Router.get('/info',(req,res)=>{
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},(err,doc)=>{
    if(err){
      return res.json({code:1,msg:'出错'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
 
})

function md5Pwd(pwd){
  const salt = 'react_learn_sd12bh4qet@agASwq'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router