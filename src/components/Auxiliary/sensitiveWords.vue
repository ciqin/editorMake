<template>
  <div>
    <el-form ref="form"  label-width="130px">
      <div class="p30">
          <h6 class="wordTitle">敏感词分析</h6>
          <span class="tip">识别文本中涉黄、涉政或其他违禁等敏感词汇</span>
      </div>
      <!-- <el-form-item label="敏感词分析"   class="p30">
              <el-switch
                  v-model="value"
                  active-color="#d52324"
                  inactive-color="#d52324">
              </el-switch>
              <span class="tip">识别文本中涉黄、涉政或其他违禁等敏感词汇</span>
      </el-form-item> -->
      <div class="line"></div>
       <div style="text-align:center;padding:0 20px;">
         <el-button type="primary" size="mini" @click="sensitiveWords" style="background: #326EFF;border:none;">开始分析</el-button>
         <el-button type="primary" size="mini" @click="clearWords" style="background: #326EFF;border:none;">一键清除样式</el-button>
         <div>
           <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%;margin-top:40px;" class="correction">
              <el-table-column
                prop="name"
                label="敏感词"
                width="120" align="center">
              </el-table-column>
              <el-table-column
                prop="date"
                label="敏感词个数" align="center">
              </el-table-column>
            </el-table>
         </div>

      </div>
    </el-form>
  </div>
</template>
<script>
import {correction,newG} from '@/http/api'
import {mapActions, mapGetters} from 'vuex';
import { store } from '@/store'
export default {
  data(){
    return{
      form :1,
      value:"",
      wordList:[],
      maxData:0,
      noneData:1,
      tableData: [{
        date: '无',
        name: '无',
      }]
    }
  },
   methods: {
      sensitiveWords(){
        if(store.ueditor) {
            let data = {
              title:this.$store.state.title,
              content:store.ueditor.getContent()
            }
            correction(data).then(res=>{
              var listWord= [];
              if(res.data[0].content.keyWords.length>0) {
                res.data[0].content.keyWords.forEach(val=>{
                  let  key =eval("/" + val+ "/gi")
                  let count = res.data[0].content.high.match(key).length;
                  listWord.push({
                    name:val,
                    date:count
                  })
                })
                this.tableData = listWord;
              }else {
                this.tableData = [{
                        date: '无',
                        name: '无',
                    }];
                this.$message('没有敏感词');
              }
              store.ueditor.setContent(res.data[0].content.high);
            })
        }
      },
      clearWords(){
        let newHtml = store.ueditor.getContent().replace(/color\:red/g,"")

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
  display: block;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999999;
  line-height: 16px;
}
</style>
