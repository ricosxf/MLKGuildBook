
filter_guild_rank_id=function (obj,data){
    switch(data){
        case 0:
            return "B";
        case 1:
            return "A";
        case 2:
            return "S";
        case 3:
            return "S+";
        case 4:
            return "SS";
        default:
            return data;
    }
};
filter_get_sex_by_name=function(obj,data){
    return ["不知道喵","男","妹纸","女","不知道喵","FUTA","两性","不知道喵","不知道喵","不是妹子","==="][parseInt(Math.random()*10)];
};
filter_hash=function(obj,data){
    return $.md5(data);
};
filter_boolean=function(obj,data){
    return data==true?"开":"关";
};
filter_date=function(obj,data){
    try{
        return data.split(".")[0]+" "+data.split(".")[1]+":"+data.split(".")[2];
    }catch(e){
        return data;
    }
};
filter_date_mlk=function(obj,data){
    if(data.indexOf("T")!=-1){
        data=data.replace(/T/g," ");
        data=data.replace(/\+08:00/g," ");
    }
    return data;
};