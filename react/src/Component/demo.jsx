'usr strict';

import React, {Component, PropTypes} from 'react';

// import Picker from 'react-mobile-picker';

// import ReactDOM, {render} from 'react-dom';


import ReactSwipes from './swiper'

// import NamePicker from './NamePicker'


// import DatePicker from '../Component/DatePicker/DatePicker'


// import '../../src/less/example.less'







export default class Demo extends React.Component {
    constructor(props) {
        super(props);
    }


    handleValChange(value){
        alert(value)
    }


    render() {

        // swipes 的配置
        let opt = {
            distance: 200, // 每次移动的距离，卡片的真实宽度，需要计算
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
                <section className="demo" id="demo-distance">
                    <h3>distance</h3>
                    <div className="viewport">
                        <div className="flipsnap">
                            <ReactSwipes className="card-slide" options={opt} onclick={this.item.bind(this)}>
                                <div className="item">1</div>
                                <div className="item">2</div>
                                <div className="item">3</div>
                                <div className="item">4</div>
                                <div className="item">5</div>
                            </ReactSwipes>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
    }