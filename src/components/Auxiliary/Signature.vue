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
                                        <ImgCutter v-if="coverList[0].opaBtn"
                                                :cross-origin="true"
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
                                                <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                    </ImgCutter>
                                    <img  v-if="coverList[0].opaImg" :src="coverList[0].baseUrl" alt="" width="70">
                                </div>
                            </el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <ImgCutter v-if="coverList[1].opaBtn"
                                            :cross-origin="true"
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
                                            <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                </ImgCutter>
                                <img  v-if="coverList[1].opaImg" :src="coverList[1].baseUrl" alt="" width="70">
                                </div></el-col>
                                <el-col   el-col :span="8"><div class="grid-content bg-purple">
                                <ImgCutter v-if="coverList[2].opaBtn"
                                            :cross-origin="true"
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
                                            <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                </ImgCutter>
                                <img  v-if="coverList[2].opaImg" :src="coverList[2].baseUrl" alt="" width="70">
                                </div></el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item label="文章封面"  class="cover">
                    <div  style="padding-top:12px;">
                        <ImgCutter v-if="coverImg.opaBtn"
                                    :cross-origin="true"
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
                                    <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                        </ImgCutter>
                         <img v-if="coverImg.opaImg" :src="coverImg.baseUrl" alt="" width="70">
                    </div>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.abstract"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="form.source" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.author" size="mini"></el-input>
                </el-form-item>
                    <el-form-item label="关键字">
                    <el-input v-model="form.keyWord" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="稿件级别">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="选题">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链接标题">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题链接">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="引题样式">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原创分类">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="引题" name="type"></el-checkbox>
                    <el-checkbox label="副题" name="type"></el-checkbox>
                    <el-checkbox label="有水印" name="type"></el-checkbox>
                    <el-checkbox label="广告" name="type"></el-checkbox>
                    <el-checkbox label="视频" name="type"></el-checkbox>
                    <el-checkbox label="可评论" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import ImgCutter from 'vue-img-cutter'
export default {
    name: 'Signature',
    data(){
        return {
            form: {
                abstract: '',
                source:'',
                author:'',
                keyWord: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: ''
               
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
            radio: 3
            
        }
    },
     methods :{ 
        xztpCutDownSmall(fileName) { 
            this.coverList[0].opaBtn = false;
            this.coverList[0].opaImg = true
            this.coverList[0].baseUrl = fileName.dataURL
        },
        xztpCutDownBig(fileName) { 
            this.coverList[1].opaBtn = false;
            this.coverList[1].opaImg = true
            this.coverList[1].baseUrl = fileName.dataURL
        },
        xztpCutDownMany(fileName) { 
            this.coverList[2].opaBtn = false;
            this.coverList[2].opaImg = true
            this.coverList[2].baseUrl = fileName.dataURL
        },
        xztpCutDownCover (fileName){
            this.coverImg.opaBtn = false;
            this.coverImg.opaImg = true;
            this.coverImg.baseUrl = fileName.dataURL;
            
        },
        // 小图操作函数
        coverSmall(){
            this.coverList.forEach((val ,index)=>{
                if(index == 0) {
                    val.opaBtn = true;
                }else {
                    val.opaBtn = false;
                    val.opaImg = false;
                }
            })
        },
        // 大图操作函数
        coverBig(){
            this.coverList.forEach((val ,index)=>{
                if(index == 1) {
                    val.opaBtn = true;
                }else {
                    val.opaBtn = false;
                    val.opaImg = false;
                }
            })
        },
        // 三图操作函数
        coverMany(){
            this.coverList.forEach((val ,index)=>{
                 val.opaBtn = true;
                 val.opaImg = false;
            })
        },
        // 无图操作函数
        coverNone(){
            this.coverList.forEach((val ,index)=>{
                 val.opaBtn = false;
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