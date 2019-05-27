/*
应用主界面路由组件
*/
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';//操作前端cookie的对象 set() get() remove()
import {getRedirectTo} from '../../utils';


import LaobanInfo from '../boss-info/boss-info';
import DashenInfo from '../dashen-info/dashen-info';

class Main extends Component {

    componentDidMount(){
        //登陆过（coockie中有userid），但没有登录（redux管理的user中没有_id)发请求获取对应的user：
        const userid = Cookies.get('userid');
        const{_id} = this.props.user;
        if(userid && !_id) {
            //发送异步请求，获取user信息
            console.log('发送ajax请求获取user')
        }
    }



    render() {
        
        //读取cookie中的userid
        const userid = Cookies.get('userid');
        console.log('这是userid='+ userid);
        //如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login' />
        }
        //如果有，读取redux中的user状态
        const {user} = this.props;
        console.log('这是user信息=' + user);
        //如果user没有_id,返回null
       
        if(!user._id) {
            return null
        } else {
        //如果有_id，显示对应的界面
        //根据user的type和 来计算出一个重定向的路由路径，并重新定向
        let path = this.props.location.pathname;
        if(path==='/'){
            //得到一个重定向的路径
            path = getRedirectTo(user.type, user.header)
            return <Redirect to={path} />
        }
    }
        //检查与个户是否登录，如果没有，重定向到登录界面
        

        return (
        <div>
            <Switch>
                <Route path='/laobaninfo' component={LaobanInfo} />
                <Route path='/dasheninfo' component={DashenInfo} />
            </Switch>
        </div>
        )
    }
}

export default connect(
    state => ({user:state.user})
)(Main)

/*
1.实现自动登录：
1）登陆过（coockie中有userid），但没有登录（redux管理的user中没有_id)发请求获取对应的user： componentDidMount;
2)如果cookie中没有userid,自动进入login界面；
3)判断redux管理的user中是否有_id，如果没没有，暂时不做任何显示
4）如果有，说明当前已经登录，显示对应的界面
5）如果请求根路径，根据user的type和header来计算出一个重定向的路由路径，并且自动重定向
*/