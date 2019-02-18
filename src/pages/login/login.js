import React from 'react'
import { connect }  from 'react-redux'
import { Redirect } from 'react-router-dom'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import Logo from '../../components/logo/logo'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register(){
    this.props.history.push('/register')
  }
  handleClick(key,value){
    this.setState({
      [key]:value
    })
  }
  handleLogin(){
    console.log(this.state)
    this.props.login(this.state)
  }
  render(){
    return (
    <div>
      {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
      <Logo></Logo>
      <WingBlank>
        <List>
          {this.props.msg?<p>{this.props.msg}</p>:null}
          <InputItem
            onChange={v=> this.handleClick('user',v)}
          >用户</InputItem>
          <InputItem
            onChange={v=> this.handleClick('pwd',v)}
          >密码</InputItem>
        </List>
        <WhiteSpace/>
        <Button type="primary"
          onClick={this.handleLogin}
        >登录</Button>
        <WhiteSpace/>
        <Button type="primary" onClick={this.register}>注册</Button>
      </WingBlank>
    </div>
    )
  }
}
export default connect(
  state=>state.user,
  {login}
)(Login)