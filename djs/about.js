$().ready(function(){
    $.getJSON(ROOTDIR + "/info.json").done(function (data) {
        $(".update-time").html(data.update);
    });
});