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
                                    <img  v-if="opaBtn1" :src="form.opaImg1" alt="" slot="open" style="cursor: pointer;" width="70" @click="loadSmall(index)">
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
                                    <img  v-if="opaBtn2" :src="form.opaImg2" alt="" slot="open" style="cursor: pointer;" width="70" @click="loadBig(index)">
                                
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
                                    <img  v-if="opaBtn3" :src="form.opaImg3" alt="" slot="open" width="70" style="cursor: pointer;" @click="loadMany(index)">
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
                         <img v-if="true" :src="form.addImg"  @click="forIe9(index)" alt="" width="70" style="cursor: pointer;">
                    </div>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.summary"  size="mini"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select v-model="form.origination" placeholder="请选择来源"  size="mini">
                         <el-option
                            v-for="item in form.originations"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.signature" size="mini"></el-input>
                </el-form-item>
               
                <el-form-item label="关键字">
                     <div class="tabsContainer">
                         <el-tag
                            :key="tag"
                            v-for="tag in form.dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="form.inputVisible"
                        v-model="form.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="稿件级别">
                    <el-select v-model="form.levelId" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.level"
                        :key="item.levelId"
                        :label="item.name"
                        :value="item.levelId">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="选题">
                    <el-select v-model="form.topicsId" placeholder="请选择" size="mini">
                        <el-option
                            v-for="item in form.topics"
                            :key="item.pid"
                            :label="item.topicName"
                            :value="item.pid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="链接标题">
                    <el-input v-model="form.linkHeadline" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题链接">
                    <el-input v-model="form.properties.leadinLineUrl" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题样式">
                    <el-select v-model="form.leadinLineStyle" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.IntroductionList"
                        :key="item.index"
                        :label="item.name"
                        :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="原创分类">
                    <el-select v-model="form.originalCategory" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in form.classificationList"
                        :key="item.index"
                        :label="item.name"
                        :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="">
                    <!-- <el-checkbox label="引题" name="type"></el-checkbox>
                    <el-checkbox label="副题" name="type"></el-checkbox> -->
                    <el-checkbox label="自动保存"></el-checkbox>
                    <el-checkbox label="有水印" v-model="form.properties.watermark"></el-checkbox>
                    <el-checkbox label="广告" v-model="form.properties.ad"></el-checkbox>
                    <el-checkbox label="可评论" v-model="form.canComment"></el-checkbox>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.comment"  size="mini"></el-input>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import ImgCutter from 'vue-img-cutter'
import {newSignature} from '@/http/api'
import { store , mutations} from '@/store'
import {mapActions, mapGetters} from 'vuex';
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
                title:"",
                resource: '',
                originations:[],
                origination:"",
                topics:[],
                topicsId:"",
                comment:"",
                canComment: false,
                linkHeadline:"",
                properties:{
                    ad: false,
                    leadinLineUrl: "",
                    watermark: false
                },
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                level:[
                    {
                        levelId:1,
                        name:"普通稿"
                    },{
                        levelId:2,
                        name:"重要稿"
                    },{
                        levelId:3,
                        name:"急稿"
                    }
                ],
                levelId:1,
                // IntroductionList:[
                //     {
                //         index:0,
                //         name:"默认"
                //     },{
                //         index:1,
                //         name:"强调"
                //     },{
                //         index:2,
                //         name:"一般"
                //     },{
                //         index:3,
                //         name:"明亮"
                //     },{
                //         index:4,
                //         name:"淡雅"
                //     }
                // ],
                // leadinLineStyle:0,
                // classificationList:[
                //     {
                //         index:0,
                //         name:"网稿"
                //     },{
                //         index:1,
                //         name:"自采"
                //     },{
                //         index:2,
                //         name:"编译"
                //     },{
                //         index:3,
                //         name:"改写"
                //     }
                // ],
                // originalCategory:0,
                coverType:1,
                addImg:"http://127.0.0.1:9080/sprint/assets/img/add.png",
                opaImg1:"http://127.0.0.1:9080/sprint/assets/img/add.png",
                opaImg2:"http://127.0.0.1:9080/sprint/assets/img/add.png",
                opaImg3:"http://127.0.0.1:9080/sprint/assets/img/add.png",
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            checked:true,
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
            opaBtn1:true,
            opaBtn2:false,
            opaBtn3:false,
            none:"none"
        }
    },
    created(){
          // 初始化稿签数据
        newSignature().then(res=>{
            this.$store.dispatch('modifyDataTitle',res.story.title);
            this.$store.dispatch('modifyDatahtmlContent',res.story.htmlContent);
            let originations = [];
            res.originations.split(",").forEach((item,index)=>{
                originations.push({
                    label:item,
                    value:index
                })
            })
            // 组件值回传
            this.app.form = this.form
            this.form.originations = originations;
            this.form.summary = res.story.summary;
            this.form.signature = res.story.signature;
           
            this.form.topics = res.topics;
            this.form.linkHeadline = res.linkHeadline;
            this.form.properties.leadinLineUrl = res.properties.leadinLineUrl;
            this.form.comment = res.comment;
            res.story.keywords?res.story.keywords.split(",").forEach(item=>{
                this.form.dynamicTags.push(item)
            }):"";
            this.form.origination = res.story.origination;
            this.form.levelId = res.story.level;
            this.form.topicsId= res.story.topic;
            this.form.canComment=res.story.canComment;
            this.form.properties.ad=res.properties.ad==1?true:false;
            this.form.properties.watermark=res.properties.watermark==1?true:false;  
        })
    },
    inject:['app'],
    computed:{
        ...mapGetters(['resTitle']),
    },
    methods :{ 
    xztpCutDownSmall(fileName) { 
        this.form.opaImg1 = fileName.dataURL
    },
    xztpCutDownBig(fileName) { 
        this.form.opaImg2 = fileName.dataURL
    },
    xztpCutDownMany(fileName) { 
        this.form.opaImg3 = fileName.dataURL
    },
    xztpCutDownCover (fileName){
        this.form.addImg = fileName.dataURL
    },
    // 小图操作函数
    coverSmall(){
        this.opaBtn1 = true;
        this.opaBtn2 = false;
        this.opaBtn3 = false;
        this.form.opaImg1 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg2 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg3 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.coverType = 1;
    },
    // 大图操作函数
    coverBig(){
        this.opaBtn1 = false;
        this.opaBtn2 = true;
        this.opaBtn3 = false;
        this.form.opaImg1 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg2 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg3 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.coverType = 2;
    },
    // 三图操作函数
    coverMany(){
        this.opaBtn1 = true;
        this.opaBtn2 = true;
        this.opaBtn3 = true;
        this.form.opaImg1 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg2 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.opaImg3 = "http://127.0.0.1:9080/sprint/assets/img/add.png";
        this.form.coverType = 3;
    },
    // 无图操作函数
    coverNone(){
        this.opaBtn1 = false;
        this.opaBtn2 = false;
        this.opaBtn3 = false;
        this.form.coverType = 0;
    },
    loadSmall(index){
        this.$refs.imgCutterModal1.handleOpen({
            name:'img',
            src:this.form.opaImg1,
            "cross-origin":true,
            width:400,
            height:400,
        });
    },
    loadBig(index){
        this.$refs.imgCutterModal2.handleOpen({
            name:'img',
            src:this.form.opaImg2,
            width:400,
            height:400,
        });
    },
    loadMany(index){
        this.$refs.imgCutterModal3.handleOpen({
            name:'img',
            src:this.form.opaImg3,
            "cross-origin":true,
            width:400,
            height:400,
        });
    },
    forIe9(index){
        this.$refs.imgCutterModal0.handleOpen({
            name:'img',
            src:this.form.addImg ,
            "cross-origin":true,
            width:400,
            height:400,
        });
    },
    handleClose(tag) {
        this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
        this.form.inputVisible = true;
        this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
        });
    },

    handleInputConfirm() {
        let inputValue = this.form.inputValue;
        if (inputValue) {
        this.form.dynamicTags.push(inputValue);
        }
        this.form.inputVisible = false;
        this.form.inputValue = '';
    },
    hasHtmlContent(){
    }
    
    },
     mounted(){
        
       
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
.el-tag {
    margin-right: 10px;  
}
.button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
}
.el-radio {
    margin-right: 24px;
}
</style>