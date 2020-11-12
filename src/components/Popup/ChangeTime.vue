<template>
  <div>
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <div class="title">渠道</div>
                <div class="p30">{{channel}}</div>
                <div class="title">栏目</div>
                <div class="p30">
                  <p v-for="item in column" :key="item" style="margin:6px 0;">{{item}}</p>
                </div>
                <div class="title">发布时间</div>
                <div class="p30">
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
            <el-button @click="closeModale"  size="mini">取消</el-button>
            <el-button type="primary" @click="submit"  size="mini">确定改时</el-button>
        </div>
  </div>
</template>
<script>
import {hasChangeTime,subChangeTime} from "@/http/api"
export default {
  data(){
    return {
      value1: '',
      column:[],
      channel:"",
      uuid:"",
      name: "",
      type: "",
      libraryId: "",
      storyId: "",
    }
  },
  created(){
    hasChangeTime().then(res=>{
      this.uuid = res.channel.uuid;
      this.name = res.channel.name;
      this.type = res.channel.type;
      this.libraryId = res.story.libraryId;
      this.storyId = res.story.id;
      this.channel = res.channel.name
      res.channel.column.forEach(item=>{
        this.column.push(item.name)
      })
      this.value1 = this.timestampToTime(res.channel.issueDate)
    })
  },
  methods:{
    submit(){
      if(typeof this.value1 =="object") {
        this.value1 = this.timestampToTime(this.value1.getTime())
      }
      let data = {
          channel:this.channel,
          uuid:this.uuid,
          name: this.name,
          type: this.type,
          libraryId: this.libraryId,
          storyId: this.storyId,
          issueDate:this.value1,
          ContentType:true
      }
      subChangeTime(data).then(res=>{
        if(res) {
            this.$message({
                message: '改时成功！',
                type: 'success'
            });
            this.$store.dispatch('modifyChangeTime',false);
        }
      })
    },
    closeModale(){
      this.$store.dispatch('modifyChangeTime',false);
    },
    timestampToTime(data) {
        let date = new Date(data) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y+M+D+h+m+s
    },
  }
}
</script>
<style scoped>
.title {
    font-weight: 700;
    border-bottom: 1px solid #e5e5e5;
    font-size: 16px;
}
.hr {
    width: 100%;
    height: 1px;
    background: #e5e5e5;
}
.el-tabs--left .el-tabs__header.is-left{
    margin-right: 24px;
}
.p30 {
  padding:30px 0;
}
</style>