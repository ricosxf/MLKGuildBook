var GID;
var DATE;
var COUNT = 0;
var NOW_PAGE = 0;
var NOW_DATE;
showDetail = function () {
    var uri = ROOTDIR + DATE + "/result/" + GID + ".json" + "?timestamp=" + new Date().getTime();
    console.log(uri);
    $.getJSON(uri).done(function (data) {
        data['date'] = DATE;
        NOW_DATE = DATE;

        if (data["data"]["version"] == null) {
            data["data"]["version"] = 1;
        }
        console.log("version:" + data["data"]["version"]);
        $.get("detail.v" + data["data"]["version"] + ".html").done(function (e) {
            $(".guild-detail").html(e);
            $(".HZtx").attr("src", "http://bbtfr.github.io/MerusutoChristina/data/units/icon/" + data.data.search_index_temp.master_leader_unit_id + ".png");
            if (typeof(data["data"]["search_index_temp"]["shifts"]) != "undefined") {
                $(".hzsj").show();
            }
            dp.parse($(".guild-detail,.guild-header"), data);
        }).fail(function () {
            errpush("加载失败TAT");
        });

    }).fail(function () {
        errpush("加载数据失败，请重试");
    });
};
showHistoric = function (page) {
    //drawOne("2016-7-11.15.48");
    $.getJSON(ROOTDIR + "/d.json" + "?timestamp=" + new Date().getTime())
        .done(function (data) {
            NOW_PAGE = page;
            $(".np").html(page);
            if (page == 1)$(".p-forward").hide(); else $(".p-forward").show();
            COUNT = data['count'];
            if (page * 15 >= COUNT)$(".p-next").hide(); else $(".p-next").show();
            $(".totally").html(COUNT);
            $(".historic-p").remove();
            var loader = function (now) {
                if (now >= page * 15) {
                    return;
                }
                if (typeof(data[now]) == "undefined")return;
                else drawOne(data[now], function () {
                    loader(now + 1);
                });
            };
            loader((page - 1) * 15);
            /*
             $('#historic-table').DataTable({
             "aoColumnDefs": [
             { "sType": "num", "aTargets": [5,6,7,8] }
             ],
             "language": {
             "search": "",
             "searchPlaceholder":"筛选",
             "thousands":",",
             "lengthMenu": "每页显示 _MENU_ 个结果",
             "info": "第 _PAGE_ 页，共 _PAGES_ 页",
             "paginate":{
             "first":"第一页",
             "last":"最后一页",
             "next":"下一页",
             "previous":"上一页"
             }

             },
             "aLengthMenu": [[15, 20, 50, -1,0], [15, 20, 50, "所有","无限剑制"]],
             'iDisplayLength': 15
             });*/
        })
        .fail(function () {
            errpush("获取日期详情失败。");
        });
};
$().ready(function () {
    $(".p-forward").click(function () {
        showHistoric(NOW_PAGE - 1);
    });
    $(".p-next").click(function () {
        showHistoric(NOW_PAGE + 1);
    });
    GID = GetQueryString("gid");
    DATE = GetQueryString("date");
    window.history.replaceState(null, null, "?date=" + DATE + "&gid=" + GID + "&from=url&ts=" + (new Date()).getTime());
    showDetail();
    setTimeout(function () {
        showHistoric(1);
    }, 1000);
});
calcRank = function (lrank, nrank) {
    var scTableA = {
        1: [80, 72, 64, 56, 48, 40, 32, 24, 16, 8],
        2: [40, 34, 28, 22, 16, 10, 4]
    };
    var scTableB = {
        2: [-2, -8, -14],
        3: [-10, -14, -18, -22, -26, -30, -34, -38, -42, -46],
        4: [-60, -62, -64, -66, -68, -70, -72, -74, -76, -78]
    };
    var rou = nrank - lrank;
    if (rou > 0) {
        if (rou == 40)
            return lrank % 1000 < 100 ? 2 : 1;
        if (rou == 16)
            return lrank % 1400 < 100 ? 2 : 1;
        for (var x = 1; x <= 2; x++) {
            for (var y = 0; y < scTableA[x].length; y++) {
                if (rou == scTableA[x][y])return x;
            }
        }
        return "Err.a";
    } else if (rou < 0) {
        for (var x = 2; x <= 4; x++) {
            for (var y = 0; y < scTableB[x].length; y++) {
                if (rou == scTableB[x][y])return x;
            }
        }
        return "Err.b";
    } else {
        return "-";
    }
};
var CR_LRANK = null;
drawOne = function (date, callback) {
    var uri = ROOTDIR + date + "/result/" + GID + ".json";
    $.getJSON(uri).done(function (data) {
        data['date'] = date;
        var tstr = "GREE" + GID + date.replace(/\./g, "-").replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "");
        var tr = $("<tr></tr>");
        tr.html($(".historic-simple").html());
        tr.addClass(tstr);
        tr.addClass("historic-p");
        tr.appendTo($(".historic"));
        dp.parse($("." + tstr), data);
        try {
            var nrank = parseInt(data.data.guild_temp.rating);
            if (CR_LRANK != null) {
                tr.find(".HZrank").html(calcRank(nrank, CR_LRANK));
            }
            CR_LRANK = nrank;
        } catch (e) {
            errpush(e);
            console.error(e);
        }
        tr.show();
        if (date == NOW_DATE) {
            tr.addClass("warning").find(".btn-detail").html("-");
        }
        tr.find(".btn-detail").click(function () {
            _go("?gid=" + GID + "&date=" + date);
        });
        tr.find(".btn-mahjong").click(function () {
            mahjong.load(data["data"]["guild_temp"]["battle_id"], data["data"]["guild_temp"]["id"], date, function () {
                mahjong.show();
            });

        });
        setTimeout(function () {
            callback();
        }, 1);
    }).fail(function () {
        setTimeout(function () {
            callback();
        }, 1);
    });


};