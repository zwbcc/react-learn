import React from 'react'
import Axios from 'axios';
import { withRouter }  from 'react-router-dom'
import { connect } from 'react-redux' 
import { loadData } from '../../redux/user.redux'


class Authroute extends React.Component{
  componentDidMount(){
    console.log(this.props)
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    Axios.get('/user/info')
      .then(res=>{
        if(res.status === 200){
          if(res.data.code === 0){
            this.props.loadData(res.data.data)
          }else {
            this.props.history.push('/login')
          }
        }
      })
    
  }
  render(){
    return null
  }
}



export default connect(null,{loadData})(withRouter(Authroute))