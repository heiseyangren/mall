require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
require('page/common/nav-simple/index.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// 业务复杂时，建立对象进行处理，page逻辑部分
// 点登录获取用户名密码，并验证是否合规，如果合规提交到后端，成功后redirect进行页面跳转，失败提示err框
// 
var page = {
    // 初始化
    init : function(){
        this.bindEvent();
    },
    // 提交登陆，调用submit
    bindEvent : function(){
        // this放在了jquery对象里，需要一个引用
        var _this = this;
        // 登录按钮点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车也进行提交
        $('.user-content').keyup(function(e){
            // keyCode==13表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单,用js伪造，并没有form
    submit : function(){
        // 获取数据
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            // 提交
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 提示
            formError.show(validateResult.msg);
        }
    },
    // 表单验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
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