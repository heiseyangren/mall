/*
 * Filename: c:\LIZHI\moke-mmall\mmall_fe\webpack.config.js
 * Path: c:\LIZHI\moke-mmall\mmall_fe
 * Created Date: Sunday, November 25th 2018, 10:51:17 am
 * Author: -biulyee
 * 
 * Copyright (c) 2018 Your Company
 */
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置dev | online
var WEBPACK_DEV       = process.env.WEBPACK_DEV || 'dev';
//获取HTML-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
};
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'], 
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50&name=resource/[name].[ext]' },
        ]
    },
    plugins : [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',//文件名称
            filename : 'js/base.js'//输出的文件名称
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};
if ('dev' === WEBPACK_DEV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;