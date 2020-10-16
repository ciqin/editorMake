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
                            <el-col :span="8"><div class="grid-content bg-purple">
                                    <ImgCutter v-if="opaBtn1"
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
                                            @cutDown="xztpCutDown">
                                            <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                </ImgCutter>
                                <img  v-if="opaImg1" :src="baseUrl" alt="" width="70">
                                </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <ImgCutter v-if="opaBtn2"
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
                                            @cutDown="xztpCutDown">
                                            <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                </ImgCutter>
                                <img  v-if="opaImg1" :src="baseUrl" alt="" width="70">
                                </div></el-col>
                                <el-col   el-col :span="8"><div class="grid-content bg-purple">
                                <ImgCutter v-if="opaBtn3"
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
                                            @cutDown="xztpCutDown">
                                            <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                                </ImgCutter>
                                <img  v-if="opaImg1" :src="baseUrl" alt="" width="70">
                                </div></el-col>
                    </el-row>
                    
                </el-form-item>
                <el-form-item label="文章封面"  class="cover">
                    <ImgCutter  ref="imgCutterModal333"
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
                                @cutDown="xztpCutDown"
                                @onPrintImg="printDown">
                                <!-- <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button> -->
                    </ImgCutter>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                    <el-form-item label="关键字">
                    <el-input v-model="form.name" size="mini"></el-input>
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
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            radio:"",
            value:"",
            baseUrl:"",
            opaBtn1:true,
            opaBtn2:false,
            opaBtn3:false,
            opaImg1:false,
            radio: 3
            
        }
    },
     methods :{ 
        xztpCutDown(fileName) { 
            this.opaBtn1 = false;
            this.opaImg1 = true;
            this.baseUrl = fileName.dataURL
        },
        printDown (){
            console.log(111111)
        },
        // 小图操作函数
        coverSmall(){
            this.opaBtn1 = true;
            this.opaBtn2 = false;
            this.opaBtn3 = false;
        },
        // 大图操作函数
        coverBig(){
            this.opaBtn1 = true;
            this.opaBtn2 = false;
            this.opaBtn3 = false;
        },
        // 三图操作函数
        coverMany(){
            this.opaBtn1 = true;
            this.opaBtn2 = true;
            this.opaBtn3 = true;
        },
        // 无图操作函数
        coverNone(){
            this.opaBtn1 = false;
            this.opaBtn2 = false;
            this.opaBtn3 = false;
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