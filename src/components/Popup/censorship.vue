<template>
  <div>
     <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-row>
            <el-col :span="24">
                 <el-form-item label="稿库">
                    <el-select v-model="value" placeholder="请选择"  size="mini" style="width:450px;"   @change="loadCatalog">
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
                <el-form-item label="目录" >
                    <el-cascader
                        v-model="catalogVla"
                        :options="catalogList" style="width:450px;"></el-cascader>
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
        <el-button type="primary" @click="checkInData"  size="mini">确定签入</el-button>
        <el-button @click="closeModale"  size="mini">取消</el-button>
    </div>
  </div>
</template>
<script>
import { checkIn,hasCatalog, hasChildrenCatalog ,checkInData} from "@/http/api"
import Axios from 'axios'
  export default {
      created(){
        checkIn().then(res=>{
            res.allStoryLibraries.forEach(item=>{
                if(item.id!="layout" && item.id!="resource" && item.id!="media" && item.id!="rssb" && item.id!="rmzx"){
                    this.options.push({
                        label:item.name,
                        value:item.id
                    })
                }
            })
        })
        // 获取目录云稿库接口
        // export const hasCatalog= (data,id) => getHttp(caiApi+'/sprint/rest/libraries/manuscript/select/allFolders', data)
        hasCatalog().then(res=>{
            res.forEach(item=>{
                this.getTree(item)
            })
            let newData = JSON.parse(JSON.stringify(res));
            this.catalogList = newData;
        })
    },
    data() {
      return {
        commit:"",
        radio:1,
        options: [],
        value: '',
        catalogList:[ ],
        catalogVla:""
        
      }
    },
    methods:{
        checkInData(){
            let targetFolder = this.catalogVla[this.catalogVla.length-1]
            let data = {
                targetLib:this.value,
                commit:this.commit,
                targetFolder,
                ContentType:true
            }
            checkInData(data).then(res=>{
                if(res == "success"){
                    this.$message({
                        message: '稿件签入成功!',
                        type: 'success'
                    });
                }else {
                    this.$message('稿件签入失败');
                }
            }).error(res=>{
            })
        },
        closeModale(){
            this.$store.dispatch('modifyCensorship',false);
        },
        getTree(data) {
            data.label = data.name; // 因为我需要的值跟返回的code是对应的，就直接给data添加了一个value属性 并把code 给它赋值
            data.value = data.id;	// 因为我要的下级key也不对 所以这个 lowerLeves 我也换成了 children
            if(data.children) {
                for(var i = 0; i < data.children.length; i++) {  // 因为树形结构 不确定内部层次到底有几层 所以要在循环里边做回调
                    this.getTree(data.children[i])
                }
            }else {
                return;
            }  
        },
        loadCatalog() {
            let url = 'http://qhcloudhongqi.wengegroup.com:9080/sprint/rest/libraries/'+this.value+'/select/allFolders';
            Axios.get(url).then(res=>{
                res.data.forEach(item=>{
                    this.getTree(item)
                })
                let newData = JSON.parse(JSON.stringify(res.data));
                this.catalogList = newData;
            })
        }
    }
  }
</script>
<style scoped>
</style>