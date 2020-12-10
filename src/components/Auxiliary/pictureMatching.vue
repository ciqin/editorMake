<template>
  <div>
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h2 class="wordTitle">关联配图</h2>
          <span class="tip">根据文字内容，可自动配图</span>
      </div>

      <div class="line"></div>
      <div style="text-align:center;padding:0 12px;">
          <div class="box-card">

                <div class="title">原文内容</div>
                <div class='cardCon_input' contenteditable='true'>{{context}}</div>

              <el-button @click="picture_btn" type="primary" style="background: #326EFF;border:none;margin-top:16px;">更新配图</el-button>
          </div>
          <div class="imgContainer" v-loading="loading">
            <ul v-if='tabs.length>0' style='margin-top:20px'>
              <li v-for="(tab,index) in tabs"><img :src='tab.url' alt="" width="170" height="120" style='margin-top:29px'><el-checkbox @change="checkedclik(tab,index)" v-model='tab.checked' style="position:absolute;right:8px;top:3px;"></el-checkbox></li>
            </ul>
            <div v-else-if='tabs.length==0' style='text-align:center;margin-top: 50px;'>暂无数据</div>
          </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { store } from '@/store'
import Axios from "axios"
import { autoIllustrated } from '@/http/api'
export default {
  data(){
    return {
      checked:"",
      tabs:[],
      context:'',
      loading:true,
      pagenum:1,
      textareavalue:'',
      loading:false
    }
  },
  watch:{
    gettaxt:function(newval,oldval){
      this.watchfun(newval)
    },
    context:function(newval,oldval){
      this.textareavalue = newval;
    }
  },
  computed:{
     gettaxt(){
      return store.gettaxt
    }
  },
  created(){
       this.textareavalue = store.gettaxt
    // this.tabs=[]
    // this.loading=true
    // autoIllustrated({content: this.textareavalue}).then((res)=>{
    //     if(res){
    //       this.loading=false

    //       for(var i=0;i<res.data.length;i++){
    //         this.tabs.push({url:res.data[i],checked:false})
    //       }
    //     }
    // })
  },
  methods: {
    watchfun(val){
      this.context = val;
      this.textareavalue = val;
      this.picture_btn()
    },
    picture_btn(){
      if(this.textareavalue==''){
        this.$message('请输入原文内容');
        return false
      }
      this.tabs=[]
      this.loading=true
      autoIllustrated({content: this.textareavalue}).then((res)=>{
         if(res){
           this.loading=false

           for(var i=0;i<res.data.length;i++){
             this.tabs.push({url:res.data[i],checked:false})
           }
         }
      })
    },
    checkedclik(item,index){
        if(item.chcked){
           item.chcked = false
        }else{
          item.chcked = true
          store.ueditor.focus()
          store.ueditor.execCommand('inserthtml',`<img src=${item.url}>`)
        }

    }
  }


}
</script>
<style scoped>
.p30 {
  padding: 0 12px;
}
.line {
  border-bottom: 1px solid #DCDEE3;
  margin-bottom: 20px;
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
  line-height: 30px;
}
.cardCon {
  background: #F6F7F9;
  height: 200px;
  padding: 10px 5px;
}
.box-card .cardCon_input{
    height:75px;
    text-align: left;
    border:0;
    font-size: 13px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    overflow-y: auto;
}
.box-card .cardCon_input:focus {
  border:0;
  outline:none;
}
.box-card .title {
  text-align: left;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #333330;
  line-height: 19px;
  margin-bottom: 10px;
}
.box-card p {
  height: 109px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: #666666;
  line-height: 15px;
  text-align: left;
}
.Refresh {
  text-align:right;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999999;
  line-height: 16px;
  margin:16px 0;
  color: #000;
}
.imgContainer ul li{
    width: 180px;
    height: 160px;
    float: left;
    position: relative;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    margin-right: 6px
}

.box-card{
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    box-shadow: 0 9px 9px 0 rgba(0,0,0,0.02), 0 3px 3px 0 rgba(0,0,0,0.02), 0 1px 1px 0 rgba(0,0,0,0.02);
    border-radius: 4px;
    border-radius: 4px;
    height: 185px;
    background-color:#F6F8FA;
    padding:12px;
}
</style>
