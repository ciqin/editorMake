<template>
  <div> 
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h6 class="wordTitle">文稿纠错</h6>
          <span class="tip">识别文稿中的字词、标点、语法等方面的错误</span> 
      </div>
      
      <div class="line"></div>
      <div style="text-align:center;padding:0 20px;">
         <el-button type="primary" size="mini" @click="sensitiveWords" style="background: #303841;border:none;">开始分析</el-button>
         <el-button type="primary" size="mini" @click="clearWords" style="background: #303841;border:none;">一键清除样式</el-button>
         <div>
           <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%;margin-top:40px;" class="correction">
              <el-table-column
                prop="date"
                label="错误字词"
                width="120" align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="错误原因" align="center">
              </el-table-column>
            </el-table>
         </div>
         
      </div>
    </el-form>
  </div>
</template>
<script>
import {sensitivityAnalysis} from '@/http/api'
import { store } from '@/store'
export default {
  created(){
    getJson({aaa:true,id:111}).then(res => {
        // this.productArr = res
    })
  },
  data(){
    return {
      tableData: [{
            date: '无',
            name: '无',
          }]
    }
  },
  methods:{
    sensitiveWords(){
      if(store.ueditor) {
          let data = {
            "checkType": 1,"text": store.ueditor.getContent()
          }
          sensitivityAnalysis(data).then(res=>{
            if(res.data.length>0) {
              let newHtml = res.data[0].content.replace(/hlclass/g,"class")
              store.ueditor.setContent(newHtml);
              let newData=[];
              res.data[0].hintwords.forEach((val,index)=>{
                newData.push({
                  date:val.hintword,
                  name:val.suggestion
                })
              })
              this.tableData = newData;
            }else {
              this.$message('没有敏感词');
            }
          })
      }else{

      }
      
    },
    clearWords(){
      let newHtml = store.ueditor.getContent().replace(/color\:\#333\;font\-weight\:bold\;background\-color\:\#66ffff/g,"")
      
      store.ueditor.setContent(newHtml);
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