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
        this.bindEvent();
    },
   onload : function(){
       // 初始化左侧菜单
       navSide.init({
           name : 'user-center'
       });
       // 加载用户信息
       this.loadUserInfo();
   },
   bindEvent : function(){
       var _this = this;
       // 是用js渲染的界面，所以无法直接用bindEvent，可以添加事件监听，在冒泡阶段捕获事件
       // input无法继承样式，需要自己添加
       $(document).on('click', '.btn-submit', function(){
        var userInfo = {
            phone    : $.trim($('#phone').val()),
            email    : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer    : $.trim($('#answer').val())
        },
        validateResult = _this.validateForm(userInfo);
        if(validateResult.status){
            // 更改用户信息
            _user.updateUserInfo(userInfo, function(res, msg){
                _mm.successTips(msg);
                window.location.href = './user-center.html';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        }
        else{
            _mm.errorTips(validateResult.msg);
        }
       });
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
   },
   // 验证字段信息
   validateForm : function(formData){
    var result = {
        status : false,
        msg    : ''
    };
    // 验证手机号是否为空
    if(!_mm.validate(formData.phone, 'phone')){
        result.msg = '手机号格式不正确';
        return result;
    }    
    // 验证邮箱是否为空
    if(!_mm.validate(formData.email, 'email')){
        result.msg = '邮箱格式不正确';
        return result;
    }
    // 验证密保问题是否为空
    if(!_mm.validate(formData.question, 'require')){
        result.msg = '密码提示问题不能为空';
        return result;
    }   
    // 验证密保答案是否为空
    if(!_mm.validate(formData.answer, 'require')){
        result.msg = '答案不能为空';
        return result;
    }   
    // 通过验证, 返回正确提示
    result.status = true;
    result.msg = 'pass';
    return result;
   }
};
// 立即执行函数
// $(function(){
//     page.init();
// }); 
page.init();