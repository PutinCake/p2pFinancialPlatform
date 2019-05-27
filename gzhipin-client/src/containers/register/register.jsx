/*
用户注册的路由组件
*/
import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
    } from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {register} from '../../redux/actions';
import Logo from '../../components/logo/logo';



class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'
        }
        // 注册调用
        register = () => {
        //console.log(JSON.stringify(this.state))
        this.props.register(this.state)
        }

        // 处理输入框/单选框变化, 收集数据到state
        handleChange = (name, value) => {
        this.setState({[name]: value})
        }
        // 跳转到login 路由
        toLogin = () => {
        this.props.history.replace('/login')
        }

    render() {
        const {type} = this.state;
        const {redirectTo, msg} = this.props;
        //如果redirectTo有值，就需要重定向到指定的路由
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
        <div>
            <NavBar>硅谷直聘</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                {msg?<div className='error-msg'>{msg}</div> : null}
                <InputItem
                    placeholder='输入用户名'
                    onChange={val => this.handleChange('username', val)}>
                    用户名:
                </InputItem>

                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder='输入密码'
                    onChange={val => this.handleChange('password', val)}>
                    密&nbsp;&nbsp;&nbsp;码:
                </InputItem>

                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder='输入确认密码'
                    onChange={val => this.handleChange('password2', val)}> 
                    确认密码:
                </InputItem>

                <WhiteSpace/>
                <List.Item>
                <span style={{marginRight: 30}}>用户类型:</span>
                <Radio checked={this.state.type==='dashen'}
                onClick={() => {this.handleChange('type', 'dashen')}}>大神</Radio>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={this.state.type==='laoban'}
                onClick={() => {this.handleChange('type', 'laoban')}}>老板</Radio>
                </List.Item>

                <WhiteSpace/>
                <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>

                <WhiteSpace/>
                <Button onClick={this.toLogin}>已经有账号</Button>
                </List>
            </WingBlank>

        </div>
        )
    }
}

export default connect(
    // state => ({}),
    state => state.user,
    {register}
)(Register)