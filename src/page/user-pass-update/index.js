require('page/common/nav/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


var page = {
    // 初始化
    init : function(){
        this.onload();
        this.bindEvent();
    },
   onload : function(){
       // 初始化左侧菜单
       navSide.init({
           name : 'user-pass-update'
       });
   },
   bindEvent : function(){
       var _this = this;
       // 是用js渲染的界面，所以无法直接用bindEvent，可以添加事件监听，在冒泡阶段捕获事件
       // input无法继承样式，需要自己添加
       $(document).on('click', '.btn-submit', function(){
        var userInfo = {
            password           : $.trim($('#password').val()),
            passwordNew        : $.trim($('#password-new').val()),
            passwordConfirm    : $.trim($('#password-confirm').val())
        },
        validateResult = _this.validateForm(userInfo);
        if(validateResult.status){
            // 更改用户密码
            _user.updatePassword({
                passwordOld : userInfo.password,
                passwordNew : userInfo.passwordNew
            }, function(res, msg){
                _mm.successTips(msg);
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        }
        else{
            _mm.errorTips(validateResult.msg);
        }
       });
   },
   // 验证字段信息
   validateForm : function(formData){
    var result = {
        status : false,
        msg    : ''
    };
    // 验证原密码是否为空
    if(!_mm.validate(formData.password, 'require')){
        result.msg = '原密码不能为空';
        return result;
    }
    // 验证新密码长度
    if(!formData.passwordNew || formData.passwordNew.length < 6){
        result.msg = '密码长度不能少于六位';
        return result;
    }
    // 验证两次密码是否一致
    if(formData.passwordNew !== formData.passwordConfirm){
        result.msg = '两次输入的密码不一致';
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