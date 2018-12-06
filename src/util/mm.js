var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    //请求后端数据
    request : function(param) {
        var _this = this;//获取_mm对象
        //使用jquery的ajax实现
        $.ajax({
            type     : param.method || 'get', //定义请求方法
            url      : param.url    || '',
            dataType : param.type   || 'json', //数据接口
            data     : param.data   || '',
            success  : function(res){
                if(0 === res.status){
                    //0表示请求成功，如果success是function，调用回调
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //没有登录状态，需要强制登陆
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板，将模板与数据进行拼接
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate), //编译
            result   = template.render(data); //渲染
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '操作失败');
    },
    // 字段的验证（非空，手机，邮箱）
    validate : function(value, type){
        var value = $.trim(value); //去掉前后空格，并转化为字符串
        // 非空验证
        if('require' === type){
            return !!value; // 将value转化为boolean，有值返回true，否则返回false
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if('email' === type){
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
        }
    },
    //跳转到登陆界面
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;//模块化_mm