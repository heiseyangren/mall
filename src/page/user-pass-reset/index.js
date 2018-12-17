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
    //保存用户输入以及从服务端获取的信息
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    // 初始化
    init : function(){
        this.onload();
        this.bindEvent();
    },
    // 页面加载后，显示class="step-username"输入框
    onload : function(){
        this.loadStepUsername();
    },
    // 提交登陆，调用submit
    bindEvent : function(){
        // this放在了jquery对象里，需要一个引用
        var _this = this;
        // 输入用户名点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    // res是用户名存在时，后端返回的提示问题
                    _this.data.question = res;
                    // 调用密码提示问题界面
                    _this.loadSteQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show("请输入用户名");
            }
        });
        // 密码提示问题答案点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 答案存在
            if(answer){
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    _this.data.answer = answer;
                    // res是用户名存在时，后端返回的提示问题
                    _this.data.token = res;
                    // 调用密码提示问题界面
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show("请输入密码提示问题答案");
            }
        });
         // 输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码是否为空
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function(res){
                   window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show("请输入不少于六位的新密码");
            }
        });
    },
    // 显示class="step-username"输入框
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 显示class="step-question"输入框
    loadSteQuestion : function(){
        // 隐藏错误提示
        formError.hide();
        // 做容器切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 显示class="step-password"输入框
    loadStepPassword : function(){
        // 隐藏错误提示
        formError.hide();
        // 做容器切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
};
// 立即执行函数
// $(function(){
//     page.init();
// }); 
page.init();