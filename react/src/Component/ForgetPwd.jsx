'use strict';

import React from 'react';

import {HttpService, Toast} from '../utils'

import phone from '../img/login/phone.png'
import pwd from '../img/login/pwd.png'
import user from '../img/login/user.png'
import code_ from '../img/login/code.png'

import {R_header} from './common/index'

class ForgetPwd extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            disabled: false,
            text: '获取验证码',
            timer: 60,
            val: '',
            code: ''
        };

        this.countdown = []
    }


    changeValue(e) {

        this.check_phone(e.target.value);

    }

    changeCode(e) {

        this.setState({
            code: e.target.value,
        });

    }


    async forgetPassword(val,code){

        const pwd=this.refs.pwd.value;
        const result=await HttpService.save({
            url:'/app/user/forgotPassWord?weixinclient=true',
            data:{
                account:val,
                smscode:code,
                password:pwd
            }
        });

        if(result.code==10010){

            clearInterval(this.countdown);
            this.context.router.push('/');

        }else{
            Toast.toast(result.msg,3000)
        }
    }


    check_phone(phone) {
        let patt = /^[1]\d{10}$/;
        let val = phone;

        this.setState({
            val: val,
        });
        if (!val) {

            Toast.toast('手机号不能为空', 3000);

            return false;
        } else if (!patt.test(val)) {
            Toast.toast('手机号不正确，请重新输入', 3000);
            return false;
        }


        return true
    }

    async getCode(phone) {

        // alert(phone)


        if (!this.check_phone(phone)) {
            return;
        }
        if (this.state.disabled) {
            return;
        }
        let code = await HttpService.save({
            url: "/app/user/checkTelephone?weixinclient=true",
            data: {account: phone}
        });
        console.log(code);

        if(code.code==10002){

            const code=await HttpService.save({
                url:'/app/user/generateSMSCode?weixinclient=true',
                data:{
                    account: phone,
                    module:'resetpassword'
                }
            });

            if(code.code==10004){
                this.setState({
                    disabled: true,
                    text: '59s后重新获取',
                    timer: 59,
                });


                this.countdown = setInterval( ()=> {
                    var tt = this.state.timer - 1;
                    if (tt <= 0) {
                        this.setState({
                            disabled: false,
                            text: '获取验证码',
                            timer: 60,
                        });
                        clearInterval(this.countdown);
                        return;
                    }
                    this.setState({
                        disabled: true,
                        text: tt + 's后重新获取',
                        timer: tt,
                    })
                }, 1000);
            }else{
                Toast.toast(code.msg,'3000')
            }




        }else if(code.code==10003){
            Toast.toast(code.msg,3000);
        }

    }


    render() {
        let {val, code}=this.state;
        return (


            <div className="forgetpwd">
                <R_header title="忘记密码" left="1"/>

                <div className="app-login app-padding-lr24 app-margin-t30">

                    <div className="card">

                        <div className="step border-bottom app-wh88">
                            <div className="app-wh-45 _app-margin-right24">
                                <img className="app-wh100-all-radius" src={phone}/>
                            </div>

                            <div className="s-flex1 app-666-font30">
                                <input className="app-333-font28 login-input" onBlur={this.changeValue.bind(this)}
                                       placeholder="监护人手机号码" type="number"/>
                            </div>

                            <div className="s-flex1 s-j-end app-666-font30">
                                <div className="login-code step" onClick={this.getCode.bind(this, val)}>
                                    <div className="s-flex1 s-j-center">{this.state.text}</div>
                                </div>
                            </div>

                        </div>

                        <div className="step border-bottom app-wh88">
                            <div className="app-wh-45 app-margin-right24">
                                <img className="app-wh100-all-radius" src={code_}/>
                            </div>

                            <div className="s-flex1 app-666-font30">
                                <input className="app-333-font28 login-input"
                                       placeholder="输入短信验证码" type="number" onChange={this.changeCode.bind(this)}/>
                            </div>
                        </div>
                        <div className="step border-bottom app-wh88">
                            <div className="app-wh-45 app-margin-right24">
                                <img className="app-wh100-all-radius" src={pwd}/>
                            </div>

                            <div className="s-flex1 app-666-font30">
                                <input className="app-333-font28 login-input" ref="pwd"
                                       placeholder="6-20位字符密码，区分大小写" type="password"/>
                            </div>


                        </div>

                    </div>


                    <div className="step app-yellow-radius-check-button login-btn" onClick={this.forgetPassword.bind(this,val,code)}>
                        {/*<input className="s-center" type="submit" readOnly="readOnly" value="登录"/>*/}

                        <div className="s-center">确定</div>
                    </div>

                </div>
            </div>

        )
    }
}


export default ForgetPwd