'use strict';

import {HttpService} from '../utils'


import $ from 'jquery';
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

        if(code.code==50006){
          //  alert('laile');

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
       // this.wx(nonceStr,timestamp)

    }

    static wxlogin(){
      //  this.oauth2();
        //this.au();
      // this.a()
        // this.login();
    }




    static async oauth2(){
        var url=encodeURIComponent('https://wx.17find.com/');
        console.log(url);
        const code=await HttpService.query({
            url:'/connect/oauth2/authorize',
            data:{
                appid:'wx85577a457cfcd222',
                redirect_uri:url,
                response_type:'code',
                scope:'snsapi_base',
                state:'123#wechat_redirect'
            }
        });

        console.log('sss'+code);

        if(!!code){
            alert(JSON.stringify(code))
        }
    }

    static name(name){

            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;

    }

    static async  a(){

      //  alert(window.location.href)






       // alert()
        // const code= await HttpService.query({
        //     url:'/thirdparty/weixin/wxlogin',
        //     data:{
        //         weixinclient:'true',
        //         redirect_uri:'https//wx.17find.com/test2.html'
        //     }
        // })


    }



}
