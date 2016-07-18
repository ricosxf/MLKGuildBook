var DATE_INDEX = 0;
var SEARCH_DONE = false;
var DRAW_BUSY = false;
var FOUND_COUNT = 1;
var DRAWED_COUNT = 0;

$().ready(function () {

    $.getJSON(ROOTDIR + "/d.json" + "?timestamp=" + new Date().getTime())
        .done(function (data) {
            DATE_INDEX = data;
            var keyword = GetQueryString("keyword");
            var sure;
            try {
                sure = parseInt(GetQueryString("sure"));
            } catch (e) {
                sure = 0;
            }
            if (keyword != null) {
                $("#searchbox").val(keyword);
                if (keyword.length == 0 && sure != 1) {
                    $(".big-warn").show();
                    $(".yes").click(function () {
                        $(".big-warn").hide();
                        setTimeout(function () {
                            search(keyword);
                        }, 10);
                        $(".search-result").show();
                    });
                } else {
                    setTimeout(function () {
                        search(keyword);
                    }, 10);
                    $(".search-result").show();
                }
            }

        });

});
search = function (keyword) {
    FOUND_COUNT = 0;
    DRAWED_COUNT = 0;
    $(".tbody-loading").show();
    $(".loading-msg").html("正在查找...");
    //$("#loading-progress").css({width:"100%"});
    console.log("search:" + keyword);
    $.getJSON(ROOTDIR + "/index.json" + "?timestamp=" + new Date().getTime()).done(function (data) {
        var length = JSONLength(data);
        var count = 0;
        $.each(data, function (k, v) {
            count++;
            try {
                if (JSON.stringify(v).toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
                    FOUND_COUNT++;
                    setTimeout(function () {
                        drawOne(k, 0, function () {
                            if (SEARCH_DONE && !DRAW_BUSY && DRAWED_COUNT == FOUND_COUNT) {
                                $(".tbody-loading").hide();
                                $("table").show();
                                $("table").DataTable({
                                    "aoColumnDefs": [
                                        {"sType": "num", "aTargets": [5, 6, 7, 8]}
                                    ],
                                    "language": {
                                        "search": "",
                                        "searchPlaceholder": "筛选",
                                        "thousands": ",",
                                        "lengthMenu": "每页显示 _MENU_ 个结果",
                                        "info": "第 _PAGE_ 页，共 _PAGES_ 页",
                                        "paginate": {
                                            "first": "第一页",
                                            "last": "最后一页",
                                            "next": "下一页",
                                            "previous": "上一页"
                                        }

                                    },
                                    "aLengthMenu": [[15, 20, 50, -1, 0], [15, 20, 50, "所有", "无限剑制"]],
                                    'iDisplayLength': 15
                                });
                            }
                        }, 1);
                    });
                }
                if (count == length - 1) {
                    if (FOUND_COUNT == 0) {
                        $(".loading-msg").html("找不到指定的公会..喵呜~<br>PS:曾用名只记录有7月12日之后的喵~");
                    } else {

                        SEARCH_DONE = true;
                        $(".loading-msg").html("正在加载数据(数据过多时可能会有迷之卡顿,请耐心等待喵~)...");
                    }

                }
            } catch (e) {
                console.error(e);
            }
        });
    }).fail(function () {
        errpush("获取索引失败。");
    });
};
var DDP = 0;
drawOne = function (gid, tDateIndex, callback) {
    DRAW_BUSY = true;
    if (typeof(DATE_INDEX["" + tDateIndex]) == "undefined") {
        errpush("Unknown Error." + tDateIndex);
        return;
    }
    //$(".loading-gid").html(gid);
    DDP++;

    if (DDP == 10) {
        $("#loading-progress").css({width: "" + ((DRAWED_COUNT / FOUND_COUNT) * 100) + "%"});
        DDP = 0;
    }
    setTimeout(function () {
        drawOneByDate(gid, DATE_INDEX["" + tDateIndex], function (succ) {
            if (!succ) {
                drawOne(gid, tDateIndex + 1, callback);
            } else {
                DRAW_BUSY = false;
                DRAWED_COUNT++;
                callback();
            }
        });
    }, 1);
};
drawOneByDate = function (gid, date, callback) {
    var uri = ROOTDIR + date + "/result/" + gid + ".json";
    $.getJSON(uri).done(function (data) {
        var tstr = "" + gid + "".replace(/\./g, "-").replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "");
        data.date = date;
        var tr = $("<tr></tr>");
        tr.html($(".historic-simple").html());
        tr.addClass(tstr);
        tr.addClass("historic-p");
        tr.show();
        tr.find(".btn-detail").click(function () {
            window.open("detail.html?gid=" + gid + "&date=" + date);
        });
        tr.appendTo($(".historic"));
        dp.parse($("." + tstr), data);
        callback(true);
    }).fail(function () {
        callback(false);
    });


};