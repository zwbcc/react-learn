import Axios from "axios";
import { getRedirectPath } from "../util"
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS ='LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo:'',
  isAuth:false,
  msg:'',
  user:'',
  pwd: '',
  type: ''
}

export function user(state=initState,action) {
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOGIN_SUCCESS:
      return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
      return {...state,...action.payload}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    default:
      return state
  }
}

function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}
function registerSuccess(data){
  return {type:REGISTER_SUCCESS,payload:data}
}

function loginSuccess(data){
  return {type:LOGIN_SUCCESS,payload:data}
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户名或密码错误')
  }
  return dispatch=> {
    Axios.post('/user/login',{user,pwd})
      .then(res=>{
        if(res.status == 200 && res.data.code ===0){
          dispatch(loginSuccess(res.data.data))
        }else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function loadData(userinfo){
  return {type:LOAD_DATA,payload:userinfo}
}

export function register({user,pwd,repwd,type}){
  if(!user||!pwd||!type){
    return errorMsg('填写信息')
  }
  if(pwd !== repwd){
    return errorMsg('密码不一致')
  }
  return dispatch => {
    Axios.post('/user/register',{user,pwd,type})
    .then(res=>{
      if(res.status == 200 && res.data.code === 0){
        dispatch(registerSuccess({user,pwd,type}))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}