'usr strict';

import React from 'react';

import {HttpService, Toast} from '../utils'

import phone from '../img/login/phone.png'
import pwd from '../img/login/pwd.png'
import user from '../img/login/user.png'

import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

class Login extends React.Component {
    render() {
        return (
            <div className="app-login app-padding-lr24" ref='_login'>
                <form>
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
                                   placeholder="监护人手机号码" type="number"/>
                        </div>

                    </div>
                    <div className="step border-bottom app-wh120">
                        <div className="app-wh-45 app-margin-right24">
                            <img className="app-wh100-all-radius" src={pwd}/>
                        </div>

                        <div className="s-flex1 app-666-font30">
                            <input className="app-333-font28 login-input"
                                   placeholder="6-20位字符密码，区分大小写" type="number"/>
                        </div>

                    </div>

                    <div className="step app-yellow-radius-check-button login-btn">
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
                </form>
            </div>

        )
    }
}


export default Login