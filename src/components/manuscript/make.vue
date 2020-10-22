<template>
  <div class="maskContainer">
    <!-- <Nav></Nav> -->
    <!--下面通过传递进来的id完成初始化-->
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content bg-purple">
               <div class="iconNav">
                   <ul>
                       <li  @click="leftToggle('letfTab1')" :class="{Navcurrent:Navcurrent=='letfTab1'}"><i class="el-icon-s-unfold"></i></li>
                       <li  @click="leftToggle('letfTab2')" :class="{Navcurrent:Navcurrent=='letfTab2'}"><i class="el-icon-s-order" ></i></li>
                       <li  @click="leftToggle('letfTab3')" :class="{Navcurrent:Navcurrent=='letfTab3'}"><i class="el-icon-star-on"></i></li>
                   </ul>
               </div>
               <div class="NavContainer">
                    <component :is="Navcurrent" :uestrvalue = uedstr></component>
               </div>
            </div>
        </el-col>
        <el-col :span="11">
            <div class="grid-content bg-purple" style="position:relative">
                <div class="">
                    <el-input type="text" v-model="input" placeholder="请输入内容" maxlength="100" show-word-limit style="width:500px;position: relative;margin: 16px 0;left: 50%;transform: translateX(-50%);"></el-input>
                </div>
                <Ueditor @listenEvent = 'uedior'></Ueditor>
            </div>
        </el-col>
        <el-col :span="7" class="Signature">
            <div class="grid-content bg-purple">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple" style="border-right: 1px solid #DCDEE3;padding: 0 6px">
                            <ul class="rightTab">
                                <li v-for="(tab,index) in tabs" @click="toggle(index,tab)" :class="{active:active==index}">
                                    <span>{{tab.view}}</span>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="21" style="overflow:auto;padding-top:16px;">
                        <!--:is实现多个组件实现同一个挂载点-->
                        <component :is="currentView"></component>
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
import Tab1 from "../Auxiliary/Signature"
import Tab2 from "../Auxiliary/correction"
import Tab3 from "../Auxiliary/sensitiveWords"
import letfTab1 from "../leftmenu/templates"
import letfTab2 from "../leftmenu/articleedit"
import letfTab3 from "../leftmenu/collection"
import Tab4 from "../Auxiliary/pictureMatching"
export default {
    name: 'mask',
    data() {
        return {
            tabPosition: 'left',
            input:"",
            active:0,
            currentView:'Tab1',
            Navcurrent:'letfTab1',
            uedstr:'' ,//获取ueditor根据符号检索的值
            tabs:[
                {
                    type:'Tab1',
                    view:'稿签'
                },
                {
                    type:'Tab2',
                    view:'文稿纠错'
                },
                {
                    type:'Tab3',
                    view:'敏感词检测'
                },
                // {
                //     type:'tab2',
                //     view:'原创 分析'
                // },
                // {
                //     type:'tab1',
                //     view:'AI改写'
                // },
                // {
                //     type:'Tab4',
                //     view:'自动配图'
                // },
                // {
                //     type:'tab2',
                //     view:'综合 分析'
                // }
            ]
        };
    },
    methods :{
        xztpCutDown(fileName) { 
            console.log(fileName)
        },
        toggle(i,v){
            this.active=i;
            this.currentView=v.type;
        },
        leftToggle(v){
          this.Navcurrent = v
        },
        uedior(param){  //获取ueditor根据符号检索的值
          this.uedstr = param
          console.log(this.uedstr,"++++++++++")
        }

    },
    components:{
        Tab1,Tab2,Tab3,Ueditor,letfTab1,letfTab2,letfTab3,Tab4
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
    width: 400px;
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

ul li.active{
 background:#333;
}

/*右边菜单点击事件 */
.Navcurrent i{
  color:red !important;
}

</style>