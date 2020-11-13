<template>
  <div class='adopt_box'>
    <el-tabs :tab-position="tabPosition" style="height: 320px;">
        <el-tab-pane label="最近使用">
             <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <!-- <div class="title">选择最近常用</div> -->
            <div class='tabPosition_radio' style="padding:6px 0px 6px 30px;">
                <el-radio style="margin-right:15px;margin-bottom: 16px;" v-model="radio" :label="item.syncUuid" v-for="item in userList" :key="item.syncUuid"><i class="el-icon-user"></i>{{item.name}}</el-radio>
            </div>
            <div class='el-form-item-label'>
                 <el-form-item label="传递方式:">
                    <el-radio v-model="radio1" label="move">直接传稿</el-radio>
                    <el-radio v-model="radio1" label="copy">复制传稿</el-radio>
                 </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="comment"  size="mini" style="width:437px;" placeholder="请输入备注信息，不得超过200个字符"></el-input>
                </el-form-item>
            </div>
           
            </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="传递给用户">
            <!-- <div class="title">选择接受用户</div> -->
             <el-form :inline="true" class="demo-form-inline" label-width="100px">
                <div class='department_box'>
                    <el-form-item label="所有部门:">
                    <el-select v-model="departmentId" filterable :filter-method="dataFilter" placeholder="请选择"  size="mini" @change="hasUser" style="width:437px;height:37px">
                        <el-option
                        v-for="item in departmentList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="名称:">
                        <el-select v-model="userId" placeholder="请选择" 
                                multiple
                                filterable
                                allow-create
                                default-first-optionsize="mini" @change="addDepartment" style="width:437px;height:37px">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
                <div class='el-form-item-label'>
                    <el-form-item label="传递方式:">
                        <el-radio v-model="radio1" label="move">直接传稿</el-radio>
                        <el-radio v-model="radio1" label="copy">复制传稿</el-radio>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.desc"  size="mini" style="width:437px;"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button @click="closeModale"  size="mini">取消</el-button>
        <el-button type="primary" @click="submit"  size="mini">确定传稿</el-button>
    </div>
  </div>
</template>
<script>
import {manuscript,manuscriptSubmit,hasDepartment,hasSubmitUser} from "@/http/api"
import Axios from "axios"
export default {
    created(){
        manuscript().then(res=>{
            this.userList = res.favorUsers;
            this.radio = res.favorUsers[0].syncUuid
        })
        hasDepartment({
            onlyByUser: true,
            padding: "sprint"
        }).then(res=>{
            res.forEach(item=>{
                this.departmentList.push({
                    label:item.name,
                    value:item.uuid
                })
                this.departmentListCopy.push({
                    label:item.name,
                    value:item.uuid
                })
            })
        })
        // 默认加载名称
        hasSubmitUser().then(res=>{
            let opa = [];
            res.forEach(item=>{
                opa.push({
                    label:item.account,
                    value:item.uuid
                })
            })
            this.options = opa;
        })
    },
    data(){
        return {
            userList:[],
            radio:1,
            radio1:"move",
            tabPosition: 'top',
            comment:"",
            value:"",
            options: [],
            userListId:[],
            departmentList:[],
            departmentListCopy:[],
            departmentId:"",
            userId:[],
            form:{
                name:"",
                form:"",
                desc:""
            }
        }
    },
    methods:{
        submit(){
            let data = {
                targetType: "user",
                targetUuid: this.radio,
                targetGroupUuid: "",
                mode:this.radio1,
                comment: this.comment,
                ContentType:true
            }
            if(this.userListId.length>0) {
                data.targetGroupUuid = this.userListId.join(",")
                data.targetUuid = this.userId.join(",")
            }else {
                data.targetUuid = this.radio;
                data.targetGroupUuid = ""
            }
            manuscriptSubmit(data).then(res=>{
                if(res) {
                    this.$message({
                        message: '传稿成功！',
                        type: 'success'
                    });
                    this.$store.dispatch("modifyAdopt",false)
                }
            })
        },
        dataFilter(val){
            this.value = val;
            if (val) { //val存在
                this.departmentList = this.departmentListCopy.filter((item) => {
                if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
                    return true
                }
            })
            } else { //val为空时，还原数组
                    this.departmentList = this.departmentListCopy;
            }
        },
        closeModale(){
            this.$store.dispatch("modifyAdopt",false)
        },
        addDepartment(){
            this.userListId.push(this.departmentId)
        },
        hasUser(){
            let data = {
                group:this.departmentId,
                padding:Date.parse(new Date())
            }
            hasSubmitUser(data).then(res=>{
                let opa = [];
                res.forEach(item=>{
                    opa.push({
                        label:item.account,
                        value:item.uuid
                    })
                })
                this.options = opa;
            })
        }
    }
}
</script>
<style>
.adopt_box .el-tabs__header{
    width: 576px;
    margin-left: 20px;
}
.adopt_box .is-active {
    color: #D72323;
}
.adopt_box .el-tabs__active-bar{
    width: 112px;
    height: 2px;
    background-color: #D72323;
}
.adopt_box .el-tabs__item:hover{
    color:#D72323
}
.adopt_box .tabPosition_radio label{
    height: 36px;
    background: #8994A1;
    opacity: 1;
    border-radius: 4px;
    text-align: center;
    line-height: 36px;
    padding: 0 10px;
}
.adopt_box .tabPosition_radio label .el-radio__input{
    display: none; 
}
.adopt_box .tabPosition_radio label .el-radio__label{
    color: #ffffff;
    padding: 0;
}
.adopt_box .tabPosition_radio .is-checked{
    background: #576779;
}
.adopt_box  .el-radio__inner{
    border-radius: 0%;
}
.adopt_box .el-radio__input.is-checked .el-radio__inner {
    border: 1px solid #DCDFE6;
    border-color: #576779;
    background: #576779;
}
.el-form-item-label .el-radio__input.is-checked+.el-radio__label{
    color: #666666;
}
.el-form-item-label .el-radio__inner::after{
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
    transition: transform .15s ease-in .05s;
    transform-origin: center;
    border-radius: 0%;
    background: none;
    transform: rotate(42deg) scale(1) !important;
}

.department_box .el-input__inner{
    height: 37px !important;
}
</style>
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
.adopt_box{
    margin-top: -22px;
}
</style>