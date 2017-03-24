var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


// 相当于通过本地node服务代理请求
var proxy = [
    // {
    //
    //     path: '/appH5/*',
    //     target: 'http://wx.17find.com/',
    //     host: '222.46.27.218:8800'
    // },
    // {
    //
    //     path: '/appH5/*',
    //     target: 'http://222.46.27.218:8800',
    //     host: '222.46.27.218:8800'
    // },
    {
        path: '/app/*',
        target: 'http://api.17find.com/',
        host: 'api.17find.com'
    },
    {
        path: '/thirdparty/*',
        target: 'http://api.17find.com/',
        host: 'api.17find.com'
    },
    {
        path: '/thirdparty/*',
        target: 'http://api.17find.com/',
        host: 'api.17find.com'
    },
    {
        path: '/app/*',
        target: 'http://wx.17find.com/',
        host: 'api.17find.com'
    },


    {
        path: '/operationapp/*',
        target: 'http://222.46.27.218:8800',
        host: '222.46.27.218:8800'
    },
    {
        path: '/media/*',
        target: 'http://222.46.27.218:8800',
        host: '222.46.27.218:8800'
    },

    {
        path:'/cgi-bin/*',
        target:'https://api.weixin.qq.com',
        host:'https://api.weixin.qq.com'
    }
];

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: proxy
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

server.listen(9527,'172.27.35.6');
// server.listen(9527,'30.6.48.161');



