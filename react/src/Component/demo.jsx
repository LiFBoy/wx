'use strict';

import React, {Component, PropTypes} from 'react';

import Cs from 'classnames'

// import Picker from 'react-mobile-picker';

// import ReactDOM, {render} from 'react-dom';


import ReactSwipes from './swiper'

import xsz from '../img/login/xsz.jpg'
import baika24 from '../img/login/baika2.4.jpg'
import baika1356 from '../img/login/13.56baika.jpg'
import select from '../img/login/select.png'
import unselect from '../img/login/unselect.png'
import left from '../img/login/left.png'
import right from '../img/login/right.png'

import {R_header} from './common/index'

// import NamePicker from './NamePicker'


// import DatePicker from '../Component/DatePicker/DatePicker'


import {Tool} from '../utils'







export default class Demo extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state={
            item:{},
            x:''
        }


    }




    handleValChange(value){
        alert(value)
    }

    item(x){
        console.log(this);
        this.setState({
            x:x
        })

        if(x==0){
            this.setState({
                item:{
                    item1:true
                }
            })


        }else if(x==1){
            this.setState({
                item:{
                    item2:true
                }
            })

        }else if(x==2){
            this.setState({
                item:{
                    item3:true
                }
            })

        }

    }


    next(){

        const {x} =this.state;
      //  alert(x)
        if(x==0){
            this.context.router.push(`/adddevice/0/${this.props.params.type}`);
        }else if(x==1){
            this.context.router.push(`/adddevice/1/${this.props.params.type}`);
        }else if(x==2){
            this.context.router.push(`/adddevice/2/${this.props.params.type}`);
        }

    }


    render() {

        const {item} =this.state;

        const item1=Cs({"item":true,"select-item":item.item1});
        const item2=Cs('app-margin-lr10',{"item":true,"select-item":item.item2})
        const item3=Cs({"item":true,"select-item":item.item3,'app-margin-right24':true});

        // const next=Cs('app-btn',{"app-yellow-radius-check-button":!!item.item1||!!item.item2||!!item.item3,"app-unselect":!item.item1||!item.item2||!item.item3?})

        // swipes 的配置
        let opt = {
            distance: 250, // 每次移动的距离，卡片的真实宽度，需要计算
            swTouchend: (ev) => {
                let data = {
                    moved: ev.moved,
                    originalPoint: ev.originalPoint,
                    newPoint: ev.newPoint,
                    cancelled: ev.cancelled
                }
                console.log(data);
                // this.setState({
                //     curCard: ev.newPoint
                // })
            }
        };

        return (
            <div>

                <R_header left="1" title="选择设备类型"/>



                <div className="step app-padding-t20">
                    <div className="s-center">
                        <div className="app-headerImg"><img src={left} className="app-all-img"/></div>
                        <div>左右滑选择设备</div>
                        <div className="app-headerImg"><img src={right} className="app-all-img" /></div>
                    </div>
                </div>
                <section className="demo" id="demo-distance">
                    <div className="viewport">
                        <div className="flipsnap">
                            <ReactSwipes className="card-slide" options={opt} item={this.item.bind(this)}>
                                <div className={item1}>
                                    <div className="top-right app-select">
                                        <img src={!!item.item1?select:unselect} className="app-all-img "  />
                                    </div>

                                    <div className="app-padding-tb20 app-padding-lr20">
                                        <div className=""><img src={xsz} className="app-all-img "/></div>
                                        <div className="app-padding-t20">智能学生证</div>
                                    </div>
                                </div>
                                <div className={item2} ref="itme2">
                                    <div className="top-right app-select">
                                        <img src={!!item.item2?select:unselect} className="app-all-img "  />
                                    </div>

                                    <div className="app-padding-tb20 app-padding-lr20">
                                        <div className=""><img src={baika1356} className="app-all-img "/></div>
                                        <div className="app-padding-t20">13.56考勤卡</div>
                                    </div>

                                </div>
                                <div className={item3} ref="itme3">
                                    <div className="top-right app-select">
                                        <img src={!!item.item3?select:unselect} className="app-all-img "  />
                                    </div>
                                    <div className="app-padding-tb20 app-padding-lr20">
                                    <div className=""><img src={baika24} className="app-all-img "/></div>
                                    <div className="app-padding-t20">2.4考勤卡</div>
                                </div>
                                </div>
                            </ReactSwipes>

                        </div>
                    </div>
                </section>

                <div className={!!item.item1||!!item.item2||!!item.item3?"app-yellow-radius-check-button app-btn app-margin-lr40":"app-btn app-unselect app-margin-lr40"}  onClick={this.next.bind(this)}>
                    {/*<input className="s-center" type="submit" readOnly="readOnly" value="登录"/>*/}

                    <div className="s-center">下一步</div>
                </div>

            </div>
        );
    }
    }


Demo.contextTypes = {
    router: React.PropTypes.object.isRequired
};