var ROOTDIR = "https://wdcat.github.io/mthebook/data/";
errpush = function (msg) {
    $(".errpush").show();
    $("<li></li>").html("<code>" + msg + "</code>").appendTo($(".errpush").find("ul"));
};
window.onerror = function (message, source, lineno, colno, error) {
    errpush(message + " source:'" + source + "' lineno:" + lineno + " colno:" + colno + " error:'" + error + "'");
};
GetQueryString = function (name) {
    var gqs = GetQueryString_(name);
    return gqs != null ? gqs.replace(/>/g, "").replace(/</g, "") : null;
};
GetQueryString_ = function (name) { // Copy form others' code
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURI(r[2]);
    return null;
};
formatTime = function (ns) {
    function add0(m) {
        return m < 10 ? '0' + m : m
    }

    if (parseInt(ns) == 0)return "-";
    var time = new Date(ns);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};
_go = function (url) {
    window.location.href = url;
};
JSONLength = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
$().ready(function () {
    var setActiveStyleSheet=function(css){
        var node = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = "css/"+css;
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {

        if (window.location.href.indexOf("?mobile") < 0) {

            try {

                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    // 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry 则加载以下样式
                    setActiveStyleSheet("style_mobile.css");
                }
                else {
                    // 判断访问环境是 其他移动设备 则加载以下样式
                    setActiveStyleSheet("style.css");
                }
            }
            catch (e) {
            }
        }
    }
    else {
        setActiveStyleSheet("style.css");
    }
    if (typeof(jQuery.fn.dataTableExt) != "undefined")
        jQuery.extend(jQuery.fn.dataTableExt.oSort, {
            "num-pre": function (a) {
                var x = String(a).replace(/<[\s\S]*?>/g, "");
                x = x.replace(/&amp;nbsp;/ig, "");
                return parseInt(x);
            },

            "num-asc": function (a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            },

            "num-desc": function (a, b) {
                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            }
        });
    $(".ryrx").parent().hover(function(){
        $(this).find(".ryrx").show();
    },function(){
        $(this).find(".ryrx").hide();
    });
    $(".swap").click(function(){
        eval("更换会长();");
    });
});