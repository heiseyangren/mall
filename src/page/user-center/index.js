require('page/common/nav/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string')

var page = {
    // 初始化
    init : function(){
        this.onload();
    },
   onload : function(){
       // 初始化左侧菜单
       navSide.init({
           name : 'user-center'
       });
       // 加载用户信息
       this.loadUserInfo();
   },
   // 加载用户信息
   loadUserInfo : function(){
       var userHtml = '';
       _user.getUserInfo(function(res){
           userHtml = _mm.renderHtml(templateIndex, res);
           $('.panel-body').html(userHtml);
       }, function(errMsg){
           _mm.errorTips(errMsg);
       });
   }
};
// 立即执行函数
// $(function(){
//     page.init();
// }); 
page.init();