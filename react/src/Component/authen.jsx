'use strict';

import React, {Component, PropTypes} from 'react';

import cardback from '../img/authen/cardback.jpg'
import cardfont from '../img/authen/cardfont.jpg'
import idcard from '../img/authen/idcard.png'
import name from '../img/authen/name.png'

import {R_header} from './common/index'

import Model from './common/model'

import reason from '../img/more/reason.png'

import {HttpService,Toast,Tool} from '../utils'

class Authen extends React.Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(){
        super();

        this.state={
            model:{

            },

            uploadImg:{

            }

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

    uploadImgFromAlbum(cb) {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (preRes) {
            wx.uploadImage({
                localId: preRes.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (mediaRes) {
                    return cb(preRes.localIds[0], mediaRes.serverId)
                },
                fail: function (res) {
                  //  alert(JSON.stringify(res));
                }
            });
        },
        fail: function (res) {
           // alert(JSON.stringify(res));
        }
    });
}

    deleteImg(type){
        if(type==1){
            this.setState({
                uploadImg:Tool.assign({},this.state.uploadImg,{localIds:'',frontServerId:''})

            });
        }else{
            this.setState({
                uploadImg:Tool.assign({},this.state.uploadImg,{localIdsBack:'',backServerId:''})

            });
        }

    }

    uploadImgBack(){

        this.uploadImgFromAlbum((localIds,serverId)=>{

            wx.getLocalImgData({
                localId: localIds, // 图片的localID
                success:  (res)=> {
                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    this.setState({
                        uploadImg: Tool.assign({},this.state.uploadImg,{localIdsBack:localData,backServerId:serverId})
                    });
                }
            });

        })

    }

    uploadImg(){

        this.uploadImgFromAlbum((localIds,serverId)=>{

            wx.getLocalImgData({
                localId: localIds, // 图片的localID
                success:  (res)=> {
                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    this.setState({
                        uploadImg:Tool.assign({},this.state.uploadImg,{localIds:localData,frontServerId:serverId})

                    });
                }
            });

        })


    }


    async auth(){

        const code=await HttpService.save({
            url:"/thirdparty/weixin/saveUserAuthinfo",
            data:{
                token:localStorage.appToken,
                devicetelephone:this.props.params.phone,
                username:this.refs.username.value,
                idcard:this.refs.idcard.value,
                backServerId:this.state.uploadImg.backServerId,
                frontServerId:this.state.uploadImg.frontServerId
            }
        });

        if(code.code==50006){
            Toast.toast('提交成功',3000);
            // localStorage.is=='0'

            this.context.router.push('/map/' + localStorage.appToken+'/'+localStorage.userid);

        }else {
            Toast.toast(code.msg,3000)
        }

    }

    render(){
        const {model,uploadImg} =this.state;
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
                            <input type="text" className="app-333-font28" ref="username" placeholder="请输入您的真实姓名"/>
                        </div>
                    </div>
                    <div className="step app-white-chunk border-bottom">
                        <div className="s-flex-zero app-padding-lr24">
                            <img src={idcard} className="app-headerImg"/>
                        </div>
                        <div className="s-flex2">
                            <input type="text" className="app-333-font28" ref="idcard" placeholder="请输入您的身份证"/>
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
                            {
                                !!uploadImg.localIds?<div className="app-delete" onClick={this.deleteImg.bind(this,1)}>删除</div>:
                                    <div className="app-upload" onClick={this.uploadImg.bind(this)}>上传</div>
                            }


                            {/*<img src="wxLocalResource://511604193101380" className="app-all-img"/>*/}

                            <div style={{height:'100px'}}>
                            {
                                !!uploadImg.localIds?<img src={uploadImg.localIds} className="app-all-img"/>:
                                    <img src={cardfont} className="app-all-img"/>
                            }

                            </div>
                            {/*<img src={cardback} className="app-all-img"/>*/}

                        </div>
                    </div>
                </div>

                    <div className="s-flex1">
                        <div className="step s-flex-d">
                            <div className="app-textAlgin app-333-font24">反面照片</div>
                            <div className="card">
                                {
                                    !!uploadImg.localIdsBack?<div className="app-delete" onClick={this.deleteImg.bind(this,2)}>删除</div>:
                                        <div className="app-upload" onClick={this.uploadImgBack.bind(this)}>上传</div>
                                }


                                {/*<img src="wxLocalResource://511604193101380" className="app-all-img"/>*/}

                                <div style={{height:'100px'}}>
                                    {
                                        !!uploadImg.localIdsBack?<img src={uploadImg.localIdsBack} className="app-all-img"/>:
                                            <img src={cardback} className="app-all-img"/>
                                    }

                                </div>
                                {/*<img src={cardback} className="app-all-img"/>*/}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="app-yellow-radius-check-button app-btn app-margin-lr40 app-margin-t30" onClick={this.auth.bind(this)}>
                    {/*<input className="s-center" type="submit" readOnly="readOnly" value="登录"/>*/}

                    <div className="s-center">提交认证审核</div>
                </div>
            </div>
        )
    }

}



export default  Authen;