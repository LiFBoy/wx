'usr strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';


import {HttpService, Toast, GetCurrentDate} from'../Http';
import {Tool} from'../utils';

import {doLogin, doLogin2, change, getOneBabyid, changeSaveBabyStatus, getMap, getCurrentPower, exportMap} from '../action/index'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


//import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

import Link from './common/Link'
import '../less/index.less'

import '../less/deviceList.less'


import usrimg from '../../src/img/user.png'

import qiehuan from '../../src/img/qiehuan.png'

import dian2 from '../../src/img/dianliang1.png'
import dian3 from '../../src/img/dianliang2.png'
import dian4 from '../../src/img/dianliang3.png'
import dian1 from '../../src/img/didianliang.png'
import dian from '../../src/img/lixian.png'

import lishiguiji from '../../src/img/lishiguiji.png'
import banji from '../../src/img/banji.png'


import wifi from '../../src/img/wifi.png'
import lbs from '../../src/img/lbs.png'
import gbs from '../../src/img/gps.png'


import touxiang from '../../src/img/touxiang.png'

import shouqi from '../../src/img/shouqi.png'


import dingweixiao  from '../../src/img/dingweixiao.png'
import dingwei  from '../../src/img/dingwei.png'
import tongzhi  from '../../src/img/jianhuchengyuan.png'

import tonghuaxiao from '../../src/img/tonghuaxiao.png'

import zhankai from '../../src/img/zhankai.png'

import tonghua from '../../src/img/tonghua.png'

import anquan from '../../src/img/anquan.png'

import tianjia from '../../src/img/tianjia.png'

import more from '../../src/img/more.png'

import guanbi from '../../src/img/guanbi.png'



import header from '../img/login/header.jpg'
import footer from '../img/login/footer.jpg'


import jianhuchengyuan  from '../../src/img/jianhuchengyuan.png'


import  genghuan from '../../src/img/genghuan.png'

import  jiebang from '../../src/img/jiebang.png'

import kaoqin from '../../src/img/kaoqin.png'

 import Model from './common/model'


class MapIndex extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static defaultProps = {

        authstatus:'li'

    };
    constructor(props) {
        super(props);

        this.state = {
            lng: '120.153576',
            lat: '30.287459',
            isOpen: false,
            mapHeight: '100%',
            mapBottom: '4.5rem',
            checked: false,
            babyname: '',
            babyid: '',


            model:{

            },
            babyInfo:{

            },
            is:false

        };

        this.modelConfigBabyNone={
            model_content_contnet:true,
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content">

                <div className="_header">

                </div>
                <div className="_content">
                    无设备提醒
                </div>
                <Link to={'/demo/0'}>
                    <div className="_footer app-active-font32">

                        去添加

                    </div>
                </Link>

            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        };


        this.modelConfigBabyState0={
            model_content_contnet:true,
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content app-padding-lr20">

                <div className="_header app-active-font32">
                    实名认证
                </div>
                <div className="_content step app-666-font24" style={{flexDirection:'column'}}>
                    <div>尊敬的学生家长</div>
                    <div>根据工信部电话实名制要求，为保证智能学生证正常使用，请于1月15日之前办理，逾期将无法正常使用。为此给您带来的不便敬请谅解，感谢您的支持！</div>
                </div>
                <div className="_footer step">



                    <div className="s-flex1 s-j-end app-666-font32" onClick={this.no.bind(this)}>下次提醒</div>

                    <div className="app-padding-lr50"></div>


                    <div className="s-flex1 app-active-font32" onClick={this.authen.bind(this)}>去认证</div>

                </div>

            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        };

        this.modelConfigBabyState1={
            model_content_contnet:true,
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content app-padding-lr20">

                <div className="_header app-active-font32">
                    实名认证
                </div>
                <div className="_content step app-666-font24" style={{flexDirection:'column'}}>
                   <div>您的实名认证正在认证中，我们将尽快为您处理，请耐心等待</div>
                     </div>
                <div className="_footer step">



                    <div className="s-center app-active-font32" onClick={this.no1.bind(this)}>我知道了</div>

                </div>

            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        };

        this.modelConfigBabyState2={
            model_content_contnet:true,
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content app-padding-lr20">

                <div className="_header app-hong-font32">
                    实名认证不通过
                </div>
                <div className="_content step app-666-font24" style={{flexDirection:'column'}}>
                    <div>姓名和身份证不匹配，身份证正面照片不合格，身份证反面照片不合格</div>
                </div>
                <div className="_footer step">



                    <div className="s-flex1 s-j-end app-666-font32" onClick={this.no2.bind(this)}>下次提醒</div>

                    <div className="app-padding-lr50"></div>


                    <div className="s-flex1 app-active-font32" onClick={this.authen.bind(this)}>去认证</div>

                </div>

            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        }
        this.modelConfigBabyState3={
            model_content_contnet:true,
            header: <div className="header">

                <img src={header} className="app-all-img"/>


            </div>,
            content: <div className="content app-padding-lr20">

                <div className="_header app-active-font32">
                    实名认证
                </div>
                <div className="_content step app-666-font24" style={{flexDirection:'column'}}>
                    <div>因本设备管理逾期未进行实名认证，先已无法正常使用，请联系设备管理员进行实名认证</div>
                </div>
                <div className="_footer step">



                    <div className="s-center app-active-font32" onClick={this.no3.bind(this)}>我知道了</div>

                </div>

            </div>,
            footer: <div className="footer">
                <img src={footer} className="app-all-img"/>
            </div>

        }


    }

    no(){
        this.setState({
            model:Tool.assign({},this.state.model,{flag:false})
        })

    }
    no1(){
        this.setState({
            model:Tool.assign({},this.state.model,{flag1:false})
        })

    }
    no2(){
        this.setState({
            model:Tool.assign({},this.state.model,{flag2:false})
        })

    }
    no3(){
        this.setState({
            model:Tool.assign({},this.state.model,{flag3:false})
        })

    }

    authen(){
        this.context.router.push('/authen/'+this.state.babyInfo.telephone)
    }


    componentWillMount() {
        // window.localStorage.delDevice=0;//是否解绑过设备


        // if(!this.props.params.babyid){
        //     this.props.doLogin2(this.props.params.token,this.props.params.userid,this);
        //
        //
        // }


        if(localStorage.delDevice==1){
            this.props.getOneBabyid();
        }else if(!!this.props.babyid){

            this.props.getMap(this.props.babyid)
        }



        if (this.state.isOpen == false) {
            this.isOpen()
        }


    }

    componentWillUnmount() {


        // alert(this.props.location.key)

        console.log(this.props.exportMap);

        if(this.props.exportMap.length!=0){
            this.props.exportMap.clearMap();
        }


        var node = document.getElementById('container');
        if (!!node.parentNode) {
            console.log(22);
            node.parentNode.removeChild(node);
        }

        window.localStorage.delDevice = 0;
    }


    _change(babyname, babyid,authstatus, headimg, babytelephone, e) {
        localStorage.is='0';

        e.preventDefault();

        this.setState({
            checked: false,
        });

        const data = {
            babyname: babyname,
            authstatus: authstatus,
            babyid: babyid,
            babytelephone: babytelephone,
            headimg: headimg,
        };


        this.props.change(data);


    }

    more() {
        this.setState({
            checked: true
        })
    }

    guanbi() {
        this.setState({
            checked: false
        })
    }


    changeAge(f) {
        HttpService.query({
            url: '/app/object/saveBaby',
            data: {
                familystatus: f,
                babyid: this.props.babyid,
                token: localStorage.appToken,
                weixinclient:'true'

            },
            success: (res => {


                if (res.code == '10042') {

                    console.log(res);
                    Toast.toast(res.msg, 3000);


                    this.props.changeSaveBabyStatus(false);


                    //window.location.href = '/#/map/' + localStorage.sid1 + '';

                } else {
                    Toast.toast(res.msg, 3000);
                }
            })
        })


    }

    getLocation() {

        this.props.getMap(this.props.babyid);
    }


    isOpen() {


        if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
                mapBottom: '13.5rem'
            });

        } else {
            this.setState({
                isOpen: false,
                mapBottom: '4.5rem'
            });
        }

    }

    getBaby(id){
        HttpService.query({
            url: '/app/object/getBaby',
            data: {
                token: localStorage.appToken,
                babyid: id,
                weixinclient:'true'
            },
            success: (res=> {
                console.log(res);
                if (res.code == '10038') {
                    this.setState({
                        babyInfo: {
                            mdtid: res.data.mdtid,
                            telephone: res.data.telephone,
                            endTime: res.data.endtime,
                            babyname:res.data.babyname,
                            userid: res.data.userid,
                            isadmin: res.data.isadmin,
                            authstatus:res.data.authstatus,
                            deviceType:res.data.deviceType,
                            headimg:res.data.headimg,
                            babytelephone:res.data.babytelephone,
                            babyid:res.data.babyid

                        }
                    });

                   // alert(this.state.babyInfo.telephone)
                }
            })
        })
    }

    componentWillReceiveProps(nextProps,nextState){
        debugger;
       if(localStorage.is=='0'){
         //   alert('来了')
           this.getBaby(this.props.babyid);
       }else{
           return
       }


        setTimeout(()=>{
            const {babyInfo} =this.state;
            if(babyInfo.authstatus==0&&babyInfo.isadmin==true&&babyInfo.deviceType=='2'){
                localStorage.is='1';
                this.setState({
                    model:Tool.assign({},this.state.model,{flag:true}),
                })
            }else if(babyInfo.authstatus==1&&babyInfo.isadmin==true&&babyInfo.deviceType=='2'){
                localStorage.is='1';
                this.setState({
                    model:Tool.assign({},this.state.model,{flag1:true}),
                })
            }else if(babyInfo.authstatus==2&&babyInfo.isadmin==true&&babyInfo.deviceType=='2'){
                localStorage.is='1';
                this.setState({
                    model:Tool.assign({},this.state.model,{flag2:true}),

                })
            }else if(babyInfo.authstatus==0&&babyInfo.isadmin==false&&babyInfo.deviceType=='2'){
                localStorage.is='1';
                this.setState({
                    model:Tool.assign({},this.state.model,{flag3:true}),

                })
            }
        },1000);

        //
        // this.getBaby(this.props.babyid)



    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        }

    render() {

        const getCurrenttime = GetCurrentDate.time();

        const {babyInfo} =this.state;

        const {babyName, babytelephone, list, authstatus, babyid, headimg, values, lng, lat, gpstime, getGuardiansList, _checked, relationList, address, isLogin, datasource}=this.props;
        var isOpen = this.state.isOpen;
        var mapHeight = this.state.mapHeight;
        const mapBottom = this.state.mapBottom;
        const checked = this.state.checked;


        let valueType = () => {


            if (values == '0') {
                return <img src={dian} style={{width: '1.3rem', height: '1.1rem', marginLeft: '0'}}/>
            } else if (values == '1') {
                return <img src={dian1} style={{width: '1.8rem', height: '1.1rem', marginLeft: '0'}}/>
            } else if (values == '2') {
                return <img src={dian2} style={{width: '1.8rem', height: '1.1rem', marginLeft: '0'}}/>
            } else if (values == '3') {
                return <img src={dian3} style={{width: '1.8rem', height: '1.1rem', marginLeft: '0'}}/>
            } else if (values == '4') {
                return <img src={dian4} style={{width: '1.8rem', height: '1.1rem', marginLeft: '0'}}/>
            }
        };


        let listItem = list.map((json, index) => {
            return (
                <div className="device-info" key={index}
                     onClick={this._change.bind(this, json.babyname, json.babyid, json.authstatus, json.headimg, json.babytelephone)}>
                    <div className="headimg">

                        {
                            !json.headimg ?
                                <img src={touxiang} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/> :
                                <img src={"/media" + json.headimg} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>
                        }
                    </div>
                    <div className="info">
                        <div className="name">{json.babyname}</div>
                        <div className="time">设备有效日期{json.starttime}</div>
                    </div>

                </div>
            )
        });

        const {model} =this.state;


        return (


            <div>

                {/*设备切换*/}



                {
                    checked == true ?

                        <div>
                            <div className="_z"></div>
                            <div className="layer_content">
                                <div className="header">
                                    <div className="left"></div>
                                    <div className="title">我的设备</div>
                                    <div className="guanbi"><img src={guanbi}
                                                                 style={{width: '2.2rem', height: '2.2rem'}}
                                                                 onClick={this.guanbi.bind(this)}/></div>
                                </div>
                                <div className="layer_content2">
                                    {
                                        listItem
                                    }

                                </div>
                            </div>
                        </div> :
                        null
                }

                {/*是否有设备*/}

                <Model modelConfig={this.modelConfigBabyNone} flag={_checked}/>


                <Model modelConfig={this.modelConfigBabyState0} flag={model.flag}/>
                <Model modelConfig={this.modelConfigBabyState2} flag={model.flag2}/>
                <Model modelConfig={this.modelConfigBabyState1} flag={model.flag1}/>
                <Model modelConfig={this.modelConfigBabyState3} flag={model.flag3}/>


                {/*未登录*/}

                {/*{*/}
                    {/*isLogin == false ?*/}
                        {/*<div>*/}

                            {/*<div className="add-device">*/}

                            {/*</div>*/}
                            {/*<div className="add-device-content">*/}
                                {/*<div className="content">*/}
                                    {/*<div style={{width: '20rem', height: '25rem', position: 'relative'}}>*/}

                                        {/*<img src={lsb} style={{width: '20rem', height: '25rem'}}/>*/}
                                        {/*/!*<img src={dian} alt=""/>*!/*/}

                                        {/*/!*<Link to="/AddDevice">*!/*/}
                                        {/*<div className="_btn btn_btn" style={{bottom: '3rem'}}><a*/}
                                            {/*href="tel:400-655-3588">电话咨询</a></div>*/}
                                        {/*/!*</Link>*!/*/}

                                    {/*</div>*/}


                                {/*</div>*/}

                            {/*</div>*/}
                        {/*</div> :*/}
                        {/*null*/}

                {/*}*/}

                {
                    !!relationList ?

                        <div>
                            <div className="_zz"></div>
                            <div className="layer_content3">
                                <div className="header">
                                    <div className="title">选择成员关系</div>
                                </div>
                                <div className="layer_content4">


                                    {
                                        getGuardiansList.map((json, index) => {
                                            return <div className="row" key={index}
                                                        onClick={this.changeAge.bind(this, json.familystatus)}>

                                                <div className="left">
                                                    {
                                                        json.check == true ?
                                                            <img src={json.img1}/> :
                                                            <img src={json.img}/>
                                                    }

                                                </div>
                                                <div className="right">

                                                    {
                                                        json.title != '家庭' ?

                                                            <div className="one">我是{json.familystatus}</div> :
                                                            <div className="one">{json.familystatus}</div>

                                                    }

                                                    <div className="two">{json.ds}</div>

                                                </div>
                                            </div>
                                        })
                                    }


                                </div>


                            </div>


                        </div> :
                        null

                }


                <div className="box">
                    <div className="box1">

                        {
                            !headimg ?
                                <img src={touxiang} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/> :
                                <img src={"/media" + headimg} style={{
                                    width: '3.4rem',
                                    height: '3.4rem'
                                }}/>
                        }
                    </div>
                    <div className="box2">
                        <div className="babyName">
                            <span className="row1">{babyName}</span>
                            <span className="row2">[最后上报时间]&nbsp;</span>

                            {
                                datasource == '1' ?
                                    <img src={gbs} style={{width: '1.2rem', height: '1.2rem'}}/> :
                                    datasource == '2' ?
                                        <img src={wifi} style={{width: '1.2rem', height: '1.2rem'}}/> :
                                        datasource == '3' ?
                                            <img src={lbs} style={{width: '1.2rem', height: '1.2rem'}}/> :

                                            null

                            }


                            {
                                valueType()
                            }


                        </div>

                        <div className="address">
                            <div className="ss">

                                {
                                    !gpstime ?
                                        <span>{getCurrenttime}</span> :


                                        gpstime.substring(11, 16)
                                }
                                &nbsp;

                                {
                                    !address ?
                                        <span>当前设备未定位!</span> :
                                        <span>{address}</span>

                                }

                            </div>


                        </div>

                    </div>

                    <div className="box3" onClick={this.more.bind(this)}>
                        <img src={qiehuan} style={{width: '2.2rem', height: '3rem'}}/>
                    </div>
                </div>
                <div className="app-kuiji">
                    <Link to={'/about/' + babyid + '/' + lng + '/' + lat + ''}>
                        <img src={lishiguiji} style={{width: '2.3rem', height: '2.3rem'}}/>
                    </Link>
                </div>
                <div id="container" style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: mapBottom,
                    overflow: 'hidden',
                    margin: '0'
                }}>
                </div>

                {
                    isOpen == false ?
                        <div className="little-menu" style={{
                            height: '4.5rem',
                            background: '#fff',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0'
                        }}>
                            <div onClick={this.getLocation.bind(this)}>
                                <img src={dingweixiao} style={{width: '2.1rem', height: '2.1rem'}}/>
                                <div>定位</div>
                            </div>
                            <div onClick={this.isOpen.bind(this)}>
                                <img src={zhankai} style={{width: '2rem', height: '2rem'}}/>
                                <div>展开</div>
                            </div>
                            <div>
                                <a href={"tel:" + babytelephone}>
                                    <img src={tonghuaxiao} style={{width: '2.1rem', height: '2.1rem'}}/>
                                    <div>通话</div>
                                </a>
                            </div>
                        </div>
                        :
                        <div className="menu" style={{
                            height: '13.5rem',
                            background: '#fff',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0'
                        }}>

                            <div className="option" onClick={this.getLocation.bind(this, lng, lat)}>
                                <img src={dingwei} style={{width: '2.3rem', height: '2.3rem'}}/>
                                <div>定位</div>
                            </div>
                            <div className="option">
                                <a href={"tel:" + babytelephone}>
                                    <img src={tonghua} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>通话</div>
                                </a>
                            </div>
                            <div className="option">
                                <Link to={'/App/' + babyid + ''}>
                                    <img src={kaoqin} style={{width: '2.3rem', height: '2.3rem'}}/>

                                    <div>考勤</div>
                                </Link>
                            </div>

                            <div className="option">
                                <Link to={'/about/' + babyid + '/' + lng + '/' + lat + ''}>
                                    <img src={banji} style={{width: '2.3rem', height: '2.3rem'}}/>

                                    <div>班级</div>
                                </Link>
                            </div >
                            <div className="option">
                                <Link to="/demo/0">
                                    <img src={tianjia} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>添加设备</div>
                                </Link>
                            </div>
                            <div className="option">
                                <Link to={'/Safetyarea/' + babyid}>
                                    <img src={anquan} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>安全区域</div>
                                </Link>
                            </div>


                            <div className="option">
                                <Link to={'/Guardian/' + babyid}>
                                    <img src={tongzhi} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>监护成员</div>
                                </Link>
                            </div>


                            <div className="option">
                                <Link to={'/More/' + babyid}>
                                    <img src={more} style={{width: '2.3rem', height: '2.3rem'}}/>
                                    <div>更多</div>
                                </Link>

                            </div>


                            <div className="shouqi" onClick={this.isOpen.bind(this)}>
                                <img src={shouqi} style={{width: '2rem', height: '2rem'}}/>
                                <div>收起</div>
                            </div>


                        </div>
                }

            </div>
        )
    }


}


const mapStateToProps = state => {
    return {
        list: state.login.list,
        babyName: state.login.babyName,
        babyid: state.login.babyid,
        authstatus: state.login.authstatus,
        babytelephone: state.login.babytelephone,
        headimg: state.login.headimg,
        values: state.login.values,
        lng: state.login.lng,
        lat: state.login.lat,
        gpstime: state.login.gpstime,
        getGuardiansList: state.login.getGuardiansList,
        _checked: state.login.checked,
        relationList: state.login.relationList,
        address: state.login.addr,
        datasource: state.login.datasource,
        isLogin: state.login.isLogin,
        exportMap: state.login.exportMap

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin: doLogin,
        doLogin2: doLogin2,
        change: change,
        getOneBabyid: getOneBabyid,
        changeSaveBabyStatus: changeSaveBabyStatus,
        getMap: getMap,
        getCurrentPower: getCurrentPower,
        exportMap: exportMap,
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);


