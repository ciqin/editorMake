<template>
  <div id="search-result-view" class="row" style="margin: 10px 2px 0px 0px; padding: 10px 0px 0px 5px;overflow:auto" v-infinite-scroll="scrollContent">
       <ul v-if="getContent.length>0">
           <li v-for="item in getContent" :key="item.index">
               <div class="content-list-item-head"> 
                   <div class="head-title">
                        <el-checkbox v-model="checked" style="display:inline-block;" class="checkbox"><i class="el-icon-s-unfold" style="font-size:20px;vertical-align: middle;color:#5b5dc7;margin-right: 6px;"></i><span style="font-size:18px;color:#3d3d3d;font-weight:700;">图片测试</span></el-checkbox>
                        <h4 class="story-title cuttitle" style="overflow:visible;display:inline-block;">
                            <div class="status-area" style="position:static;display: inline-block;padding-left:15px">
                                <a href="javascript:void(0);">
                                    <span class="small text-muted">
                                            <span class="fa fa-user text-success"></span> 
                                            <span style="margin-right: 10px">高红兵</span>
                                            <span style="margin-right: 10px">7/21 11:14</span>
                                            <span class="text-primary">编辑</span>
                                    </span>
                                </a>

                            </div>
                        </h4>
                        <div class="story-meta" style="padding-left:0;position:relative">
                            <span class="smalls" style="padding-right:8px;">
                                <span>更新时间：</span>
                                <span>2020-07-22 15:27</span>
                            </span>
                        </div>
                        <!-- <a  class="pull-left"><img class="img-responsive item-image" src="http://hongqi.wengegroup.com:9080/sprint/stream/stories/workspace/GR5efa9df2e4b063dc27e7152a?attachmentName=thumbnail_1593483042985.png"></a> -->
                        <div class="item-summary">
                            <p class="text-justify" style="padding-top:8px;height:95px;">21321
                                    <span style="display: block;"><a style="padding: 5px 0px;" class="btn btn-sm btn-link">预览</a></span> 
                            </p>
                        </div>
                        <div class="content-list-item-foot">
                            <div class="pull-left action-buttons">
                                        <button name="story-edit" class="btn btn-xs btn-info"><span class="el-icon-edit-outline" style="color: #e98f36;"></span> <span>编辑</span></button>
                                        <button name="story-deliver" class="btn btn-xs btn-info"><span class="el-icon-sort" style="color: #e98f36;"></span> <span>传稿</span></button>
                                        <button name="story-checkin" class="btn btn-xs btn-info"><span class="el-icon-right" style="color: #e98f36;"></span> <span>签入</span></button>
                                        <button name="story-delete" class="btn btn-xs btn-info"><span class="el-icon-delete" style="color: #e98f36;"></span> <span>删除</span></button>
                                        <button name="story-print" class="btn btn-xs btn-info"><span class="el-icon-box" style="color: #e98f36;"></span> <span>打印</span></button>
                            </div>
                        </div>
                   </div>
               </div>
           </li>
       </ul>
       <div v-if="getContent.length<=0" style="text-align: center;margin-top: 16px;">没有满足条件的内容。</div>
  </div>
</template>
<script>
import { store,mutations} from '../../store'
export default {
    data(){
        return {
            checked:false,
            scroll:1
        }
    },
    methods:{
        scrollContent(){
           if(this.scroll >=Math.floor(store.mediaMax/4) || store.listObj.length<=0) return;
           let newArr = [],count=store.listObj[store.listObj.length-1].index;
           this.scroll ++ ;
           for(let i = 0;i<4;i++) {
               count ++
               newArr.push({
                   name:"312",
                   index:count
               })
           }
           mutations.setListObj(store.listObj.concat(newArr))
        }
    },
    computed:{
        getContent(){
            return store.listObj
        }
    }
}
</script>
<style scoped>
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
#search-result-view {
    background: #fafafa;
    overflow: auto;
    height: calc(100vh - 185px);
}
#search-result-view li {
    padding: 10px 40px
}
#search-result-view li:hover{
    background: aliceblue;
}
.status-area {
    top: 0px;
    right: 5px;
    margin-right: 30px;
    font-size: 12px;
    font-style: italic;
}
.status-area a {
    color: #777;
    font-size: 12px;
    font-weight: normal;
    text-decoration-line: none;
    text-decoration-style: solid;
    margin-right: 5px;
    text-rendering: optimizelegibility;
}
.smalls {
    font-size: 85%;
    display: block;
    color: #999;    
    margin: 15px 0;
    font-weight: normal;
}
.content-list-item-foot {
    clear: both;
    line-height: 5px;
    height: 25px;
    margin-bottom: 3px;
    width: 85%;
}
.content-list-item-foot .action-buttons {
    float: left!important;
}
.content-list-item-foot .action-buttons button {
    background: #fff;
    border-color: #d9d9d9;
    color: #444444;
    font-size: 14px;
    box-shadow: none;
    text-shadow: none;
    border-radius: 3px;
    visibility: visible;
    padding: 1px 5px;
    line-height: 1.5;
}
.item-summary {
    height: 60px;
}
.el-checkbox .el-checkbox__inner{
    background: red;
}
</style>