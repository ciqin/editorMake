<template>
  <div> 
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h6 class="wordTitle">关联配图</h6>
          <span class="tip">根据文字内容，可自动配图</span> 
      </div>
      
      <div class="line"></div>
      <div style="text-align:center;padding:0 20px;">
        
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  }
}
</script>
<style scoped>
.p30 {
  padding: 0 30px;
}
.line {
  border-bottom: 1px solid #DCDEE3;
  margin-bottom: 60px;
  margin-top: 12px;
}
.wordTitle {
  width: 80px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #666666;
  line-height: 21px;
  margin-bottom: 12px;
}
.tip {
  height: 16px;
  font-size: 12px;
  color: #999999;
  line-height: 16px;
}
</style>