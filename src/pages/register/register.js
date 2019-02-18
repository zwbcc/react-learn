import React from 'react'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { Redirect}  from 'react-router-dom'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import {register} from '../../redux/user.redux'


class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      type:'genius',
      user: '',
      pwd:'',
      repwd:'',
    }
    this.registers = this.registers.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  registers(){
    this.props.register(this.state)
    console.log(this.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
      <Logo/>
      <WingBlank>
        <List>
          {this.props.msg?<p>{this.props.msg}</p>:null}
          <InputItem
            onChange={v=> this.handleChange('user',v)}
          >用户</InputItem>
          <InputItem
            type="password"
            onChange={v=> this.handleChange('pwd',v)}
          >密码</InputItem>
          <InputItem
            type="password"
            onChange={v=> this.handleChange('repwd',v)}
          >确认密码</InputItem>
          <RadioItem 
            onClick={v=> this.handleChange('type','genius')}  
            checked={this.state.type ==='genius'}>牛人</RadioItem>
          <RadioItem 
            onClick={v=> this.handleChange('type','boss')}
            checked={this.state.type ==='boss'}>Boss</RadioItem>
          <WhiteSpace/>
          <Button 
            type="primary"
            onClick={this.registers}
            >注册</Button>
        </List>
      </WingBlank>
    </div>
    )
  }
}
export default connect(
  state=>state.user,
  {register}
)(Register)