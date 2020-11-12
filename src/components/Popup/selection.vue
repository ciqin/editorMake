<template>
  <div> 
      <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <div class="title">选择选用位置</div>
                <el-form-item label="" style="padding-left:100px;">
                    <el-radio v-model="radio" label="user" @change="showMy"><i class="el-icon-user-solid"></i>我的草稿</el-radio>
                    <el-radio v-model="radio" label="group" @change="showAdd"><i class="el-icon-s-check"></i>加工中心</el-radio>
                </el-form-item>
                <div v-if="show">
                    <el-form-item label="选择部门">
                        <el-select v-model="departmentId" placeholder="请选择"  size="mini" @change="hasUser" style="width:300px;">
                            <el-option
                            v-for="item in departmentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
            <el-button @click="closeModale"  size="mini">取消</el-button>
            <el-button type="primary" @click="submit"  size="mini">确定选用</el-button>
        </div>
  </div>
</template>
<script>
import {hasDepartment,subSelect} from "@/http/api"
export default {
    data(){
        return{
            departmentList:[],
            departmentId:"",
            radio:"group",
            show:true
        }
    },
    created(){
        hasDepartment({onlyByUser:true}).then(res=>{
            res.forEach(item=>{
                this.departmentList.push({
                    label:item.name,
                    value:item.uuid
                })
            })
        })
    },
    methods:{
        showMy(){
            this.show = false;
        },
        showAdd(){
            this.show = true;
        },
        submit(){
            subSelect({targetType:this.radio,targetUuid:this.departmentId,ContentType:true}).then(res=>{
                if(res) {
                    this.$message({
                        message: '选用成功！',
                        type: 'success'
                    });
                    this.$store.dispatch('modifySelectId',false);
                }
            })
        },
        closeModale(){
            this.$store.dispatch('modifySelectId',false);
        }
    }
}
</script>
<style scoped>
.title {
    font-weight: 700;
    padding-left: 30px;
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
</style>