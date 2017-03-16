'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {R_header} from './common/index'

import {scanDevice} from '../action/index'
import {Toast} from '../Http'

import kaoqin24 from '../img/login/kaoqin24.png'
import kaoqin1356 from '../img/login/kaoqin1356.png'


class AddDevice extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            val: '',
            bg: 'app-little-pink-radius-button'
        }
    }


    change(e) {
        let val = e.target.value;


        this.setState({
            val: val,
            bg: 'app-pink-radius-button'
        })

    }

    next(val, e) {
        e.preventDefault();

        const {type} =this.props.params;
        if(type==0){
            var frequent="";
        }else if(type==1){
            var frequent=13.56;
        }else if(type==2){
            var frequent=2.4;
        }

        if (!val) {
            Toast.toast('请输入设备号', 3000);
            return;
        }
        this.props.scanDevice(val,frequent)
    }


    render() {

        const {bg} =this.state;
        return (
            <div style={{background: '#eee', minHeight: '100%'}}>
                <R_header title="输入IMEI号" left="1"/>

                <div className="container">

                    <form onSubmit={this.next.bind(this, this.state.val)} name="form">
                        <div className="col-xs-12 app-white-input margin-one">
                            <input type="number" placeholder="请输入设备的IMEI号" style={{width: '100%'}}
                                   onChange={this.change.bind(this)}/>
                        </div>

                        <label style={{display: 'block'}}>
                            <div className={"col-xs-12  text-center " + bg}>
                                激活设备
                            </div>
                            <button type="submit" style={{display: 'none'}}></button>
                        </label>

                        {/*<div className="col-xs-12" style={{marginTop: '1rem'}}>*/}
                            {/*注：请输入设备背面、包装或说明书上的IMEI号的前14位数字、最后一位数字为核验码，不用输入！*/}
                        {/*</div>*/}


                    </form>

                </div>

                {
                    this.props.params.type==0?'':<div className="app-device app-margin-lr40 app-margin-t30">
                            <div className="step app-padding-t20">
                                <div className="s-center app-hong-font28">"考勤卡号" &nbsp;如图所示数子</div>
                            </div>
                            <div className="step">

                                <div className="s-flex1">
                                    <div className="step s-flex-d app-padding-tb20 app-padding-lr24">
                                        <div className="s-center app-333-font28">2.4G白卡</div>
                                        <div className="s-center">
                                            <img src={kaoqin24} className="app-all-img"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="s-flex1">
                                    <div className="step s-flex-d app-padding-tb20 app-padding-lr24">
                                        <div className="s-center app-333-font28">13.56白卡</div>
                                        <div className="s-center">
                                            <img src={kaoqin1356} className="app-all-img"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        scanDevice: scanDevice
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);