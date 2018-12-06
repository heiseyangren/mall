require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
    // 显示对应的提示元素
        $element = $('.' + type + '-success').show();
})