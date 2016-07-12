
var dp={
        parse:function(div,json){
            var objs=div.find("dp");
            for(var x=0;x<objs.length;x++){
                var data=$(objs[x]).html();
                var filter=function(obj,data){
                    //Default
                    return data;
                };
                if(data.indexOf("|")!=-1){
                    filter=data.split("|")[1];
                    filter=eval(filter);
                    data=data.split("|")[0];
                }
                if(!data.indexOf("$")==0)continue;
                var ret;
                try {
                    ret = eval("json" + data.substring(1));
                }catch(e){
                    ret="<code>Err.</code>";
                }
                ret=filter($(objs[x]),ret);
                $(objs[x]).html(ret);
            }
        }
};
$.holdReady(true);
$.getScript("djs/filter.js").done(function(){
    $.holdReady(false);
});
