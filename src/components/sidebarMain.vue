<template>
    <div class="sidebar">
        <div id="newProject" style="text-align: center; display: block;">
            <div style="width: 50%;height:50px;line-height:50px;margin:0 auto;cursor:pointer;" @click="newManuscript">
                <i class="el-icon-circle-plus" style="color:#c93931;font-size:26px;vertical-align: middle;"></i>
                <span style="color:#212121;font-size:14px;display: inline-block;position: relative;top: 2px;font-size: 15px;">新建稿件</span>
            </div>
        </div>
        <div class="userworkspace-navi">
            <a href="javascript:void(0);"><strong>我的工作区</strong></a>
        </div>
        <button  class="btn"  @click="newManuscript" style="position: absolute;bottom: 10px;height: 90px;width: 90px;z-index: 10;background: #c93931;border-radius: 50%;box-shadow: 0px 0px 14px rgba(0,0,0,.5);left: calc(50% + 90px);outline: none;"><i class="el-icon-edit" style="font-size: 36px;color: #fff;display: inline-block;"></i></button>
    </div>
</template>
<script>
export default {
    methods:{
        newManuscript(){
            let html = '<div id="" class="manuscript-body"><div class="manuscript-left">'
            let newFile = [{"name":"多媒体稿","icon":"el-icon-s-management","link":"/compo"},
                           {"name":"视频稿","icon":"el-icon-video-camera","link":"/video"}, 
                           {"name":"图集稿","icon":"el-icon-picture","link":"/gallery"},  
                           {"name":"微信组稿","icon":"el-icon-c-scale-to-original","link":"/wechat"},  
                           {"name":"音频稿","icon":"el-icon-mic","link":"/audio"},   
                           {"name":"直播稿","icon":"el-icon-video-camera-solid","link":"/meida"},  
                           {"name":"链接稿","icon":"el-icon-money","link":"/meida"},  
                           {"name":"快讯","icon":"el-icon-collection","link":"/meida"},  
                           {"name":"图片稿","icon":"el-icon-picture-outline","link":"/meida"},
                           {"name":"图表稿","icon":"el-icon-data-analysis","link":"/meida"},
                          ]
            newFile.forEach((item,index)=>{
                html+='<div class="col-md-1-5"><li><a href="'+item.link+'" target="_blank"><span class="'+item.icon+'"></span>'+item.name+'</a></li></div>'
            })
            html +='</div></div>'
            this.$alert(html, '选择稿件类型', {
                dangerouslyUseHTMLString: true,
                // showCancelButton:false,
                showConfirmButton:false
            });
        }
    }
}
</script>
<style>
.sidebar {
    width: 280px;
    float: left;
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    height: calc(100vh - 60px);
    background: #fff;
}
.sidebar .userworkspace-navi a {
    border-radius: 0px;
    border-bottom: 0px solid #999999;
    color: #3C4551;
    background-color: #f5e6e6;
    font-size: 16px;
    padding: 18px 24px;
    position: relative;
    display: block;
}
.el-message-box {
    width: 700px;
}
.manuscript-left {
    flex: 12;
    padding: 0 30px;
    border-right: 1px solid #f2f2f2;
    background: red;;
}
.col-md-1-5 {
    width: calc(20% - 12px);
    float: left;
    position: relative;
    min-height: 1px;
    margin-right: 6px;
    margin-left: 6px;
}
.manuscript-body li {
    height: 160px;
    list-style: none;
    background: #f2f2f2;
    overflow: hidden;
    color: #262626;
    font-size: 16px;
    text-align: center;
    margin-bottom: 12px;
    border-radius: 6px;
    border: 1px solid #f2f2f2;
}
.el-message-box__header {
    border-bottom: 1px solid #e5e5e5;
}
.manuscript-body li a {
    color: #262626;
    font-size: 16px;
    outline: none;
    text-decoration: none;
}
.manuscript-body li span {
    display: block;
    padding: 32px 0;
    font-size: 54px;
    color: #c93931;
    margin: 0 auto;
}
</style>