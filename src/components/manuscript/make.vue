<template>
  <div class="maskContainer">
    <!-- <Nav></Nav> -->
    <!--下面通过传递进来的id完成初始化-->
    <el-row :gutter="10" style="background:#eff2f7;">
        <el-col :span="6">
            <div class="grid-content bg-purple">
               <div class="iconNav">
                   <ul>
                       <li  @click="leftToggle('letfTab1')" :class="{Navcurrent:Navcurrent=='letfTab1'}"><b></b><i class="el-icon-s-unfold"></i><p>资源</p><div class='saucxs'></div></li>
                       <li  @click="leftToggle('letfTab2')" :class="{Navcurrent:Navcurrent=='letfTab2'}"><b></b><i class="el-icon-s-order" ></i><p>供稿</p><div class='saucxs'></div></li>
                       <li  @click="leftToggle('letfTab3')" :class="{Navcurrent:Navcurrent=='letfTab3'}"><b></b><i class="el-icon-star-on"></i><p>收藏</p><div class='saucxs'></div></li>
                   </ul>
               </div>
               <div class="NavContainer">
                    <component :is="Navcurrent" :uestrvalue = uedstr></component>
               </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple conetnts" style="position:relative">
                <div :style="{'margin-left': inputLeft}">
                    <el-input type="text" v-model="input" @input="inputChange" placeholder="请输入内容" maxlength="300" show-word-limit :style="{'width':inputWidth,'margin':'16px 0'}" style="border:none"></el-input>
                    <Ueditor @listenEvent = 'uedior' @listenup = 'uedior2' style="height:100%"></Ueditor>
                </div>
            </div>
        </el-col>
        <el-col :span="6" class="Signature">
            <div class="grid-content bg-purple">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple" style="border-right: 1px solid #DCDEE3;padding: 0 6px">
                            <ul class="rightTab">
                                <li v-for="(tab,index) in tabs" @click="toggle(index,tab)" :class="{active:active==index}">
                                    <el-tooltip  popper-class="atooltip" effect="dark" :content="tab.name" placement="left">
                                        <div  v-html='tab.view'>

                                        </div>
                                    </el-tooltip>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="21" style="overflow:auto;padding-top:16px;">
                        <!--:is实现多个组件实现同一个挂载点-->
                        <Tab1 :style='style1'/>
                        <Tab2 :style='style2'/>
                        <Tab3 :style='style3'/>
                        <Tab4 :style='style4'/>
                        <Tab5 :style='style5'/>
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
import Tab5 from "../Auxiliary/comprehensive"
import { store } from '@/store'
import { ilgcreations } from '@/http/api'
import {mapActions, mapGetters} from 'vuex';
export default {
    name: 'maskaa',
    data() {
        return {
            tabPosition: 'left',
            input:"",
            active:0,
            form:'',
            currentView:'Tab1',
            Navcurrent:'letfTab1',
            uedstr:'' ,//获取ueditor根据符号检索的值
            inputLeft:"calc(50% - "+store.ueditorWidth/2+"px)",
            inputWidth:store.ueditorWidth+"px",
            style1:'display:block',
            style2:'display:none',
            style3:'display:none',
            style4:'display:none',
            style5:'display:none',
            leftstyle1:'display:block',
            leftstyle2:'display:none',
            leftstyle3:'display:none',
            tabs:[
                {
                    type:'Tab1',
                    view:`<svg width="17px" height="19px" viewBox="0 0 17 19" version="1.1">
                            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="资源1" transform="translate(-1458.000000, -86.000000)">
                                    <g id="tab" transform="translate(1443.000000, 66.000000)">
                                        <g id="ico_1" transform="translate(11.000000, 17.000000)">
                                            <rect id="矩形备份-19" x="0" y="0" width="24" height="24"></rect>
                                            <g transform="translate(4.000000, 3.000000)" class='viewsvg' fill="#000000" fill-rule="nonzero">
                                                <path d="M5.92141249,15.9421282 L1.05434065,15.9421282 L1.05434065,1.05787182 L14.9457016,1.05787182 L14.9457016,8.46297449 C14.9457016,8.75509772 15.1817012,8.99191039 15.4728213,8.99191039 C15.7639415,8.99191039 16,8.75509772 16,8.46297449 L16,0.994399507 C16.0058044,0.452397146 15.573673,0.00773917329 15.0335549,0 L0.977029767,0 C0.715478279,0 0.464838495,0.105187531 0.281219382,0.292090416 C0.0976002695,0.4789933 -0.00366206423,0.731974001 0,0.994399507 L0,16.0056005 C-0.00576210805,16.5476029 0.42636933,16.9922608 0.966487373,17 L5.92141249,17 C6.21253265,17 6.44853215,16.7631873 6.44853215,16.4710641 C6.44853215,16.1789409 6.21253265,15.9421282 5.92141249,15.9421282 Z" id="路径"></path>
                                                <path d="M12,3.5 C12,3.22385763 11.7611761,3 11.4665718,3 L2.53342817,3 C2.23882392,3 2,3.22385763 2,3.5 C2,3.77614237 2.23882392,4 2.53342817,4 L11.4665718,4 C11.7611761,4 12,3.77614237 12,3.5 L12,3.5 Z" id="路径"></path>
                                                <path d="M8,13.5 C8,13.2238576 7.74269238,13 7.42528736,13 L2.57471264,13 C2.25730762,13 2,13.2238576 2,13.5 C2,13.7761424 2.25730762,14 2.57471264,14 L7.42528736,14 C7.74269238,14 8,13.7761424 8,13.5 Z" id="路径"></path>
                                                <path d="M2.56390978,8 C2.25247101,8 2,8.22385763 2,8.5 C2,8.77614237 2.25247101,9 2.56390978,9 L9.43609025,9 C9.74752901,9 10,8.77614237 10,8.5 C10,8.22385763 9.74752901,8 9.43609025,8 L2.56390978,8 Z" id="路径"></path>
                                                <path d="M16.8342608,11.1716832 C16.7879703,10.5462754 16.2719277,10.0575798 15.6408369,10.0415032 L13.3027003,10.0000142 L13.2783447,10.0000142 C12.9435969,9.99840537 12.6228526,10.1333457 12.3911053,10.3732992 L8.25761386,14.6797342 C8.08836238,14.856583 7.99588705,15.0924391 8.00014049,15.3364137 C8.00643771,15.5704846 8.10516875,15.7927024 8.27501071,15.9550749 L11.2289958,18.7546032 C11.3931279,18.912543 11.6128492,19.0005906 11.8413649,18.999997 L11.8865967,18.999997 C12.1234848,18.9899119 12.3470087,18.8881971 12.5094039,18.716585 L16.6498541,14.4066937 C16.8919136,14.1660058 17.0185763,13.8338424 16.9977911,13.4942549 L16.8342608,11.1716832 Z M15.8948309,13.6878025 L11.8448443,17.9043761 L9.10310076,15.3053078 L13.1530874,11.0887342 C13.1871241,11.054793 13.2336025,11.0360758 13.281824,11.0368655 L13.281824,11.0368655 L15.6164813,11.0783656 C15.7072836,11.0800082 15.7815364,11.1507561 15.7869704,11.2408073 L15.9400627,13.5599228 C15.9444642,13.60706 15.9279464,13.6537593 15.8948309,13.6878025 Z" id="形状"></path>
                                                <path d="M13.4567735,12.0004332 C13.0608932,12.0088053 12.6850768,12.1763255 12.4141841,12.4651677 C11.842691,13.0647734 11.8654182,14.0141961 12.4649468,14.5857627 C13.0644754,15.1573293 14.0137761,15.1345991 14.5852692,14.5349934 L14.5852692,14.5349934 C15.0040844,14.0960754 15.1172048,13.4480141 14.8718587,12.8931357 C14.6265126,12.3382572 14.0710437,11.9858966 13.4645831,12.0004332 L13.4567735,12.0004332 Z M13.7301115,13.7265898 C13.6698787,13.789738 13.5869691,13.8262792 13.4997266,13.8281284 C13.4138764,13.8247808 13.3315265,13.7932093 13.2654368,13.7383058 C13.2022967,13.6780652 13.1657602,13.5951449 13.1639113,13.5078912 C13.1607282,13.4208174 13.1931585,13.3362057 13.2537224,13.2735713 C13.3139551,13.210423 13.3968648,13.1738819 13.4841073,13.1720314 L13.4841073,13.1720314 C13.6155554,13.1716594 13.7345307,13.2498068 13.7864135,13.3705987 C13.8382962,13.4913906 13.8130646,13.631494 13.7223019,13.7265898 L13.7301115,13.7265898 Z" id="形状"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>`,
                    name:'稿签',
                },
                {
                    type:'Tab2',
                    view:`<svg width="19px" height="20px" viewBox="0 0 19 20" version="1.1" >
                                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="资源1" transform="translate(-1457.000000, -145.000000)">
                                        <g id="tab" transform="translate(1443.000000, 66.000000)">
                                            <g id="ico_7" transform="translate(11.000000, 77.000000)">
                                                <rect id="矩形备份-14" x="0" y="0" width="24" height="24"></rect>
                                                <g transform="translate(3.000000, 2.000000)" class='viewsvg' fill="#000000" fill-rule="nonzero">
                                                    <path d="M8.5,0 C3.80557963,0 0,4.02943725 0,9 C0,13.9705627 3.80557963,18 8.5,18 C13.1944204,18 17,13.9705627 17,9 C17,6.61305159 16.1044669,4.32386638 14.5104076,2.63603897 C12.9163484,0.948211563 10.7543402,0 8.5,0 Z M8.5,16.92 C4.36891007,16.92 1.02,13.3740952 1.02,9 C1.02,4.62590478 4.36891007,1.08 8.5,1.08 C12.6310899,1.08 15.98,4.62590478 15.98,9 C15.98,13.3740952 12.6310899,16.92 8.5,16.92 Z" id="形状"></path>
                                                    <path d="M18.8611825,19.052422 L15.9042349,16.1511503 C15.7655008,16.0158662 15.5670261,15.966867 15.3835742,16.0226103 C15.2001224,16.0783536 15.0595641,16.2303706 15.0148464,16.4213979 C14.9701287,16.6124253 15.0280452,16.8134415 15.1667793,16.9487256 L18.1237269,19.8499973 C18.2196233,19.9446425 18.3469932,19.9982716 18.4799857,20 C18.6952688,19.9940438 18.886032,19.8559584 18.9638635,19.6497413 C19.041695,19.4435242 18.9913827,19.2094804 18.8362444,19.0560806 L18.8611825,19.052422 Z" id="路径"></path>
                                                    <path d="M9.22921688,9.4919886 L11.7441852,6.86609378 C11.8709766,6.73407252 11.9175674,6.54456851 11.8664074,6.36896607 C11.8152474,6.19336362 11.674109,6.05834094 11.4961576,6.01475976 C11.3182063,5.97117858 11.1304771,6.02565991 11.0036857,6.15768118 L8.50577957,8.76995267 L5.87478824,6.25985607 C5.74356422,6.12818521 5.55108279,6.07795988 5.37208104,6.12868168 C5.1930793,6.17940348 5.05575582,6.32308208 5.01343087,6.50392965 C4.97110592,6.68477721 5.03044704,6.87430438 5.16841314,6.99892115 L7.79940447,9.50901775 L5.2844361,12.1383184 C5.08947426,12.3424435 5.09711136,12.6656296 5.3014983,12.8603543 C5.39460855,12.9465177 5.51582719,12.9961211 5.64274231,13 C5.78197596,13.000707 5.91532809,12.9440189 6.01128585,12.8433252 L8.52625421,10.2140245 L11.160658,12.7241211 C11.2525127,12.8122273 11.3745146,12.8621511 11.501902,12.8637601 C11.7081119,12.8582155 11.8908353,12.7296704 11.9653865,12.5377008 C12.0399377,12.3457312 11.9917458,12.1278575 11.843146,11.985056 L9.22921688,9.4919886 Z" id="路径"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>`,
                    name:'文稿纠错',
                },
                {
                    type:'Tab3',
                    view:`<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
                            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="资源1" transform="translate(-1456.000000, -189.000000)">
                                    <g id="tab" transform="translate(1443.000000, 66.000000)">
                                        <g id="ico_6" transform="translate(11.000000, 121.000000)">
                                            <rect id="矩形备份-15" x="0" y="0" width="24" height="24"></rect>
                                            <g transform="translate(2.000000, 2.000000)" class='viewsvg' fill="#000000" fill-rule="nonzero">
                                                <path d="M14.1248741,10.2379273 L13.4159114,10.2379273 L11.115475,4.07986345 C10.8787714,3.42921925 10.2273812,2.99434014 9.49815374,3.00005567 L9.49815374,3.00005567 C8.77028054,2.99584308 8.12079678,3.43044164 7.88452501,4.07986345 L5.58408862,10.2379273 L4.87512588,10.2379273 C4.64302807,10.2379273 4.42043637,10.324898 4.25631844,10.4797068 C4.0922005,10.6345157 4,10.8444815 4,11.0634143 L4,12.1710299 C4,12.6275007 4.39121052,12.9980821 4.87512588,13 L14.1248741,13 C14.6087895,12.9980821 15,12.6275007 15,12.1710299 L15,11.0634143 C15,10.6075104 14.6081928,10.2379273 14.1248741,10.2379273 L14.1248741,10.2379273 Z M13.8922457,11.9550797 L5.10775428,11.9550797 L5.10775428,11.2828476 L5.97549513,11.2828476 C6.2096476,11.2822268 6.41808944,11.142781 6.49613964,10.9345408 L8.92950655,4.42817023 C9.01541855,4.20055278 9.24385777,4.04853959 9.5,4.04853959 C9.75614223,4.04853959 9.98458145,4.20055278 10.0704935,4.42817023 L12.5038604,10.9345408 C12.5819106,11.142781 12.7903524,11.2822268 13.0245049,11.2828476 L13.8922457,11.2828476 L13.8922457,11.9550797 Z" id="形状"></path>
                                                <path d="M9.5,5 C9.22385763,5 9,5.26460712 9,5.59101655 L9,9.40898345 C9,9.73539288 9.22385763,10 9.5,10 C9.77614237,10 10,9.73539288 10,9.40898345 L10,5.59101655 C10,5.26460712 9.77614237,5 9.5,5 Z" id="路径"></path>
                                                <circle id="椭圆形" cx="9.5" cy="11.5" r="1"></circle>
                                                <path d="M9,0 C4.02943725,0 0,4.02943725 0,9 C0,13.9705627 4.02943725,18 9,18 C13.9705627,18 18,13.9705627 18,9 C18,6.61305159 17.0517884,4.32386638 15.363961,2.63603897 C13.6761336,0.948211563 11.3869484,0 9,0 Z M9,16.92 C4.62590478,16.92 1.08,13.3740952 1.08,9 C1.08,4.62590478 4.62590478,1.08 9,1.08 C13.3740952,1.08 16.92,4.62590478 16.92,9 C16.92,13.3740952 13.3740952,16.92 9,16.92 Z" id="形状"></path>
                                                <path d="M19.8611825,19.052422 L16.9042349,16.1511503 C16.7655008,16.0158662 16.5670261,15.966867 16.3835742,16.0226103 C16.2001224,16.0783536 16.0595641,16.2303706 16.0148464,16.4213979 C15.9701287,16.6124253 16.0280452,16.8134415 16.1667793,16.9487256 L19.1237269,19.8499973 C19.2196233,19.9446425 19.3469932,19.9982716 19.4799857,20 C19.6952688,19.9940438 19.886032,19.8559584 19.9638635,19.6497413 C20.041695,19.4435242 19.9913827,19.2094804 19.8362444,19.0560806 L19.8611825,19.052422 Z" id="路径"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>`,
                    name:'敏感词检测',
                },
                // {
                //     type:'tab2',
                //     view:'原创 分析'
                // },
                // {
                //     type:'tab1',
                //     view:'AI改写'
                // },
                {
                    type:'Tab4',
                    view:`<svg width="19px" height="18px" viewBox="0 0 19 18" version="1.1">
                
                            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="资源1" transform="translate(-1457.000000, -338.000000)">
                                    <g id="tab" transform="translate(1443.000000, 66.000000)">
                                        <g id="ico_3" transform="translate(11.000000, 269.000000)">
                                            <rect id="矩形备份-18" x="0" y="0" width="24" height="24"></rect>
                                            <g transform="translate(3.000000, 3.000000)" class='viewsvg' fill="#000000" fill-rule="nonzero">
                                                <path d="M14,11.6166667 L14,1.39 C14,0.61 13.461,0 12.7715,0 L1.2215,0 C0.539,0 0,0.61 0,1.39 L0,11.6166667 C0,12.3966667 0.539,13 1.2285,13 L12.7785,13 C13.461,13 14,12.3966667 14,11.6166667 Z M1.2285,1 L12.7785,1 C12.824,1 12.957,1.14333333 12.957,1.39 L12.957,6.79666667 C12.376,5.79666667 11.536,4.76666667 10.5245,4.76666667 C9.1245,4.76666667 8.4245,6.38666667 7.812,7.81666667 C7.5775,8.35666667 7.0315,9.62 6.762,9.62 C6.2125,9.62 5.761,9.1 5.2815,8.55333333 C4.711,7.90333333 4.067,7.16666667 3.0765,7.16666667 C2.2155,7.16666667 1.533,7.78 1.05,8.43333333 L1.05,1.39 C1.05,1.14333333 1.1865,1 1.2285,1 Z M1.05,11.6166667 L1.05,10.4966667 C1.11840823,10.4422458 1.17136269,10.3723275 1.204,10.2933333 C1.47,9.6 2.282,8.16666667 3.0765,8.16666667 C3.5735,8.16666667 4.011,8.66666667 4.4765,9.19333333 C5.061,9.86 5.726,10.62 6.7655,10.62 L6.7655,10.62 C7.7315,10.62 8.218,9.49666667 8.7815,8.2 C9.2505,7.11666667 9.8315,5.76666667 10.5315,5.76666667 C11.2945,5.76666667 12.341,7.64333333 12.81,8.91 C12.8412122,8.99254248 12.8942545,9.06602095 12.964,9.12333333 L12.964,11.6166667 C12.964,11.8666667 12.831,12.01 12.7855,12.01 L1.2355,12.01 C1.1865,12 1.05,11.8666667 1.05,11.6166667 Z" id="形状"></path>
                                                <path d="M8,13.3055614 L13.8581297,14.9484911 C14.5276159,15.1346318 15.2391038,14.8004104 15.4478824,14.2017049 L17.9413986,7.09424828 C18.0425905,6.80663145 18.0118579,6.49482958 17.8559671,6.22749045 C17.7000763,5.96015132 17.4318084,5.75919346 17.1102265,5.66886069 L14.7292271,5 L14.7292271,6.01952552 L16.783565,6.58773242 C16.8299365,6.60043207 16.8686971,6.62920647 16.8911995,6.66763642 C16.913702,6.70606638 16.9180742,6.75095453 16.9033409,6.7922869 L14.4098247,13.9029904 C14.3956667,13.9436373 14.3638882,13.9775122 14.3215968,13.9970387 C14.2793054,14.0165651 14.2300298,14.0201138 14.1847912,14.0068911 L11.6440906,13.2958207 L8,13.3055614 Z" id="路径"></path>
                                                <path d="M18.163301,9 L18.163301,9 L17.8593382,9.96489162 C17.948502,9.99232931 17.9987191,10.0852036 17.9720435,10.1733351 L15.8340579,16.8737845 C15.8046812,16.9620134 15.7093002,17.0111949 15.6188932,16.9847303 L6.52391595,14.1774672 L4,14.1774672 C4.14909965,14.4014552 4.37234042,14.5677567 4.63183282,14.648146 L15.3115151,17.9462599 C15.9413549,18.1394593 16.6114066,17.7953903 16.8108373,17.1763638 L18.9454076,10.4759144 C19.1416711,9.85590771 18.7921452,9.19631705 18.163301,9 L18.163301,9 Z" id="路径"></path>
                                                <circle id="椭圆形" cx="5" cy="4" r="1"></circle>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>`,
                    name:'自动配图',
                },
                {
                    type:'Tab5',
                    view:`<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" >
                            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="资源1" transform="translate(-1457.000000, -382.000000)">
                                    <g id="tab" transform="translate(1443.000000, 66.000000)">
                                        <g id="ico_2" transform="translate(11.000000, 313.000000)">
                                            <rect id="矩形备份-19" x="0" y="0" width="24" height="24"></rect>
                                            <g transform="translate(3.000000, 3.000000)"  class='viewsvg' fill="#000000" fill-rule="nonzero">
                                                <path d="M17.5804284,10.0993405 C17.4441518,10.0714022 17.3023975,10.0989498 17.1863649,10.1759202 C17.0703323,10.2528906 16.9895313,10.3729753 16.9617459,10.5097443 C16.1570028,14.4272195 12.6135241,17.1615303 8.6341047,16.9357344 C4.65468528,16.7099386 1.4409234,13.5922159 1.08134146,9.60867588 C0.721759525,5.6251359 3.32493444,1.9786211 7.19914499,1.03888636 C7.4809901,0.971082154 7.65469796,0.686828522 7.58713235,0.403988106 C7.51956674,0.12114769 7.23631339,-0.0531735978 6.95446828,0.0146306115 C2.57450346,1.07638289 -0.368848892,5.19853705 0.0373894922,9.70197404 C0.443627876,14.205411 4.076776,17.7301261 8.57553539,17.9852948 C13.0742948,18.2404636 17.0800733,15.1490269 17.9893881,10.7202079 C18.017228,10.58345 17.9897773,10.4411951 17.9130778,10.3247527 C17.8363783,10.2083104 17.7167162,10.127224 17.5804284,10.0993405 Z" id="路径"></path>
                                                <path d="M8.54545455,10 L17.4545455,10 C17.7557917,10 18,9.75579168 18,9.45454545 C18,4.23294418 13.7670558,0 8.54545455,0 C8.24420832,0 8,0.244208318 8,0.545454545 L8,9.45454545 C8,9.75579168 8.24420832,10 8.54545455,10 Z M9.09090909,1.10909091 C13.2800088,1.38305398 16.616946,4.71999122 16.8909091,8.90909091 L9.09090909,8.90909091 L9.09090909,1.10909091 Z" id="形状"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>`,
                    name:'综合分析',
                },

            ],
            letfTab1Idx : 0,
            letfTab2Idx : 0,
            letfTab3Idx : 0,
        };
    },
    watch:{
        form(newVal){
            deep:true;
        },
        resTitle(newVal){
            this.input = newVal
        }
    }, 
    provide(){
        return {
            'app':this
        }
    },
    computed:{
        ...mapGetters(["resTitle"])
    },
    methods :{
        toggle(i,v){
            this.active=i;
            this.currentView=v.type;

            if(i==0){
               this.style1 = 'display:block'
               this.style2 = 'display:none'
               this.style3 = 'display:none'
               this.style4 = 'display:none'
               this.style5 = 'display:none'
            }else if(i==1){
               this.style1 = 'display:none'
               this.style2 = 'display:block'
               this.style3 = 'display:none'
               this.style4 = 'display:none'
               this.style5 = 'display:none'
            }else if(i==2){
               this.style1 = 'display:none'
               this.style2 = 'display:none'
               this.style3 = 'display:block'
               this.style4 = 'display:none'
               this.style5 = 'display:none'
            }else if(i==3){
               this.style1 = 'display:none'
               this.style2 = 'display:none'
               this.style3 = 'display:none'
               this.style4 = 'display:block'
               this.style5 = 'display:none'
            }else if(i==4){
               this.style1 = 'display:none'
               this.style2 = 'display:none'
               this.style3 = 'display:none'
               this.style4 = 'display:none'
               this.style5 = 'display:block'
            }
            
        },
        leftToggle(v){
          this.Navcurrent = v
        },
        uedior(param){  //获取ueditor根据符号检索的值
          this.uedstr = param;
          this.Navcurrent = 'letfTab2'

          store.uedstr = param
          console.log(param)
        },

        uedior2(){
               this.style1 = 'display:none'
               this.style2 = 'display:none'
               this.style3 = 'display:none'
               this.style4 = 'display:block'
               this.style5 = 'display:none'

               this.active = '3'
        },

        inputChange(e){
            this.$store.dispatch('modifyDataTitle',this.input);
        },
        
    },
    components:{
        Tab1,Tab2,Tab3,Ueditor,letfTab1,letfTab2,Tab4,letfTab3,Tab5
    }
};

</script>
<style>
.Signature .el-col-3{
  width: 46px;
}
.conetnts .el-input__inner{
    border:none;
    border-radius: 5px;
}

/* /箭头颜色修改 */
.el-tooltip__popper .popper__arrow {
  border-width: 6px;
  border-color: #0170FF;
}

/* //左箭头 */
.el-tooltip__popper[x-placement^=left] .popper__arrow:after {
  border-left-color: #0170FF !important;
}
.el-tooltip__popper[x-placement^=left] .popper__arrow{
  border-color:#ffffff;
  border-left-color: #0170FF !important;
}
.atooltip{
    background: #0170FF !important;
}
.active .viewsvg{
    fill:#0170FF
}
</style>
<style scoped>

.iconNav {
    float: left;
    height: 100%;
    width: 64px;
}
.iconNav ul {
    width: 100%;
    height: 100%;
    background: #ffffff;
}
.iconNav li{
    width: 64px;
    height: 60px;
    display: inline-block;
    text-align: center;
    background: #fff;
    margin-bottom:16px;
    position: relative;
}
.iconNav li b{
    display:none
}
.iconNav ul li p{
    font-size: 12px;
}
.iconNav li i {
    font-size: 30px;
    color: #999999;
    padding-top: 6px;
}
/* 导航展示内容 */
.NavContainer {
    width: 390px;
    background: #fff;
    height: 100%;
    margin-left: 65px;
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
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    padding-left: 8px;
}
.rightTab li.active .viewsvg{
    /* background: #F5F7FA;
    color: #D72323; */
    fill:red
}
.rightTab li span{
    display:block;
    width: 100%;
    text-align: center;
}

ul li.active img{
 /* background:#333; */
 fill:red
}

/*右边菜单点击事件 */
.Navcurrent b{
    display:block !important;
    background: #D72323 !important;
    width: 6px !important;
    position:absolute;
    left: 0;
    height: 60px;

}

.Navcurrent i,.Navcurrent p{
  color:#D72323 !important;
}
.Navcurrent .saucxs{
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 10px solid white;
    border-bottom: 6px solid transparent;
    margin-left: 49px;
    margin-top: -30px;
}
.el-textarea__inner,.el-input__inner{
    border: 1px solid #A0A2B2;
}

</style>