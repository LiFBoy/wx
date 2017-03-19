'usr strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {R_header} from './common/index'

import success from '../img/success.png'

//import {Link} from 'react-router';
import Link from './common/Link'


import {HttpService, Toast}  from'../Http';


export default class Success extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props)
    }
    componentWillMount() {
        console.log(this.props.params.time);
    }

    goto() {

        console.log(this);


        window.localStorage.delDevice = 1;

      //  this.context.router.push(`/map/${localStorage.appToken}/${localStorage.userid}`);


        //this.context.router.push('/map/' + result.data.token+'/'+result.data.userid);


        window.location.href = `/index.html#/map/${localStorage.appToken}/${localStorage.userid}`;
    }

    render() {
        return (

            <div>
                <R_header title="成功"/>
                <div className="container" style={{margin: '6rem 0'}}>
                    <div className="col-xs-12 text-center">
                        <img src={success} style={{
                            width: '8rem', height: '8rem'
                        }}/>
                    </div>
                    <div className="col-xs-12 text-center"
                         style={{paddingTop: '1.5rem', paddingBottom: '2rem', fontSize: '1.7rem', color: '#333'}}>激活成功！
                    </div>
                    <div className="col-xs-12 text-center" style={{fontSize: '1.4re', color: '#666'}}>
                        <span>套餐试用期至：</span><span style={{color: '#02b4ed'}}>{this.props.params.time}</span>
                    </div>

                    <div className="col-xs-12 app-pink-radius-button text-center" onClick={this.goto.bind(this)}
                         style={{marginTop: '1.5rem', fontSize: '1.6rem'}}>开始使用
                    </div>
                </div>
            </div>

        )

    }
}