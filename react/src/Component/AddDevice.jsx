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
import {HttpService} from '../utils'

class AddDevice extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {

        super(props);
        this.state = {
            val: '',
            bg: 'app-little-pink-radius-button',
            frequent:''

        }
    }


    async login(){
       const code= await HttpService.query({
            url: '/cgi-bin/token',
            data:{
                grant_type:'client_credential',
                appid:'wx85577a457cfcd222',
                secret:'4b97c766ddd918f34753eeb794ee6e52'
            },
        });

        window.localStorage.token=code.access_token;
    }

    async t(){

        const code= await HttpService.query({
            url: '/cgi-bin/ticket/getticket',
            data:{
                type:'jsapi',
                access_token:localStorage.token

            },
        });

        console.log(code)

    }

    _setSate(num) {
        this.setState({
            frequent:num
        })

    }
    componentWillMount(){

        const {type} =this.props.params;
        if(type==0){
            this._setSate('')
            this.scanQrcode()
        }else if(type==1){
            this._setSate(13.56)
        }else if(type==2){
            this._setSate(2.4)
        }

        const nonceStr=this.createNonceStr();
        const timestamp=this.createTimeStamp();



    }

    scanQrcode(){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success:  (res)=>{

                //return cb(res);

                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果


                Toast.toast('扫描结果：'+result,3000);


                this.props.scanDevice(this,result,this.state.frequent,this.props.params.code);
            }
        });
    }


    createNonceStr(){
        return Math.random().toString(36).substr(2, 15);
    }

    createTimeStamp(){
        return parseInt(new Date().getTime() / 1000) + '';
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
        if (!val) {
            Toast.toast('请输入设备号', 3000);
            return;
        }
        this.props.scanDevice(this,val,this.state.frequent,this.props.params.code)
    }


    render() {

        const {bg} =this.state;

        const {type} =this.props.params;

        return (
            <div style={{background: '#eee', minHeight: '100%'}}>

                {

                    type==0?<R_header title="输入IMEI号" left="1"/>:<R_header title="输入考勤卡号" left="1"/>
                }



                <div className="container">

                    <form onSubmit={this.next.bind(this, this.state.val)} name="form">
                        <div className="col-xs-12 app-white-input margin-one">
                            <input type="number" placeholder={type==0?'请输入设备的IMEI号':'请输入设备的10考勤卡号'} style={{width: '100%'}}
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