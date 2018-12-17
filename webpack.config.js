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
var getHtmlConfig = function(name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name] //添加需要加载的js文件
    };
};
//webpack config
var config = {
    entry: {
        'common'          : ['./src/page/common/index.js'], 
        'index'           : ['./src/page/index/index.js'],
        'user-login'      : ['./src/page/user-login/index.js'],
        'user-register'   : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-center'     : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'result'          : ['./src/page/result/index.js']
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
            { test: /\.string$/, loader: 'html-loader'} 
        ]
    },
    //配置寻找模块的规则
    resolve : {
        alias : {
            node_modules   : __dirname + '/node_modules',
            util           : __dirname + '/src/util',
            page           : __dirname + '/src/page',
            service        : __dirname + '/src/service',
            image          : __dirname + '/src/image'
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};
if ('dev' === WEBPACK_DEV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;