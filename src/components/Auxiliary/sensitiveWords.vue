<template>
  <div> 
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h6 class="wordTitle">敏感词分析</h6>
          <span class="tip">识别文本中涉黄、涉政或其他违禁等敏感词汇</span> 
      </div>
      
      <div class="line"></div>
      <div style="text-align:center;padding:0 20px;">
         <el-button type="primary" size="mini" style="background: #303841;border:none;">主要按钮</el-button>
         <div>
           <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%;margin-top:40px;">
              <el-table-column
                prop="date"
                label="类别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="敏感句"
                width="100">
              </el-table-column>
               <el-table-column label="操作">
                <template>
                  <el-button size="mini" style="background: #303841;border:none;color:#fff;">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
         </div>
         
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      tableData: [{
            date: '涉黄',
            name: '12句',
            address: '上海市普'
          }, {
            date: '涉政',
            name: '12句',
            address: '上海市普陀'
          }, {
            date: '暴恐',
            name: '12句',
            address: '上海市普陀区'
          }, {
            date: '其他违禁敏感词',
            name: '12句',
            address: '上海市普'
          }]
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