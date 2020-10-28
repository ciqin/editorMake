<template>
  <div>
           <el-form :inline="true" class="demo-form-inline" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-table
                            :data="tableData"
                            style="width: 100%;" class="ssContainer">
                            <el-table-column
                                prop="time"
                            label="时间"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approverGroup"
                                label="待审部门"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approverRole"
                                label="待审角色"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approvers"
                                label="指定审批人"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="approvedBy"
                                label="审批人"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                label="选项">
                                <template slot-scope="scope">
                                     <el-radio v-if="scope.row.type" v-model="radio" :label="scope.row.lable"></el-radio>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24">
                        <div style="margin:10px;">备注</div>
                        <el-input type="textarea" v-model="commit" size="mini" placeholder="请输入备注内容" style="width:100%;margin-left:10px;margin-bottom:16px;"></el-input>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:right;">
                <el-button type="primary" @click="submit"  size="mini">确定驳回</el-button>
                <el-button @click="closeModale"  size="mini">取消</el-button>
            </div>
  </div>
</template>
<script>
import {hasReject,subReject} from "@/http/api"
export default {
    created(){
        hasReject().then(res=>{
           res.records.forEach((item,index)=>{
               let status = '';
               switch(item.status){
                   case 0:
                        status = "待审批"
                         break
                    case 1:
                         status = "已驳回"
                         break
                    case 2:
                         status = "已通过"
                         break
                    case 3:
                         status = "已通过（终审）"
                         break
               }
               this.tableData.push({
                   time:this.timestampToTime (item.updated),
                   status:status,
                   approverGroup:item.approverGroup.name,
                   approverRole:item.approverRole.name,
                   approvers:item.approvers,
                   approvedBy:item.approvedBy?item.approvedBy:"",
                   type:item.approvedBy?true:false,
                   lable:(index+1)
               })
           })
        })
    },
    data(){
        return{
            tableData:[],
            commit:'',
            radio:1
        }
    },
    methods:{
        timestampToTime (data) {
            let date = new Date(data) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
            let D = date.getDate() + ' '
            let h = date.getHours() + ':'
            let m = date.getMinutes() + ':'
            let s = date.getSeconds()
            return Y+M+D+h+m+s
        },
        submit(){
            subReject().then(res=>{
                if(res) {
                    this.$message({
                        message: '改时成功！',
                        type: 'success'
                    });
                    this.$store.dispatch('modifyReject',false);
                }
            })
        },
        closeModale(){
            this.$store.dispatch('modifyReject',false);
        }
    }
}
</script>
<style scoped>
</style>