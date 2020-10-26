<template>
  <div>   
    <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-row>
            <el-col :span="24">
                 <el-form-item label="目标">
                    <el-radio v-model="radio" label="1">产品部</el-radio>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                 <el-form-item style="margin-left:100px;">
                    <el-input v-model="desc" placeholder="审批人" size="mini" style="width:200px;"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="保留原稿">
                    <el-checkbox v-model="checked">是</el-checkbox>
                </el-form-item>
            </el-col>
             <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="name" size="mini" placeholder="请输入备注内容" style="width:450px;"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
     <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" @click="centerDialogVisible = false" size="mini">确定提交</el-button>
        <el-button @click="centerDialogVisible = false" size="mini">取消</el-button>
     </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                name:"321321",
                form:"321321321",
                desc:"fdsfsd",
                radio:1,
                checked:true
            }
        }
    }
}
</script>
<style scoped>
</style>