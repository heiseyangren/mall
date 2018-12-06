require('./index.css');

var _cart = require('service/cart-service.js');
var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');
var nav   = {
    // 初始化
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;  // 返回的是nav
    },
    // 登录，退出
    bindEvent : function(){
        // 登陆点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        // 推出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
              window.location.reload();  
            }, function(errMsg){
                _mm.errTips(errMsg);
            });
        });
    },
    // 读取用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
           $('.user.not-login').hide().siblings('.user.login').show()
             .find('username').text(res.username);  
        }, function(errMsg){
            _mm.errTips(errMsg);
        });
    },
    // 读取购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);  
         }, function(errMsg){
            $('.nav .cart-count').text(0);
         });
    }
};

module.exports = nav.init();