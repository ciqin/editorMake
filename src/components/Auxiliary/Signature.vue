<template>
  <div>
        <div class="grid-content bg-purple-light" style="padding-right:16px;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文章封面">
                    <el-radio-group v-model="radio">
                        <el-radio :label="3" @change="coverSmall">小图</el-radio>
                        <el-radio :label="6" @change="coverBig">大图</el-radio>
                        <el-radio :label="9" @change="coverMany">三图</el-radio>
                        <el-radio :label="12" @change="coverNone">无图</el-radio>
                    </el-radio-group>
                </el-form-item>
            <el-form-item label=""  class="cover">  
                    <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <ImgCutter ref="imgCutterModal1"
                                                :cross-origin="true"
                                                :tool-bgc="none"
                                                :is-modal="true"
                                                :show-choose-btn="true"
                                                :lock-scroll="true"
                                                :box-width="600"
                                                :box-height="500"
                                                :cut-width="200"
                                                :cut-height="200"
                                                :size-change="true"
                                                :move-able="true"
                                                @cutDown="xztpCutDownSmall">
                                                <button slot="open" style="display:none;"></button>
                                    </ImgCutter>
                                    <img  v-if="opaBtn1" :src="opaImg1" alt="" slot="open" style="cursor: pointer;" width="70" @click="loadSmall(index)">
                                </div>
                            </el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                    <ImgCutter ref="imgCutterModal2"
                                                :cross-origin="true"
                                                :tool-bgc="none"
                                                :is-modal="true"
                                                :show-choose-btn="true"
                                                :lock-scroll="true"
                                                :box-width="600"
                                                :box-height="500"
                                                :cut-width="200"
                                                :cut-height="200"
                                                :size-change="true"
                                                :move-able="true"
                                                @cutDown="xztpCutDownBig">
                                                <button slot="open" style="display:none;"></button>
                                    </ImgCutter>
                                    <img  v-if="opaBtn2" :src="opaImg2" alt="" slot="open" style="cursor: pointer;" width="70" @click="loadBig(index)">
                                
                                </div></el-col>
                                <el-col   el-col :span="8"><div class="grid-content bg-purple">
                                    <ImgCutter ref="imgCutterModal3"
                                                    :cross-origin="true"
                                                    :tool-bgc="none"
                                                    :is-modal="true"
                                                    :show-choose-btn="true"
                                                    :lock-scroll="true"
                                                    :box-width="600"
                                                    :box-height="500"
                                                    :cut-width="200"
                                                    :cut-height="200"
                                                    :size-change="true"
                                                    :move-able="true"
                                                    @cutDown="xztpCutDownMany">
                                                    <button slot="open" style="display:none;"></button>
                                    </ImgCutter>
                                    <img  v-if="opaBtn3" :src="opaImg3" alt="" slot="open" width="70" style="cursor: pointer;" @click="loadMany(index)">
                                </div></el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item label="文章封面"  class="cover">
                    <div  style="padding-top:12px;">
                        <ImgCutter ref="imgCutterModal0"
                                    :cross-origin="true"
                                    :tool-bgc="none"
                                    :is-modal="true"
                                    :show-choose-btn="true"
                                    :lock-scroll="true"
                                    :box-width="600"
                                    :box-height="500"
                                    :cut-width="200"
                                    :cut-height="200"
                                    :size-change="true"
                                    :move-able="true"
                                    @cutDown="xztpCutDownCover">
                                    <button slot="open" style="display:none;"></button>
                        </ImgCutter>
                         <img v-if="true" :src="addImg"  @click="forIe9(index)" alt="" width="70" style="cursor: pointer;">
                    </div>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select v-model="form.originations.value" placeholder="请选择来源">
                         <el-option
                            v-for="item in form.originations"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.signature" size="mini"></el-input>
                </el-form-item>
                    <el-form-item label="关键字">
                    <el-input v-model="form.keyWord" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="稿件级别">
                    <el-select v-model="form.level.index" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.level"
                        :key="item.index"
                        :label="item.name"
                        :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="选题">
                    <el-select v-model="form.topics.pid" placeholder="请选择" size="mini">
                        <el-option
                            v-for="item in form.topics"
                            :key="item.pid"
                            :label="item.topicName"
                            :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链接标题">
                    <el-input v-model="form.linkHeadline" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题链接">
                    <el-input v-model="form.properties.leadinLineUrl" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题样式">
                    <el-select v-model="form.IntroductionList.index" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.IntroductionList"
                        :key="item.index"
                        :label="item.name"
                        :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原创分类">
                    <el-select v-model="form.classificationList.index" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.classificationList"
                        :key="item.index"
                        :label="item.name"
                        :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="引题" name="type"></el-checkbox>
                    <el-checkbox label="副题" name="type"></el-checkbox>
                    <el-checkbox label="有水印" name="type" v-model="form.properties.watermark"></el-checkbox>
                    <el-checkbox label="广告" name="type" v-model="form.properties.ad"></el-checkbox>
                    <el-checkbox label="自动保存" name="type"></el-checkbox>
                    <el-checkbox label="可评论" name="type" v-model="form.canComment"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.comment"></el-input>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import ImgCutter from 'vue-img-cutter'
import {newSignature ,newSave } from '@/http/api'
import { store } from '@/store'
export default {
    name: 'Signature',
    data(){
        return {
            form: {
                abstract: '',
                summary:"",
                source:'',
                signature:'',
                keyWord: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                htmlContent:"",
                libid: "workspace",
                objid:store.objid,
                folder:"561a41a40aaa748fb64ca229",
                title: 12321321,
                resource: '',
                originations:[],
                topics:[],
                comment:"",
                canComment: false,
                linkHeadline:"",
                properties:{
                    ad: "0",
                    leadinLineUrl: "",
                    watermark: "0"
                },
                level:[
                    {
                        index:1,
                        name:"普通稿"
                    },{
                        index:2,
                        name:"重要稿"
                    },{
                        index:3,
                        name:"急稿"
                    }
                ],
                IntroductionList:[
                    {
                        index:1,
                        name:"默认"
                    },{
                        index:2,
                        name:"强调"
                    },{
                        index:3,
                        name:"一般"
                    },{
                        index:4,
                        name:"明亮"
                    },{
                        index:5,
                        name:"淡雅"
                    }
                ],
                classificationList:[
                    {
                        index:1,
                        name:"网稿"
                    },{
                        index:2,
                        name:"自采"
                    },{
                        index:3,
                        name:"编译"
                    },{
                        index:4,
                        name:"改写"
                    }
                ]
               
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            radio:"",
            value:"",
            baseUrl:"",
            coverList:[
                {
                    opaBtn:true,
                    opaImg:false,
                    baseUrl:""
                },
                {
                    opaBtn:false,
                    opaImg:false,
                    baseUrl:""
                },
                {
                    opaBtn:false,
                    opaImg:false,
                    baseUrl:""
                }
            ],
            coverImg:{
                opaBtn:true,
                opaImg:false,
                baseUrl:""
            },
            radio: 3,
            addImg:"http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png",
            opaImg1:"http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png",
            opaImg2:"http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png",
            opaImg3:"http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png",
            opaBtn1:true,
            opaBtn2:false,
            opaBtn3:false,
            none:"none"
        }
    },
    created(){
        // 初始化稿签数据
        newSignature().then(res=>{
            let originations = [];
            res.originations.split(",").forEach(item=>{
                originations.push({
                    label:item,
                    value:item
                })
            })
            this.form.originations = originations;
            this.form.summary = res.story.summary;
            this.form.signature = res.story.signature;
           
            this.form.topics = res.topics;
            this.form.linkHeadline = res.linkHeadline;
            this.form.properties.leadinLineUrl = res.properties.leadinLineUrl;
            this.form.comment = res.comment;
            
        })
    },
     methods :{ 
        xztpCutDownSmall(fileName) { 
            this.opaImg1 = fileName.dataURL
        },
        xztpCutDownBig(fileName) { 
           this.opaImg2 = fileName.dataURL
        },
        xztpCutDownMany(fileName) { 
            this.opaImg3 = fileName.dataURL
        },
        xztpCutDownCover (fileName){
            this.addImg = fileName.dataURL
        },
        // 小图操作函数
        coverSmall(){
            this.opaBtn1 = true;
            this.opaBtn2 = false;
            this.opaBtn3 = false;
            this.opaImg1 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg2 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg3 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
        },
        // 大图操作函数
        coverBig(){
            this.opaBtn1 = false;
            this.opaBtn2 = true;
            this.opaBtn3 = false;
            this.opaImg1 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg2 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg3 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
        },
        // 三图操作函数
        coverMany(){
            this.opaBtn1 = true;
            this.opaBtn2 = true;
            this.opaBtn3 = true;
            this.opaImg1 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg2 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
            this.opaImg3 = "http://source.wengegroup.com:8001/app/public_app/servies_images/images/uplode.png";
        },
        // 无图操作函数
        coverNone(){
            this.opaBtn1 = false;
            this.opaBtn2 = false;
            this.opaBtn3 = false;
        },
        loadSmall(index){
            console.log(11111)
            this.$refs.imgCutterModal1.handleOpen({
                name:'img',
                src:this.opaImg1,
                "cross-origin":true,
                width:400,
                height:400,
            });
        },
        loadBig(index){
            this.$refs.imgCutterModal2.handleOpen({
                name:'img',
                src:this.opaImg2,
                width:400,
                height:400,
            });
        },
        loadMany(index){
            this.$refs.imgCutterModal3.handleOpen({
                name:'img',
                src:this.opaImg3,
                "cross-origin":true,
                width:400,
                height:400,
            });
        },
        forIe9(index){
            this.$refs.imgCutterModal0.handleOpen({
                name:'img',
                src:this.addImg ,
                "cross-origin":true,
                width:400,
                height:400,
            });
        },
        saveData(){
            let data = this.form;
            newSave(data),then(res=>{
                console.log(res);
            })
        }
     },
     components:{
         ImgCutter
     }
}
</script>
<style>
.el-radio__input.is-checked .el-radio__inner {
    border-color: #a16c6e;
    background: #d62425;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #d62425;
}
</style>