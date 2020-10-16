<template>
  <div> 
    <el-form ref="form"  label-width="80px">
      <el-form-item label="文稿纠错"   class="p30">
              <el-switch
                  v-model="value"
                  active-color="#d52324"
                  inactive-color="#d52324">
              </el-switch>
              <span class="tip">识别文稿中的字词、标点、语法等方面的错误</span>  
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="字词错误"   class="p30">
              <el-progress :percentage="3" :format="format" class="mt11" style="color:red;"></el-progress>
      </el-form-item>
      <el-form-item label="标点误用"   class="p30">
              <el-progress :percentage="50" :format="format" class="mt11"></el-progress>
      </el-form-item>
      <el-form-item label="语序问题"   class="p30">
             <el-progress :percentage="55" :format="format" class="mt11"></el-progress>
      </el-form-item>
      <el-form-item label="语法问题"   class="p30">
             <el-progress :percentage="22" :format="format" class="mt11"></el-progress>
      </el-form-item>
      <el-form-item label="同义混淆"   class="p30">
             <el-progress :percentage="43" :format="format" class="mt11"></el-progress>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      form :1,
      value:"",
    }
  },
   methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}个`;
      }
    }
}
</script>
<style scoped>
.p30 {
  padding: 0 30px;
}
.mt11{
  margin-top:11px;
}
.line {
  border-bottom: 1px solid #DCDEE3;
  margin-bottom: 60px;
}
.tip {
  height: 16px;
  display: block;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999999;
  line-height: 16px;
  margin-left: -68px;
}
</style>