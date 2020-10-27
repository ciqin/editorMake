<template>
  <div>
     <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <div class="title">渠道</div>
                <div class="p30">{{channel}}</div>
                <div class="title">栏目</div>
                <div class="p30">
                  
                </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
            <el-button type="primary" @click="submit"  size="mini">确定选用</el-button>
            <el-button @click="closeModale"  size="mini">取消</el-button>
        </div>
  </div>
</template>
<script>
import {hasFinalJudgment} from "@/http/api"
export default {
    created(){
       hasFinalJudgment().then(res=>{
           console.log(res)
       })
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