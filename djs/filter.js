
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
	var raNum=parseInt(Math.random()*10);
	var sex="Unknown";
	if(raNum<=2)sex="未知";
	else if(raNum<=4)sex="男";
	else if(raNum<6)sex="女";
	else if(raNum<8)sex="两性";
	else sex="FUTA";
    return sex;
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