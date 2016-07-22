var RATING_JSON, DETAIL_JSON;
mahjong = {
    prepare: function (callback) {
        if ($(".div-mahjong").length >= 1) {
            callback();
            return;
        }
        $.get("mahjong.html").done(function (data) {
            $("body").append(data);
            callback(data);
        }).fail(function (e) {
            errpush("Fail to load Mahjong table." + e);
        });
    },
    load: function (battle, gid, date, callback) {
        $(".mj-date").html(date.split(".")[0]);
        $.getJSON(ROOTDIR + "/" + date + "/mahjong.json").done(function (data) {
            if (typeof(data[battle]) == "undefined") {
                errpush("并没有会战记录：" + battle + "---" + gid);
                return;
            }
            $(".mahjong-p").remove();
            $.getJSON(ROOTDIR + "/" + date + "/rating.json").done(function (r) {
                RATING_JSON = r;
                drawBattle(0, data[battle], date, function () {
                    applytheme();
                    callback();
                });

            }).fail(function () {
                RATING_JSON = [];
                drawBattle(0, data[battle], date, function () {
                    applytheme();
                    callback();
                });
            });

        }).fail(function () {
            errpush("data not found:" + gid);
        });

    },
    show: function () {
        $(".mahjong-dialog-show").click();
    },
    hide: function () {
        $(".mahjong-dialog-close").click();
    }
};
$.holdReady(true);
mahjong.prepare(function () {
    $.holdReady(false);
});
drawBattle = function (x, data, date, callback) {
    if (x >= data.length || typeof(data[x]) == "undefined") {
        callback();
        return;
    }
    drawBattle_(data, x, date, function (xx) {
        drawBattle(xx + 1, data, date, callback);
    });

};
drawBattle_ = function (data, x, date, callback) {
    var uri = ROOTDIR + date + "/result/" + data[x] + ".json";
    var gid = data[x];
    $.getJSON(uri).done(function (d) {
        var tstr = "GREE" + gid + date.replace(/\./g, "-").replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "");
        var tr = $("<tr></tr>");
        tr.html($(".mahjong-simple").html());
        tr.addClass(tstr);
        tr.addClass("mahjong-p");
        tr.appendTo($(".tbody-mahjong"));
        dp.parse($("." + tstr), d);
        try {
            drawBattleRank($("." + tstr), gid, date);
        } catch (e) {
        }
        tr.show();
        callback(x);
    }).fail(function () {
        errpush("--");
    });
};
drawBattleRank = function (obj, gid, date) {
    obj.find(".t").attr("href", "detail.html?gid=" + gid + "&date=" + date);
    obj.find(".brating").html(RATING_JSON[gid]["t"]);
    obj.find(".arating").html(RATING_JSON[gid]["n"]);
    obj.find(".rank").html(calcRank(RATING_JSON[gid]["t"], RATING_JSON[gid]["n"]));

};