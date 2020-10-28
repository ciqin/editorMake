<template>
  <div>   
    <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-row>
            <el-col :span="24">
                 <el-form-item label="目标">
                    <el-radio v-model="radio" label="1">{{submitName}}</el-radio>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                 <el-form-item style="margin-left:100px;">
                     <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="保留原稿">
                    <el-checkbox v-model="checked">是</el-checkbox>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="commit"  placeholder="请输入备注内容" style="width:450px;"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
     <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" @click="submit" size="mini">确定提交</el-button>
        <el-button @click="closeModale" size="mini">取消</el-button>
     </div>
  </div>
</template>
<script>
import { hasSubmitId ,hasSubmitUser ,SubmitGj} from "@/http/api"
export default {
    created(){
        hasSubmitId().then(res=>{
            this.submitName = res.canPerformGroup[0].name;
            this.uuid = res.canPerformGroup[0].uuid;
            // 获取用户
            let data = {
                group:res.canPerformGroup[0].uuid,
                padding:Date.parse(new Date())
            }
            hasSubmitUser(data).then(res=>{
                res.forEach(item=>{
                     this.options.push({
                         label:item.account,
                         value:item.uuid
                     })
                })
            })
        })
    },
    data(){
        return {
            submitName:"",
            options:[],
            uuid:"",
            checked: false,
            radio:'1',
            commit:"",
            value:"",
            centerDialogVisible:true
        }
    },
    methods:{
        closeModale(){
            this.$store.dispatch("modifySubmit",false)
        },
        submit(){
            let data = {
                targetGroup:this.uuid,
                targetUuid:this.value,
                mode:this.checked?"copy":"move",
                comment:this.commit
            }
            SubmitGj(data).then(res=>{
                if(res) {
                    this.$message({
                        message: '稿件提交成功！',
                        type: 'success'
                    });
                    this.$store.dispatch("modifySubmit",false)
                }
            })
            
        }
    }
}
</script>
<style scoped>
</style>