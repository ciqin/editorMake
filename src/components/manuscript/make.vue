<template>
  <div class="maskContainer">
    <!-- <Nav></Nav> -->
    <!--下面通过传递进来的id完成初始化-->
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content bg-purple">
               <div class="iconNav">
                   <ul>
                       <li><i class="el-icon-s-unfold"></i></li>
                       <li><i class="el-icon-s-order"></i></li>
                       <li><i class="el-icon-star-on"></i></li>
                   </ul>
               </div>
               <div class="NavContainer">

               </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple" style="position:relative">
                <div class="">
                    <el-input type="text" v-model="input" placeholder="请输入内容" maxlength="100" show-word-limit style="width:500px;position: relative;margin: 16px 0;left: 50%;transform: translateX(-50%);"></el-input>
                </div>
                <Ueditor></Ueditor>
            </div>
        </el-col>
        <el-col :span="6" class="Signature">
            <div class="grid-content bg-purple">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple" style="border-right: 1px solid #DCDEE3;padding: 0 6px">
                            <ul class="rightTab">
                                <li class="active"><span>稿签</span></li>
                                <li><span>文稿<br/>纠错</span></li>
                                <li><span>敏感词<br/>检测</span></li>
                                <li><span>原创<br/>分析</span></li>
                                <li><span>AI<br/>改写</span></li>
                                <li><span>自动<br/>配图</span></li>
                                <li><span>综合<br/>分析</span></li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content bg-purple-light">
                            <div slot="open">
                                    <ImgCutter  ref="imgCutterModal"
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
                                                @cutDown="xztpCutDown">
                                                <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button>
                                    </ImgCutter>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
//主体文件引入
// import Nav from "../nav"
import Ueditor from "../tool/ueditor"
import ImgCutter from 'vue-img-cutter'
    
export default {
    name: 'mask',
    data() {
        return {
            tabPosition: 'left',
            input:""
        };
    },
    methods :{
        xztpCutDown(fileName) { 
            console.log(fileName)
        }
    },
    components:{
        Ueditor,ImgCutter
    }
};

</script>

<style scoped>
.iconNav {
    float: left;
}
.iconNav ul {
    width: 60px;
    margin-left: 16px;
    margin-top: 24px;;
}
.iconNav li{
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 72px;
    text-align: center;
    background: #fff;
    margin-bottom:16px;
}
.iconNav li i {
    font-size: 30px;
    color: #999999;
}
/* 导航展示内容 */
.NavContainer {
    width: 350px;
    background: #fff;
    height: 100%;
    margin-left: 90px;
}

.el-row,.el-row>div{
    height: 100%;
}
.Signature {
    background: #fff;
    padding: 0!important;
}
.maskContainer {
    background: #f0f0f0;
    height: 100%;
}
.grid-content {
    height: 100%;
}
.el-tabs__nav-wrap::after {
    background-color: transparent;
}
/* 右侧功能切换 */ 
.rightTab li{
    text-align: center;
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
.rightTab li.active {
    background: #F5F7FA;
    color: #D72323;
    
}
.rightTab li span{
    display:block;
    width: 100%;
    text-align: center;
}
.upDataImg {
    width: 100px;
    height: 100px;
    background: #f6f7f9;
    border: 1px dashed #dfe1e5;
    cursor: pointer;
}
</style>