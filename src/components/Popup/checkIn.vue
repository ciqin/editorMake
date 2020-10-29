<template>
  <div>
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-row>
            <el-col :span="24">
                 <el-form-item label="审批流程">
                        <el-table
                            :data="tableData"
                            style="width: 440px;" class="ssContainer">
                            <el-table-column
                                prop="date"
                            label="部门/栏目"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="角色"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="用户">
                                 <template slot-scope="scope">
                                    <el-select v-model="scope.row.userList" multiple
                                                                filterable
                                                                allow-create 
                                                                placeholder="请选择"  size="mini" style="width:200px;">
                                        <el-option
                                            v-for="item in scope.row.userData"
                                            :key="item.uuid"
                                            :label="item.name"
                                            :value="item.uuid">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="commit" size="mini" placeholder="请输入备注内容" style="width:450px;"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" @click="submit"  size="mini">确定送审</el-button>
        <el-button @click="closeModale"  size="mini">取消</el-button>
    </div>
  </div>
</template>
<script>
import {hasCensorship,hasUserId,submitCensorship} from "@/http/api"
import {getHttp} from "../../http/httpService"
export default {
    created(){
        hasCensorship().then(resData=>{
            resData.routes.forEach((item,index)=>{
                getHttp("http://qhcloudhongqi.wengegroup.com:9080/sprint/security/users/search/group/"+item.approverRole,{group:item.approverGroup,padding:Date.parse(new Date())}).then(res=>{
                   this.tableData.push({
                        approverGroup:{uuid:item.approverGroup},
                        approverRole:{uuid:item.approverRole},
                        date:resData.groupMap[item.approverGroup],
                        name:resData.roleMap[item.approverRole],
                        userData:res,
                        userList:[],
                        seqNo:item.seqNo,
                        processId:item.processId
                    })
                })
            })
        })
    },
    data(){
        return{
            tableData: [],
            options:[],
            commit:"",
        }
    },
    methods:{
        submit(){
            let dataArr = [];
            this.tableData.forEach(item=>{
                dataArr.push({
                    approverGroup:item.approverGroup,
                    approverRole:item.approverRole,
                    seqNo:item.seqNo,
                    processId:item.processId,
                    approvers:item.userList.join(",")
                })
            })
            let data = {
                comment:this.commit,
                approvalRecords:dataArr
            }
            submitCensorship(data).then(res=>{
                if(res) {
                    this.$message({
                        message: '送审成功！',
                        type: 'success'
                    });
                    setTimeout(()=>{
                        window.close();
                    },500)
                    this.$store.dispatch('modifyCheckIn',false);
                }
            })
        },
        closeModale(){
            this.$store.dispatch('modifyCheckIn',false);
        }
    }
}
</script>
<style scoped>
.el-table th {
    padding-top: 0;
}
</style>