/**
 * Created by ChinaHp on 2016/8/11.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router,hashHistory,browserHistory} from 'react-router';

import { Provider } from 'react-redux';

import createStore from './store'
let store = createStore();

import routes from './Route'; //路由配置

import './auto-set-rem'

import  './less/my.bootstrap.min.css'
import  './less/wx.less'
import  './less/common.less'
import  './less/swiper.css'
import  './less/swiper2.css'

render(

    <Provider store={store}>

    <Router routes={routes} history={hashHistory} />

    </Provider>
    ,document.getElementById('content'));