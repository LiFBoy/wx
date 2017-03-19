'use strict';

import {HttpService} from '../utils'
export default class wxServer{

    constructor(){

    }

   static createNonceStr(){
        return Math.random().toString(36).substr(2, 15);
    }

   static createTimeStamp(){
        return parseInt(new Date().getTime() / 1000) + '';
    }


   static async wx(noncestr,timestamp){
        const code=await HttpService.save({
            url:'/thirdparty/weixin/getsignature',
            data:{
                url:'http://wx.17find.com/',
                noncestr:noncestr,
                timestamp:timestamp,
                weixinclient:'true'
            }
        });
        console.log(code);

        if(code.code==40002){

            console.log(code.data.appid);
            console.log(code.data.timestamp);
            console.log(code.data.noncestr);
            console.log(code.data.signature);

            wx.config({
                debug: true,
                appId: code.data.appid,
                timestamp: code.data.timestamp,
                nonceStr: code.data.noncestr,
                signature: code.data.signature,
                jsApiList: [
                    'chooseImage',
                    'uploadImage',
                    'chooseWXPay',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'scanQRCode'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }else{
            wx.error(function(res){

                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        }
    }

    static init(){

        const nonceStr=this.createNonceStr();
        const timestamp=this.createTimeStamp();
        this.wx(nonceStr,timestamp)

    }


}
