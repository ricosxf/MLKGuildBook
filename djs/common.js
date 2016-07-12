
var ROOTDIR = "https://wdcat.github.io/mthebook/data/";
errpush = function (msg) {
    alert(msg);
};
GetQueryString = function (name) {
    return GetQueryString_(name)//.replace(/>/g,"").replace(/</g,"");
}
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
function JSONLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
$().ready(function () {
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
});