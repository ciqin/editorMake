<template>
  <div>
     <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <div class="title">渠道</div>
                <div class="p30">
                    <el-checkbox v-model="checked">{{name}}</el-checkbox>
                </div>
                <div class="title">相关联的已发布到其他渠道的稿件</div>
                <div class="p30">
                    <div v-show="showItem">
                         <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="标题"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="发布渠道"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="状态">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div v-show="!showItem">
                    无
                </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
            <el-button @click="closeModale"  size="mini">取消</el-button>
            <el-button type="primary" @click="submit"  size="mini">撤稿</el-button>
        </div>
  </div>
</template>
<script>
import {hasFinalJudgment} from "@/http/api"
export default {
    created(){
       hasFinalJudgment().then(res=>{
           this.name = res.story.channel[0].name;
           if(res.otherChannels.length>0){
               this.showItem = true;
           }
       })
    },
    data(){
        return{
            name:"",
            checked:false,
            showItem:false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods:{
        submit(){

        },
        closeModale(){

        }
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