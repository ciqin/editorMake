<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 380px;">
        <el-tab-pane label="最近使用">
             <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <div class="title">选择最近常用</div>
            <div style="padding:50px 0 50px 30px;">
                <el-radio style="margin-right:40px;margin-bottom: 16px;" v-model="radio" :label="item.syncUuid" v-for="item in userList" :key="item.syncUuid"><i class="el-icon-user-solid"></i>{{item.name}}</el-radio>
            </div>
             <div class="hr"></div>   
                <el-form-item label="传递方式">
                    <el-radio v-model="radio1" label="move">直接传稿</el-radio>
                    <el-radio v-model="radio1" label="copy">复制传稿</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="comment"  size="mini" style="width:300px;"></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="传递给用户">
            <div class="title">选择接受用户</div>
             <el-form :inline="true" class="demo-form-inline" label-width="100px">

                 <el-form-item label="所有部门">
                    <el-select v-model="departmentId" placeholder="请选择"  size="mini" @change="hasUser" style="width:300px;">
                        <el-option
                        v-for="item in departmentList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称">
                    <el-select v-model="userId" placeholder="请选择" 
                            multiple
                            filterable
                            allow-create
                            default-first-optionsize="mini" @change="addDepartment" style="width:300px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="传递方式">
                    <el-radio v-model="radio1" label="move">直接传稿</el-radio>
                    <el-radio v-model="radio1" label="copy">复制传稿</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"  size="mini" style="width:300px;"></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="primary" @click="submit"  size="mini">确定传稿</el-button>
        <el-button @click="closeModale"  size="mini">取消</el-button>
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
            })
        })
    },
    data(){
        return {
            userList:[],
            radio:1,
            radio1:"move",
            tabPosition: 'left',
            comment:"",
            value:"",
            options: [],
            userListId:[],
            departmentList:[],
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