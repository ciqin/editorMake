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
      <div style="text-align:center;padding:0 20px;" class="impression">
        <el-button type="primary" size="mini" @click="sensitiveWords" style="background: #303841;border:none;">开始分析</el-button>
        <div  v-for="(tab,index) in wordList" :key="tab">
           <el-form-item :label="tab.name">
                  <el-progress :percentage="tab.bl" :format="format" class="mt11" style="color:red;width:230px;"></el-progress>
          </el-form-item>
        </div>
        <div class="noneData" v-if="noneData" style="font-size: 30px;padding-top: 40px;">
           <p style="text-align: center; color: rgb(96, 98, 102); margin-top: 50px; font-size: 18px;"><i class="el-icon-warning-outline"></i>暂无数据</p>
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
      noneData:1
    }
  },
   methods: {
      format(percentage) {
        return percentage === this.maxData ? '满' : `${Math.round(percentage*6/100)}个`;
      },
      sensitiveWords(){
        if(store.ueditor) { 
            let data = {
              title:this.$store.state.title,
              content:store.ueditor.getContent()
            }
            // newG().then(res=>{
            //   console.log(res)
            // })
            correction(data).then(res=>{
              var listWord= [];
              if(!res.data[0]) {
                return
              }
              res.data[0].content.keyWords.forEach(val=>{
                let  key =eval("/" + val+ "/gi")
                let count = data.content.match(key).length
                listWord.push({
                  name:val,
                  count:count
                })
                this.maxData<count?this.maxData=count:'';
              })
              listWord.forEach(item=>{
                item.bl = item.count/this.maxData*100
              })
              this.noneData = false;
              this.wordList = listWord;
              store.ueditor.setContent(res.data[0].content.high);
            })
        }
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

