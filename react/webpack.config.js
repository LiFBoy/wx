var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var publicPath = '/dist/'; //服务器路径

var plugins = [];

// if (process.argv.indexOf('-p') > -1) { //生产环境
//     plugins.push(new webpack.DefinePlugin({ //编译成生产版本
//         'process.env': {
//             NODE_ENV: JSON.stringify('production')
//         }
//     }));
//     publicPath = '/react-cnode/dist/';
//     path = __dirname + '/react-cnode/dist/';
// }
// plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false, drop_console: true}}));//代码压缩

 //
 //
 // plugins.push(new webpack.optimize.UglifyJsPlugin());//代码压缩
 // plugins.push(
 //     new webpack.DefinePlugin({
 //     'process.env': {
 //         'NODE_ENV': JSON.stringify('production')
 //     }
 // }));



 plugins.push(new webpack.optimize.DedupePlugin());
 plugins.push(new webpack.optimize.OccurenceOrderPlugin());

plugins.push(new ExtractTextPlugin('css/[name].css')); //css单独打包
plugins.push(new webpack.HotModuleReplacementPlugin());//热替换
plugins.push(new HtmlWebpackPlugin({
        filename: '../index.html', //生成的html存放路径，相对于 path
        template: './src/Template/index.html', //html模板路径
        hash: true,
        //为静态资源生成hash值
        chunks: ['index', 'vendors'],
        inject: 'body'
    })
);

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk chunks: chunks, minChunks: chunks.length // 提取所有entry共同依赖的模块 }),
    minChunks: Infinity
}));
module.exports = {
    entry: {
        index: [
            './src/index'
        ]
    },
    output: {
        publicPath: publicPath, //编译好的文件，在服务器的路径
        path: path.join(__dirname, 'dist'), //编译到当前目录
        filename: '[name].js'
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "redux": "Redux",
        "react-redux": "ReactRedux",
    },
     devtool: 'source-map',
    module: {
        loaders: [

            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel',
                query:{compact:false}
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.scss/,
                exclude: /^node_modules$/,

                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!scss-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            },

            {
                test: /\.(js|css|less)$/,
                loader: 'webpack-px-to-rem',
                //这个配置是可选的
                query: {
                    // 1rem=npx 默认为 10
                    basePx: 20,
                    //只会转换大于min的px 默认为0
                    //因为很小的px（比如border的1px）转换为rem后在很小的设备上结果会小于1px，有的设备就会不显示
                    min: 1,
                    //转换后的rem值保留的小数点后位数 默认为3
                    floatWidth: 3
                }
            },

            //
            // {
            //     test: /\.(png|jpg)$/,
            //     exclude: /^node_modules$/,
            //     loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            // },


            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=25000' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },

            // {test: /\.(png|jpg)$/, exclude: /^node_modules$/,loader: 'base64-inline-loader'},


            {
                loader: "babel-loader",

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src"),
                ],

                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,

                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'] //后缀名自动补全
    },
};
