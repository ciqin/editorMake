<template>
  <div class='nav_top_articleedit'> 
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关联文章" name="first">关联文章</el-tab-pane>
        <el-tab-pane label="知识图谱" name="second">知识图谱</el-tab-pane>
        <el-tab-pane label="热文分析" name="third">热文分析</el-tab-pane>
        <el-tab-pane label="智能报告" name="fourth">智能报告</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
export default {
     data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style>
  .nav_top_articleedit .el-tabs__nav{
    width: 100%;
  }
  
  .nav_top_articleedit .el-tabs__nav .el-tabs__item{
      padding: 0;
      width: 25%;
      text-align: center;
      line-height: 45px;
   }
   .nav_top_articleedit .el-tabs__nav .is-active{
     color: brown;
     line-height: 40px;
   }
</style>
<style scoped>
</style>