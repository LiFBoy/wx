'use strict';

import React from 'react';

import {HttpService, Toast} from '../utils'

import phone from '../img/login/phone.png'
import pwd from '../img/login/pwd.png'
import user from '../img/login/user.png'

import Model from './common/model'

import header from '../img/login/header.jpg'
import footer from '../img/login/footer.jpg'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//import {Router, Route, IndexRoute, browserHistory} from 'react-router';


import Link from './common/Link'

import {doLogin2} from '../action/index'


class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            model:{

            },
            banners:{

            }

        };
        this.modelConfig={
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content">

                <div className="_header">
                    市民认证
                </div>
                <div className="_content">
                    姓名和身份证不匹配，身份证姓名和身份证不匹配，身份证姓名和身份证不匹配，身份证姓名和身份证不匹配，身份证
                </div>
                <div className="_footer">

                    去认证

                </div>




            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        }
    }

    componentDidMount(){

        // var a=document.getElementsByTagName('a');
        // for(var i=0;i<a.length;i++){
        //     alert(111)
        //     a[i].addEventListener('touchstart',function(){},false);
        // }
    }


    ee(event){
        event.preventDefault();
    }
    async login(){

        // this.setState({
        //     model:{
        //         flag:true
        //     }
        // })



        const phone=this.refs.phone.value;
        const pwd=this.refs.pwd.value;
     var result=  await HttpService.save({
            url:'/app/user/login',
            data:{
                account:phone,
                password:pwd,
                weixinclient:'true'
            }
        });

        window.localStorage.delDevice = 0;
        // window.localStorage.is = '0';

        if(result.code==10008){

            this.props.doLogin2(result.data.token,result.data.userid,this);

            this.context.router.push('/map/' + result.data.token+'/'+result.data.userid);

        }else if(result.code==10007){
            Toast.toast(result.msg,3000)
        }else if(result.code==100073){
            window.localStorage.userid = result.data.userid;
           //this.props.history.replaceState(null,'demo');
            this.context.router.push('/demo/100073');
        }else if(result.code==100071){
            Toast.toast(result.msg,3000)
        }else if(result.code==100072){
            Toast.toast(result.msg,3000)
        }else if(result.code==100074){
            //去认证
        }else if(result.code==100075){
            //去支付
        }


    }
    render() {
        const {model} =this.state;
        return (
            <div className="app-login app-padding-lr24" ref='_login'>

                <Model modelConfig={this.modelConfig} flag={model.flag}/>
                    <div className="step">
                        <div className="s-center">
                            <div className="login-img">
                                <img src={user} className="app-wh100-all"/>

                            </div>
                        </div>
                    </div>

                    <div className="step border-bottom app-wh120">
                        <div className="app-wh-45 app-margin-right24">
                            <img className="app-wh100-all-radius" src={phone}/>
                        </div>

                        <div className="s-flex1 app-666-font30">
                            <input className="app-333-font28 login-input"
                                   placeholder="监护人手机号码" type="number" ref='phone'/>
                        </div>

                    </div>
                    <div className="step border-bottom app-wh120">
                        <div className="app-wh-45 app-margin-right24">
                            <img className="app-wh100-all-radius" src={pwd}/>
                        </div>

                        <div className="s-flex1 app-666-font30">
                            <input className="app-333-font28 login-input"
                                   placeholder="6-20位字符密码，区分大小写" type="password" ref="pwd" />
                        </div>

                    </div>

                    <div className="step app-yellow-radius-check-button login-btn" onClick={this.login.bind(this)}>
                        {/*<input className="s-center" type="submit" readOnly="readOnly" value="登录"/>*/}

                        <div className="s-center">登录</div>
                    </div>


                    <div className="step">
                        <Link to={'/register'} className="s-flex1 app-a">
                            <div className="s-flex1 s-j-end app-333-font28">新用户开通</div>
                        </Link>
                        <div className="app-padding-lr50 app-with1"></div>
                        <Link to={'/ForgetPwd'} className="s-flex1 app-a">

                            <div className="s-flex1 app-333-font28">忘记密码</div>

                        </Link>
                    </div>

                {/*<div>*/}
                    {/*<span><a href='http://www.baidu.com' target='_blank'>BLANK-</a></span>*/}
                {/*</div>*/}
            </div>

        )
    }
}



const mapStateToProps = state => {
    return {


    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

        doLogin2: doLogin2,


    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);