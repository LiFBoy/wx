'use strict';

import React, {Component, PropTypes} from 'react';

import cardback from '../img/authen/cardback.jpg'
import cardfont from '../img/authen/cardfont.jpg'
import idcard from '../img/authen/idcard.png'
import name from '../img/authen/name.png'

import {R_header} from './common/index'

import Model from './common/model'

import reason from '../img/more/reason.png'

class Authen extends React.Component{
    constructor(){
        super();

        this.state={
            model:{

            },

        };



        this.modelConfig={

            model_content:true,
            header:

                <div className="season-header border-bottom">
                    <div className="step s-center">
                        <div className="app-hong-font28 s-center">
                            <img src={reason} className="app-headerImg" />

                            <div>认证不通过的原因</div>
                        </div>
                    </div>
                </div>,

            content: <div className="content app-padding-tb20">


                <div className="_content">
                    <div className="s-flex-d">
                        <div>1.姓名和身份证不匹配</div>
                        <div>2.身份证正面照片不合格</div>
                        <div>3.身份证反面照片不合格</div>
                    </div>
                </div>




            </div>,
            footer: <div className="season-footer step">


                        <div className="s-center">
                            <div className="btn" onClick={this.know.bind(this)}>我知道了</div>
                        </div>


            </div>

        }


    }


    know(){
        this.setState({
            model:{
                flag:false
            }
        })
    }


    reason(flag){

        console.log(flag)

        this.setState({
            model:{
                flag:flag
            }
        })

    }

    render(){
        const {model} =this.state;
        return (
            <div className="app-container">

                <R_header left="1" title="选择设备类型" right="3" auSeason={this.reason.bind(this)}/>
                <Model modelConfig={this.modelConfig} flag={model.flag}/>


                <div className="app-margin-tb20">
                    <div className="step app-white-chunk border-bottom">
                        <div className="s-flex-zero app-padding-lr24">
                            <img src={name} className="app-headerImg"/>
                        </div>
                        <div className="s-flex2">
                            <input type="text" className="app-333-font28" placeholder="请输入您的真实姓名"/>
                        </div>
                    </div>
                    <div className="step app-white-chunk border-bottom">
                        <div className="s-flex-zero app-padding-lr24">
                            <img src={idcard} className="app-headerImg"/>
                        </div>
                        <div className="s-flex2">
                            <input type="text" className="app-333-font28" placeholder="请输入您的身份证"/>
                        </div>
                    </div>
                </div>

                <div className="step app-white">
                    <div className="app-333-font28 app-padding-l24 app-padding-t20">上传身份证</div>
                </div>

                <div className="step app-white app-padding-lr40">
                    <div className="s-flex1">
                    <div className="step s-flex-d">
                        <div className="app-textAlgin app-333-font24">正面照片</div>
                        <div className="card">
                            <div className="app-upload">上传</div>
                            <div className="app-delete">删除</div>
                            <img src={cardfont} className="app-all-img"/>
                        </div>
                    </div>
                </div>

                    <div className="s-flex1">
                        <div className="step s-flex-d">
                            <div className="app-textAlgin app-333-font24">反面照片</div>
                            <div>
                                <img src={cardfont} className="app-all-img"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="app-yellow-radius-check-button app-btn app-margin-lr40 app-margin-t30" >
                    {/*<input className="s-center" type="submit" readOnly="readOnly" value="登录"/>*/}

                    <div className="s-center">提交认证审核</div>
                </div>
            </div>
        )
    }

}
export default  Authen;