'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {R_header} from './common/index'

import {HttpService, Toast}  from'../Http';


class Gotoactive extends React.Component {


    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {


            studentname: '',
            teachertel: '',
            bg: 'app-little-pink-radius-button'

        };
    }


    componentWillMount() {

        console.log(this.props.params.telephone);
        console.log(this.props.params.mdtid)


    }

    componentDidMount() {

    }

    name(e) {
        let val = e.target.value;
        this.setState({
            studentname: val
        });

        if (!!this.state.studentname && !!this.state.teachertel) {
            this.setState({
                bg: 'app-pink-radius-button'
            })
        }
    }

    teachertel(e) {
        let val = e.target.value;
        this.setState({
            teachertel: val
        });


        if (!!this.state.studentname && !!this.state.teachertel) {
            this.setState({
                bg: 'app-pink-radius-button'
            })
        }
    }

    next(studentname, teachertel, e) {
        e.preventDefault();

        var patt = /^[1]\d{10}$/;

        if (!studentname) {
            Toast.toast('请输入宝贝姓名', 3000);
            return;
        } else if (!teachertel) {
            Toast.toast('请输入手机号', 3000);
            return;
        } else if (!patt.test(teachertel) && !!teachertel) {
            Toast.toast('手机格式不正确', 3000);
            return;
        }

        if(this.props.params.code==0){

            HttpService.query({
                url: '/app/device/guardianActive',
                data: {
                    mdtid: this.props.params.mdtid,
                    telephone: this.props.params.telephone,
                    studentname: studentname,
                    teachertel: teachertel,
                    babyname:this.refs.nicheng.value,
                    token: localStorage.appToken,
                    weixinclient:'true'
                },
                success: (res=> {
                    if (res.code == 10150) {
                        const endTime = res.data.endtime;
                        this.context.router.push(`/success/${endTime}`);
                        //    window.location.href = '/index.html#/Success/' + endTime + '';
                    } else {
                        Toast.toast(res.msg, 3000);
                    }
                })

            })



        }else if(this.props.params.code==100073){

            HttpService.query({
                url: '/app/user/logon6',
                data: {
                    mdtid: this.props.params.mdtid,
                    telephone: this.props.params.telephone,
                    studentname: studentname,
                    teachertel: teachertel,
                    babyname:this.refs.nicheng.value,
                    userid: localStorage.userid,
                    weixinclient:'true'
                },
                success: (res=> {
                    if (res.code == 10150) {
                        const endTime = res.data.endtime;
                        alert(res.data.token);
                        window.localStorage.appToken = res.data.token;
                        this.context.router.push(`/success/${endTime}`);
                        //    window.location.href = '/index.html#/Success/' + endTime + '';
                    } else {

                        Toast.toast(res.msg, '3000');
                    }
                })

            })

        }


    }


    render() {

        const {bg} =this.state;
        return (

            <div style={{background: '#eee', minHeight: '100%'}}>

                <R_header title="激活设备" left="1"/>

                <div className="container">
                    <form onSubmit={this.next.bind(this, this.state.studentname, this.state.teachertel)} name="form">

                        <div className="col-xs-12 app-content-title app-padding-zero">设备信息</div>
                        <div className="col-xs-12 app-white-input">
                            <label className="app-white-input-label">设备IMEI号</label>
                            <input id="number" disabled type="text" placeholder="23764761536276"
                                   value={this.props.params.mdtid}/>
                        </div>
                        <hr className="app-bootstrap-hr"/>
                        <div className="col-xs-12 app-white-input">
                            <label className="app-white-input-label">设备手机号</label>
                            <input id="number2" type="text" disabled placeholder="请输入设备手机号"
                                   value={this.props.params.telephone}/>
                        </div>
                        <div className="col-xs-12 app-content-title app-padding-zero">实名认证</div>

                        <div className="col-xs-12 app-white-input">
                            <label className="app-white-input-label">宝贝昵称</label>
                            <input id="number3" type="text" placeholder="请输入宝贝昵称" ref="nicheng"/>
                        </div>
                        <div className="col-xs-12 app-white-input">
                            <label className="app-white-input-label">宝贝姓名</label>
                            <input id="number3" type="text" placeholder="请输入宝贝姓名" onChange={this.name.bind(this)}/>
                        </div>
                        <hr className="app-bootstrap-hr"/>
                        <div className="col-xs-12 app-white-input">
                            <label className="app-white-input-label">班主任手机号</label>
                            <input id="number4" type="text" placeholder="请输入班主任手机号码"
                                   onChange={this.teachertel.bind(this)}/>
                        </div>


                        <label style={{display: 'block'}}>

                            <div className={"col-xs-12  text-center " + bg}
                                 style={{marginTop: '1.5rem'}}>激活设备
                            </div>
                            <button type="submit" style={{display: 'none'}}></button>
                        </label>

                    </form>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Gotoactive);