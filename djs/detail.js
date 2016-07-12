
var GID;
var DATE;
var COUNT = 0;
var NOW_PAGE = 0;
showDetail = function () {
    var uri = ROOTDIR + DATE + "/result/" + GID + ".json";
    console.log(uri);
    $.getJSON(uri).done(function (data) {
        data['date']=DATE;
        dp.parse($(".guild-detail"), data);
    }).fail(function () {
        errpush("fail to get");
    });
};
showHistoric = function (page) {
    //drawOne("2016-7-11.15.48");

    $.getJSON(ROOTDIR + "/_d.json")
        .done(function (data) {
            NOW_PAGE=page;
            $(".np").html(page);
            if (page == 1)$(".p-forward").hide(); else $(".p-forward").show();
            COUNT = data['count'];
            if (page*10>=COUNT)$(".p-next").hide(); else $(".p-next").show();
            $(".totally").html(COUNT);
            $(".historic-p").remove();
            for (var x = (page - 1) * 10; x < page * 10; x++) {
                if (typeof(data[x]) == "undefined")break;
                drawOne(data[x]);
            }
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
    $(".p-forward").click(function(){
        showHistoric(NOW_PAGE-1);
    });
    $(".p-next").click(function(){
        showHistoric(NOW_PAGE+1);
    });
    GID = GetQueryString("gid");
    DATE = GetQueryString("date");
    showDetail();
    setTimeout(function () {
        showHistoric(1);
    }, 1000);
});

drawOne = function (date) {
    var uri = ROOTDIR + date + "/result/" + GID + ".json";
    $.getJSON(uri).done(function (data) {
        data['date'] = date;
        var tstr = "GREE" + GID + date.replace(/\./g, "-").replace(/\(/g,"").replace(/\)/g,"").replace(/ /g,"");
        var tr = $("<tr></tr>");
        tr.html($(".historic-simple").html());
        tr.addClass(tstr);
        tr.addClass("historic-p");
        tr.appendTo($(".historic"));
        dp.parse($("." + tstr), data);
        tr.show();
        tr.find(".btn-detail").click(function(){
            _go("?gid="+GID+"&date="+date);
        });
    });


};