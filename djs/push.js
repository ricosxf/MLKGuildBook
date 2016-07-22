$.snackbar({
    content: "Some text", // text of the snackbar
    style: "toast", // add a custom class to your snackbar
    timeout: 100 // time in milliseconds after the snackbar autohides, 0 is disabled
});
$().ready(function () {
    if (GetQueryString("date") == null) {
        console.log("script loaded.");
        $.get("push.html").done(function (e) {
            console.log("html loaded.");
            $("body").append(e);
            push_msg();
            $(".snackbar").css({"opacity": "0.7"});
            $(".snackbar-content").append("<br><font color='#777777'>(来自地龙触点推广)</font>").css({"font-size": "12px"});
        });
    }
});
push_msg = function () {
    var p = $(".push-msg").find("span");
    for (var x = 0; x < p.length; x++) {
        $.snackbar({
            content: $(p[x]).html(),
            style: "snackbar",
            timeout: 0
        });
    }
};