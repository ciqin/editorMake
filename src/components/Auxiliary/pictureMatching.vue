<template>
  <div> 
      <el-form ref="form"  label-width="80px">
      <div class="p30">
          <h6 class="wordTitle">关联配图</h6>
          <span class="tip">根据文字内容，可自动配图</span> 
      </div>
      
      <div class="line"></div>
      <div style="text-align:center;padding:0 20px;">
          <el-card class="box-card">
              <div class="cardCon">
                <h5>原文内容</h5>
                <p>{{context}}</p>
              </div>
              <el-button type="primary" size="mini" style="background: #303841;border:none;margin-top:16px;">更新配图</el-button>
          </el-card>
          <div class="Refresh"><i class="el-icon-refresh" style="color:#1a8afa;"></i>换一批</div>
          <div class="imgContainer">
            <ul>
              <li v-for="(tab,index) in tabs"><img src="@/assets/container.jpg" alt="" width="160"><el-checkbox v-model="checked" style="position:absolute;right:24px;top:-2px;"></el-checkbox></li>
            </ul>
          </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      checked:"",
      context:store.gettaxt,
      tabs:[
        {
          url:"assets/container.jpg"
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        },
        {
          url:""
        }
      ]
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
.cardCon {
  background: #F6F7F9;
  height: 200px;
  padding: 10px 5px;
}
.cardCon h5 {
  text-align: left;
  color: #666666;
  margin-bottom: 10px;
}
.cardCon p {
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
}
.imgContainer ul li{
  width: 50%;
  float: left;
  position: relative;
  margin-bottom: 10px;
}
</style>