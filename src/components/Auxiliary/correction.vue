<template>
  <div>
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h6 class="wordTitle">文稿纠错</h6>
          <span class="tip">识别文稿中用语规范的错误</span>
      </div>

      <div class="line"></div>
      <div style="text-align:center;padding:0 12px;">
         <el-button type="primary" @click="sensitiveWords" style="background: #326EFF;border:none;">开始分析</el-button>
         <el-button type="primary" @click="clearWords" style="background: #326EFF;border:none;">一键清除样式</el-button>
         <div>
           <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%;margin-top:40px;" class="correction">
              <el-table-column
                prop="date"
                label="错误字词"
                min-width="50" align="left">
              </el-table-column>
              <el-table-column
                prop="name"
                min-width="50" label="错误原因" align="left">
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
import $ from 'jquery'
export default {
  created(){
    // getJson({aaa:true,id:111}).then(res => {
    //     // this.productArr = res
    // })
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
              this.tableData = [{
                  date: '无',
                  name: '无',
              }]
              this.$message('没有字词错误');
            }
          })
      }else{

      }

    },
    clearWords(){
      let spans = $(store.ueditor.body).find(".colormark");
      spans.each((index,item)=>{
        $(item).removeAttr("style")
      })
    }
  }
}
</script>
<style scoped>
.p30 {
  padding: 0 12px;
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
}
.tip {
  height: 16px;
  font-size: 12px;
  color: #999999;
  line-height: 16px;
}
/deep/.el-table th {
    height:44px;
    padding: 8px 16px;
}
/deep/.el-table td {
    height:44px;
    padding: 8px 16px;
}
</style>
