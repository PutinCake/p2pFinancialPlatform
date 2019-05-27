/*
入口JS
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import Login from './containers/login/login.jsx';
import Register from './containers/register/register.jsx';
import DashenInfo from './containers/dashen-info/dashen-info';
import LaobanInfo from './containers/boss-info/boss-info';
import Main from './containers/main/main.jsx';

import './assets/css/index.less';


ReactDOM.render((
    <Provider store={store}>
    <HashRouter>
    <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/dasheninfo' component={DashenInfo}/>
    <Route path='/laobaninfo' component={LaobanInfo}/>
    <Route component={Main}/>
    </Switch>
    </HashRouter>
    </Provider>
    ), document.getElementById('root'))