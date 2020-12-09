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

                <el-form-item v-loading='loading' class='picture_mull' v-if='this.$store.state.title && titleimg.length>0 && !this.coverflag'>
                    <div  style='display:flex'>
                        <div v-for='(item,index) in showTitleimg' @click="setShowTitleimg(index)" :key = 'index' @mouseover='titleimgover(item,index)' @mouseout='titleimgout(item,index)' style='position:relative;margin-right: 15px;'>
                                <img :src="item.url" alt="" style="cursor: pointer;" width="100" height="70">

                                <div class='titleimgbottom' :style="item.show==true?'display:flex':'display:none'">
                                        <span class='titleimgbottom_a' @click="lookmoddle(item)">预览</span>
                                        <ImgCutter v-if='num==1' ref="imgCutterModal1"
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
                                                            <button class='titleimgbottom_b'  @click="loadpicture(index)">本地上传</button>
                                        </ImgCutter>
                                        <ImgCutter v-else-if='num==2' ref="imgCutterModal2"
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
                                                            <button class='titleimgbottom_b'  @click="loadpicture(index)">本地上传</button>
                                        </ImgCutter>
                                        <ImgCutter v-else-if='num==3' ref="imgCutterModal3"
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
                                                                <button class='titleimgbottom_b'  @click="loadpicture(index)">本地上传</button>
                                        </ImgCutter>
                                </div>
                        </div>
                    </div>

                    <div class='refrech_img' style='display: flex;padding-left: 100px;' :style="isrefreshshow">
                        <p @click="refreshbtnprev" :style='isdisshow'><i class='el-icon-top-left'></i>上一张</p>
                        <p @click="refreshbtn"><i class='el-icon-refresh'></i>换一张</p>
                    </div>
                </el-form-item>

                <el-form-item  v-else-if='this.coverflag' label=""  class="cover">
                        <el-row :gutter="20">
                                <el-col :span="8">
                                    <div class="grid-content bg-purple" style="width:100px">
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
                                        <img  v-if="opaBtn1" :src="form.opaImg1" alt="" slot="open" style="cursor: pointer;" width="100%" @click="loadSmall(index)">
                                    </div>
                                </el-col>
                                <el-col :span="8"><div class="grid-content bg-purple"  style="width:100px">
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
                                        <img  v-if="opaBtn2" :src="form.opaImg2" alt="" slot="open" style="cursor: pointer;" width="100%" @click="loadBig(index)">

                                    </div></el-col>
                                    <el-col   el-col :span="8"><div class="grid-content bg-purple" style="width:100px">
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
                                        <img  v-if="opaBtn3" :src="form.opaImg3" alt="" slot="open" width="100%" style="cursor: pointer;" @click="loadMany(index)">
                                    </div></el-col>
                        </el-row>

                </el-form-item>

                <el-form-item label="分享封面"  class="cover">
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
                         <img v-if="true" :src="form.addImg"  @click="forIe9()" alt="" width="70" style="cursor: pointer;">
                    </div>
                </el-form-item>
                <el-form-item label="摘要">
                    <!-- <el-input type="textarea" v-model="form.summary"  size="mini" resize="none" maxlength="30"></el-input> -->
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="form.summary"
                        maxlength="200"
                        resize="none"
                        show-word-limit>
                    </el-input>
                    <el-button @click="automaticSummary"  size="mini" style="float: right;
                        position: relative;
                        top: 10px;
                        right: 30px;
                        border: 1px solid #96C4FF;
                        background: #CAE1FF;
                        color: #0170FF;">自动摘要</el-button>
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
                        @change="handleInputConfirm"
                        @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput" >+</el-button>
                        <el-button @click="hasWord" size="mini" style="float: right;
                        position: relative;
                        top: 10px;
                        right: 30px;
                        border: 1px solid #96C4FF;
                        background: #CAE1FF;
                        color: #0170FF;">抽取关键字</el-button>
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
                    <el-checkbox label="自动保存" @change="autoSave" v-model="form.autoSaveId"></el-checkbox>
                    <el-checkbox label="有水印" v-model="form.properties.watermark"></el-checkbox>
                    <el-checkbox label="广告" v-model="form.properties.ad"></el-checkbox>
                    <el-checkbox label="可评论" v-model="form.canComment"></el-checkbox>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input  type="textarea"
                        placeholder="请输入内容"
                        v-model="form.comment"
                        maxlength="150"
                        resize="none"
                        show-word-limit></el-input>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import ImgCutter from 'vue-img-cutter'
import {newSignature,extractingKeywords,abstract,coverAutoIllustrated,upload} from '@/http/api'
import { store , mutations} from '@/store'
import {mapActions, mapGetters} from 'vuex';
// 加载jquery
import $ from "jquery"

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
                autoSaveId:false,
                properties:{
                    ad: false,
                    leadinLineUrl: "",
                    watermark: false
                },
                isNew:true,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                folder:"",
                libid:"",
                level:[
                    {
                        levelId:1,
                        name:"普通稿"
                    },{
                        levelId:3,
                        name:"重要稿"
                    },{
                        levelId:2,
                        name:"急稿"
                    }
                ],
                levelId:1,
                coverType:1,
                addImg:"http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png",
                opaImg1:"http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png",
                opaImg2:"http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png",
                opaImg3:"http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png",
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            loading:true,
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
            none:"none",
            num:'',
            titleimg:[],
            showTitleimg:[],
            showTitleimgIdx:0,
            titleimgNextIdx:1,
            showTitleimgNum:0,
            isdisshow:'cursor: not-allowed',
            isrefreshshow:'display:flex',
            coverflag:false
        }
    },
    inject:['app'],
    computed:{
        ...mapGetters(['resTitle']),
    },
    methods :{
    // 自动摘要
    automaticSummary(){
        let param = {
            content:store.ueditor.getContentTxt(),
            ContentType:true
        }
        abstract(param).then(res=>{
            if(res){
                this.form.summary = res;
            }else{
                this.$message({
                    message: '没有可摘要内容！',
                    type: 'success'
                });
            }
        })
    },
    // 抽取关键词
    hasWord(){
        let data = {
            content:store.ueditor.getContentTxt(),
            ContentType:true
        }
        extractingKeywords(data).then(res=>{
            if(res){
                this.form.dynamicTags = res;
            }else{
                this.$message({
                    message: '没有获取到关键词！',
                    type: 'success'
                });
            }
        })
    },
    // 自动保存
    autoSave(){
        let timer = null;
        if(this.form.autoSaveId){
            timer = setInterval(() => {
                document.querySelector(".autoClick").click()
            }, 300000);
        }else {
            clearInterval(timer)
        }
    },
    xztpCutDownSmall(fileName) {
        if(this.$store.state.title && this.titleimg.length>0){
          this.showTitleimg[0].url = fileName.dataURL
          this.form.opaImg1 = fileName.dataURL
        }else{
          this.form.opaImg1 = fileName.dataURL
        }


    },
    xztpCutDownBig(fileName) {
        if(this.$store.state.title && this.titleimg.length>0){
           this.showTitleimg[0].url = fileName.dataURL
           this.form.opaImg2 = fileName.dataURL
        }else{
           this.form.opaImg2 = fileName.dataURL
        }
    },
    xztpCutDownMany(fileName) {
        if(this.$store.state.title && this.titleimg.length>0){
          this.showTitleimg[this.showTitleimgIdx].url = fileName.dataURL
          this.form.opaImg3 = fileName.dataURL
        }else{
           this.form.opaImg3 = fileName.dataURL
        }
    },
    xztpCutDownCover (fileName){
        upload({data:fileName.dataURL,fileName:fileName.fileName,ContentType:true,}).then(res=>{
            if(res){
               this.form.addImg = res.shareCover
            }
        })

    },
    // 小图操作函数
    coverSmall(){
        this.num = 1
        if(this.$store.state.title && this.coverList && !this.coverflag){
           this.loadcoverAutoIllu()
        }else{
           this.form.opaImg1 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
           this.form.opaImg2 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
           this.form.opaImg3 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
        }

        this.opaBtn1 = true;
        this.opaBtn2 = false;
        this.opaBtn3 = false;

        this.form.coverType = 1;
        this.isrefreshshow = 'display:flex'
    },
    // 大图操作函数
    coverBig(){
        this.num = 2
        if(this.$store.state.title && this.coverList && !this.coverflag){
           this.loadcoverAutoIllu()
        }else{
            this.form.opaImg1 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
            this.form.opaImg2 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
            this.form.opaImg3 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
        }
        this.opaBtn1 = false;
        this.opaBtn2 = true;
        this.opaBtn3 = false;
        this.form.coverType = 2;
        this.isrefreshshow = 'display:flex'

    },
    // 三图操作函数
    coverMany(){
        this.num = 3
        if(this.$store.state.title && this.coverList && !this.coverflag){
           this.loadcoverAutoIllu()
        }else{
            this.form.opaImg1 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
            this.form.opaImg2 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
            this.form.opaImg3 = "http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/add.png";
        }
        this.opaBtn1 = true;
        this.opaBtn2 = true;
        this.opaBtn3 = true;
        this.form.coverType = 3;
        this.isrefreshshow = 'display:flex'
    },
    // 无图操作函数
    coverNone(){
        this.opaBtn1 = false;
        this.opaBtn2 = false;
        this.opaBtn3 = false;
        this.form.coverType = 0;
        this.showTitleimg = [];
        this.isrefreshshow = 'display:none'
    },
    loadSmall(index){
        this.$refs.imgCutterModal1.handleOpen({
            name:'img',
            src:this.form.opaImg1,
            "cross-origin":true,
            width:400,
            height:400,
        });

        console.log(this.form.opaImg1)
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
    forIe9(){
        this.$refs.imgCutterModal0.handleOpen({
            name:'img',
            src:this.form.addImg,
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
    },
    //点击第几个封面图
    setShowTitleimg(idx){
        this.showTitleimgIdx = idx;
        console.log(idx);
    },
    //获取封面图
    loadcoverAutoIllu(){
        this.titleimgNextIdx = 1;
        if(this.radio==9){
            this.showTitleimgNum = 3;
        }else if(this.radio==12){
            this.showTitleimgNum = 0;
        }else{
            this.showTitleimgNum = 1;
        }
        this.titleimg=[];
        this.showTitleimg=[];
         let param={
             title:this.$store.state.title,
         }
         coverAutoIllustrated(param).then((res)=>{
            if(res){
                this.loading =false
                for(let i=0;i<res.data.length;i++){
                    if(i<this.showTitleimgNum){
                        this.showTitleimg.push({show:false,url:res.data[i]})
                    }
                    this.titleimg.push({show:false,url:res.data[i]})
                }

                if(this.showTitleimg.length==3){
                    this.form.opaImg1 = this.showTitleimg[0].url;
                    this.form.opaImg2 = this.showTitleimg[1].url;
                    this.form.opaImg3 = this.showTitleimg[2].url;
                }else{
                    this.form.opaImg1 = this.showTitleimg[0].url;
                }
            }
         })




    },

    titleimgover(item,index){
       this.showTitleimg[index].show=true
    },

    titleimgout(item,index){
       this.showTitleimg[index].show=false
    },

    loadpicture(){
        if(this.showTitleimg.length==3){
           this.form.opaImg1 = this.showTitleimg[0].url;
           this.form.opaImg2 = this.showTitleimg[1].url;
           this.form.opaImg3 = this.showTitleimg[2].url;
        }else{
           this.form.opaImg1 = this.showTitleimg[0].url;
        }

       if(this.num==1){
          this.loadSmall()
       }else if(this.num==2){
          this.loadBig()
       }else if(this.num==3){
          this.loadMany()
       }
    },

    lookmoddle(item){
        let str=`<div style='width: 1000px;height: 800px;overflow-y: auto;'><img src=${item.url}></div>`
        this.$alert(str,'图片预览', {
          dangerouslyUseHTMLString: true
        });
    },

    refreshbtn(){//换一张
        if(this.titleimgNextIdx == 0){
          this.isdisshow = 'cursor: not-allowed'
        }else{
          this.isdisshow = 'cursor: pointer'
        }
        let idx = this.showTitleimgIdx;
        let next = this.titleimgNextIdx;
        let total = this.showTitleimgNum;
        if(total+next > this.titleimg.length){
           this.$message('没有更多图片了');
           return false
        }

        let tempArr = [];
        this.showTitleimg.forEach(function(item){
            tempArr.push(item);
        });
        tempArr[idx] = this.titleimg[total+next-1];
        this.showTitleimg = tempArr;
        this.titleimgNextIdx++;
        if(this.showTitleimg.length==3){
           this.form.opaImg1 = this.showTitleimg[0].url;
           this.form.opaImg2 = this.showTitleimg[1].url;
           this.form.opaImg3 = this.showTitleimg[2].url;
        }else{
           this.form.opaImg1 = this.showTitleimg[0].url;
        }

    },
    refreshbtnprev(){ //上一张
        let idx = this.showTitleimgIdx;
        let next = this.titleimgNextIdx;
        let total = this.showTitleimgNum;


        if(this.titleimgNextIdx == 1){
          this.isdisshow = 'cursor: not-allowed'
          this.$message('没有更多图片了');
          return false
        }else{
          this.isdisshow = 'cursor: pointer'
        }


        let tempArr = [];
        this.showTitleimg.forEach(function(item){
            tempArr.push(item);
        });
        let loop = false;
        let data = null;
        do{
            loop = false;
            data = this.titleimg[total+next-2];
            let url = data.url;
            for(let i=0;i<this.showTitleimg.length;i++){
                if(url==this.showTitleimg[i].url){
                    loop = true;
                    break;
                }
            }
            if(loop){
                next--;
            }
        }while(loop);
        if(!loop){
            next--;
        }
        this.titleimgNextIdx = total+next-2;
        tempArr[idx] = data;
        this.showTitleimg = tempArr;

        if(this.showTitleimg.length==3){
           this.form.opaImg1 = this.showTitleimg[0].url;
           this.form.opaImg2 = this.showTitleimg[1].url;
           this.form.opaImg3 = this.showTitleimg[2].url;
        }else{
           this.form.opaImg1 = this.showTitleimg[0].url;
        }

    }

    },
    mounted(){
        let _that = this
          // 初始化稿签数据
        newSignature().then(res=>{
            if(/系统登录认证信息输入区域/.test(res) && /智能采编平台/.test(res)) {
                this.$router.push("/login")
            }
            if(res.coverList) {
                _that.coverflag = true
                switch(res.coverType){
                    case 1:
                        _that.radio = 3;
                        _that.form.opaImg1 = res.coverList[0].data;
                        _that.opaBtn1 = true;
                        _that.opaBtn2 = false;
                        _that.opaBtn3 = false;
                        break;
                    case 2:
                        _that.radio = 6;
                        _that.form.opaImg2 = res.coverList[0].data
                        _that.opaBtn1 = false;
                        _that.opaBtn2 = true;
                        _that.opaBtn3 = false;
                        break;
                    case 3:
                        _that.radio = 9;
                        res.coverList.forEach((item,index)=>{
                            _that.form['opaImg'+(index+1)] = res.coverList[index].data
                        })
                        _that.opaBtn1 = true;
                        _that.opaBtn2 = true;
                        _that.opaBtn3 = true;
                        break;
                    case 0:
                        _that.radio = 12;
                        _that.opaBtn1 = false;
                        _that.opaBtn2 = false;
                        _that.opaBtn3 = false;
                        break;
                }
            }
            if(res.shareCover){
              _that.form.addImg = res.shareCover
            }
            if(!_that.$store.state.title){
                _that.$store.dispatch('modifyDataTitle',res.story.title);
            }
            _that.$store.dispatch('modifyDatahtmlContent',res.story.htmlContent);
            let originations = [];
            res.originations.split(",").forEach((item,index)=>{
                originations.push({
                    label:item,
                    value:index
                })
            })
            // 组件值回传
            _that.app.form = _that.form
            _that.form.originations = originations;
            _that.form.summary = res.story.summary;
            _that.form.signature = res.story.signature;

            _that.form.topics = res.topics;
            _that.form.linkHeadline = res.linkHeadline;
            _that.form.properties.leadinLineUrl = res.properties.leadinLineUrl;
            _that.form.comment = res.comment;
            res.story.keywords?res.story.keywords.split(",").forEach(item=>{
                _that.form.dynamicTags.push(item)
            }):"";
            _that.form.origination = res.story.origination;
            _that.form.levelId = res.story.level;
            _that.form.topicsId= res.story.topic;
            _that.form.canComment=res.story.canComment;
            _that.form.properties.ad=res.properties.ad==1?true:false;
            _that.form.properties.watermark=res.properties.watermark==1?true:false;
            _that.form.folder = res.story.folder
            _that.form.libid = res.story.libid
        })

     },
     components:{
         ImgCutter
     }
}
</script>

<style>
.tabsContainer .el-button:active,.tabsContainer .el-button:focus{
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: rgb(1, 112, 255);
    background: rgb(1, 112, 255);
}
.el-radio__input.is-checked+.el-radio__label {
    color: rgb(1, 112, 255);
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: rgb(1, 112, 255) !important;
  background: rgb(1, 112, 255) !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: rgb(1, 112, 255);
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
.el-textarea__inner {
    padding-right:44px;
}

.titleimgbottom{
    display: flex;
    position: absolute;
    bottom: 0;
    height: 25px;
    width: 100%;
    line-height: 25px;
}
.titleimgbottom span{
   text-align:center;
   background:rgba(0, 0, 0, 1);
   opacity: 0.46;
   color:#ffffff
}

.titleimgbottom_a{
    width:30px;
    margin-right: 10px;

}

.titleimgbottom_b{
    width:60px;
}


.picture_mull .el-form-item__content>div{
    margin-right: 15px;
    height: 70px;
}

.titleimgbottom .btn-primary{
    padding: 0!important;
    height: 24px !important;
    line-height: 27px !important;
    border: none !important;
    background:rgba(0, 0, 0, 1) !important;
    opacity: 0.46 !important;
    color: #ffff !important;
    margin: 0 !important;
    border-radius: 0% !important;
    width: 60px;
 }

 .refrech_img p{
    width:80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
 }

 .bg-purple-light .el-textarea .el-input__count {
    color: #909399;
    background: #FFF;
    position: absolute;
    font-size: 12px;
    bottom: 14px;
    right: 40px;
    height: 20px;
}
</style>
