// n个reducerHanshu :根据老的state和指定的action返回一个新的state

/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import {combineReducers} from 'redux';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,  RESET_USER} from './action-types';
import {getRedirectTo} from '../utils';

const initUser = {
    username:'',
    type:'',
    msg:'',//错误提示信息
    redirectTo:''
}
//产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type){
        case AUTH_SUCCESS: //data是user
        const {type, header} = action.data;
        // return {...state.data, redirectTo:'/'}
            return {...state.data, redirectTo:getRedirectTo(type, header)}
        case ERROR_MSG: //data是msg
            return {...state, msg: action.data};
        case RECEIVE_USER: //data是USER
            return action.data;
        case RESET_USER: //data是msg
            return {...initUser, msg: action.data}
        default:
            return state
    }
}



// 返回合并后的reducer 函数
export default combineReducers({user});

