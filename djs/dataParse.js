var dp = {
    parse: function (div, json) {
        var objs = div.find("dp");
        for (var x = 0; x < objs.length; x++) {
            var data = $(objs[x]).html();
            var filter = function (obj, data) {
                //Default
                return data;
            };
            if (data.indexOf("|") != -1) {
                filter = data.split("|")[1];
                filter = eval(filter);
                data = data.split("|")[0];
            }
            if (!data.indexOf("$") == 0)continue;
            var ret;
            try {
                ret = eval("json" + data.substring(1));
            } catch (e) {
                ret = "-";
            }
            try {
                ret = filter($(objs[x]), ret);
            } catch (e) {
                ret = "-";
            }
            if (ret == null) {
                ret = "";
            }
            if (typeof(ret.callback) != "undefined") {
                $(objs[x]).show();
                $(objs[x]).html(ret.data);
                ret.callback($(objs[x]), ret);
            } else {
                $(objs[x]).show();
                $(objs[x]).html(ret);

            }

        }
    }
};
var dp_filter_ret = function (data, callback) {
    return {
        data: data,
        callback: callback
    }
};
$.holdReady(true);
$.getScript("djs/filter.js" + "?timestamp=" + new Date().getTime()).done(function () {
    $.holdReady(false);
});
