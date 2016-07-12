$().ready(function(){
    $.getJSON(ROOTDIR + "/_info.json").done(function (data) {
        $(".update-time").html(data.update);
    });
});