<template>
  <div class='collect_list'> 
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的模板" name="first">
          <div class='first_nav_top'>
            <ul>
              <li v-for="(item,key) in templatearr" :key = key  :class="{templateactive:key==texttemp}">{{item}}</li>
            </ul>
          </div>
          <div class='third_search' style='padding: 20px 21px 10px 19px;display:flex'>
            <el-input v-model="templateinput" placeholder="请输入关键字(名称,内容)"></el-input>
            <el-button icon="el-icon-search">搜索</el-button>
          </div>
           <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>
        </el-tab-pane>
        <el-tab-pane label="我的素材" name="second">我的素材</el-tab-pane>
        <el-tab-pane label="我的稿件" name="third">我的稿件</el-tab-pane>
      </el-tabs> 
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeName: 'first',
      templatearr:['标题','正文','图文','引导','分割线','二维码','其他'],

    }
  }
}
</script>
<style>
   .collect_list .is-active {
      color: #D72323;
   }
   .collect_list .el-tabs__active-bar{
      width: 112px;
      height: 4px;
      background-color: #D72323;
   }
   .collect_list .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
   }
   .collect_list .el-tabs__item:hover{
     color:#D72323
   }
   .collect_list .el-tabs--top .el-tabs__item.is-top{
      width: 112px;
      text-align: center;
   }
   .collect_list .el-tabs__nav{
     margin-left: 32px;
     height: 60px;
     line-height: 70px;
     font-size: 14px;
   }
</style>
<style scoped>
.htitle{
    height: 60px;
    border-bottom: 4px solid #D72323;
    text-align: center;
    line-height: 60px;
    color: #D72323;
}
 .first_nav_top ul{
   margin-left: 15px;
   overflow: hidden;
 }
 .first_nav_top ul li{
    width:48px;
    height:32px;
    background: #EEF3F9;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    line-height: 32px;
    text-align: center;
    float: left;
    margin:0 2px;
    cursor: pointer;
 }
 .first_nav_top ul .templateactive{
    background: #ffe1e1;
    color: #EA5E5E;
    border-radius: 4px;
    border-radius: 4px;
 }
 .first_texttemp{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 2.2px;
    margin-top: 10px;
    margin-left: 20px;
 }
</style>