<template>
  <div>
    <!--下面通过传递进来的id完成初始化-->
    <div style="position:relative;">
        <div :id="randomId" ref="ueditor"></div>
        <div class="OperationButton">
            <ul> 
               <li v-if="storyDeliver"><el-button type="text" @click="opaBtn1"><a href="javascript:" style="color:#fff;"><i class="el-icon-position" style="color: #d72323;font-size: 18px;"></i></a><span>传稿</span></el-button></li>
               <li v-if="storyCheckin"><el-button type="text" @click="opaBtn2"><a href="javascript:" style="color:#fff;"><i class="el-icon-link" style="color: #d72323;font-size: 18px;"></i></a><span>签入</span></el-button></li>
               <li v-if="storySubmit"><el-button type="text" @click="opaBtn3"><a href="javascript:" style="color:#fff;"><i class="el-icon-finished" style="color: #d72323;font-size: 18px;"></i></a><span>提交</span></el-button></li>
               <!-- <li v-if="storyCheckin"><el-button type="text" @click="opaBtn4"><a href="javascript:" @click="hasUe" style="color:#fff;"><img src="@/assets/icon1.png"  width="20" alt=""></a><span>测试</span></el-button></li> -->
                <li v-if="storySubmitApprove"><el-button type="text" @click="censorshipfun"><a href="javascript:" style="color:#fff;"><i class="el-icon-top" style="color: #d72323;font-size: 18px;"></i></a><span>送审</span></el-button></li>
               <li v-if="storyApprovePass"><el-button type="text" @click="adoptFun"><a href="javascript:" style="color:#fff;"><i class="el-icon-s-operation" style="color: #d72323;font-size: 18px;"></i></a><span>通过</span></el-button></li>
               <li v-if="storyApprovePassAll"><el-button type="text" @click="finalJudgment"><a href="javascript:"  style="color:#fff;"><i class="el-icon-upload2" style="color: #d72323;font-size: 18px;"></i></a><span>终审</span></el-button></li>
               <li v-if="storyApproveDeny"><el-button type="text" @click="rejectFun"><a href="javascript:" @click="hasUe" style="color:#fff;"><i class="el-icon-sort-down" style="color: #d72323;font-size: 18px;"></i></a><span>驳回</span></el-button></li>

               <li><el-button type="text" @click="selectFun"  v-if="selectId"><a href="javascript:" @click="hasUe" style="color:#fff;"><i class="el-icon-date" style="color: #d72323;font-size: 18px;"></i></a><span>选用</span></el-button></li>
               <li><el-button type="text" @click="ChangeTimeFun"  v-if="ChangeTime"><a href="javascript:" @click="hasUe" style="color:#fff;"><i class="el-icon-c-scale-to-original" style="color: #d72323;font-size: 18px;"></i></a><span>改时</span></el-button></li>
                <li><el-button type="text" @click="contributionFun"  v-if="contribution"><a href="javascript:" style="color:#fff;"><i class="el-icon-smoking" style="color: #d72323;font-size: 18px;"></i></a><span>撤稿</span></el-button></li>
                <!-- <li><el-button type="text" @click="manyContributionFun"  v-if="manyContribution"><a href="javascript:" @click="hasUe" style="color:#fff;"><img src="@/assets/icon1.png"  width="20" alt=""></a><span>一键撤稿</span></el-button></li> -->
                <li><el-button type="text" @click="centerDialogVisible = true"><a href="javascript:" @click="hasUe" style="color:#fff;"><img src="@/assets/icon1.png"  width="20" alt=""></a><span>预览</span></el-button></li>
                <li><a href="javascript:" @click="save" >
                    <img src="@/assets/icon2.png" width="20" alt=""></a>保存
                </li>
                <li @mouseenter="onMouseOver" @mouseleave="onMouseOut" style="position:relative;"><a href="javascript:">
                    <img src="@/assets/icon3.png" width="20" alt=""></a>下载
                    <div style="position:absolute;left: 50px;top: 5px;">
                        <transition name="fade">
                            <ul class="download" v-if="show" >
                                <li @click="downloadImg">下载img</li>
                                <li @click="downloadPdf">下载pdf</li>
                            </ul>
                        </transition> 
                    </div>
                </li>
                <!-- <li><a href="javascript:"><img src="@/assets/icon4.png" width="20" alt=""></a>提交审核</li> -->
            </ul>
        </div>
        <el-dialog
            title=""
            :visible.sync="centerDialogVisible"
            width="400px" class="mobileM">
            <div class="mobileContainer" :style="styles" v-html="mobileHtml"></div>
            <div class="preview-btn">
                <div :class="[activeIndex==0?'active preview-btn1':'preview-btn1']" @click="mobileD">5.5寸以上</div>
                <div :class="[activeIndex==1?'active preview-btn2':'preview-btn2']" @click="mobileZ">5.5寸屏</div>
                <div :class="[activeIndex==2?'active preview-btn3':'preview-btn3']" @click="mobileX">5寸以下</div>
            </div>
        </el-dialog>
        <!-- 提交弹出框 -->
        <el-dialog
            title="提交"
            :visible.sync="hasSubmit"
            width="600px" :before-close="CloseSubmit">
            <Submit></Submit>
        </el-dialog>
        <!-- 传稿弹出框 -->
        <el-dialog
            title="传稿"
            :visible.sync="hasAdopt"
            width="600px" :before-close="CloseSubmit">
            <Adopt></Adopt>
        </el-dialog>
        <!-- 签入弹出窗 -->
        <el-dialog
            title="签入"
            :visible.sync="hasCensorship"
            width="600px" :before-close="CloseSubmit">
            <Censorship></Censorship>
        </el-dialog>
        <!-- 送审弹出窗 -->
        <el-dialog
            title="送审"
            :visible.sync="hasCheckIn"
            width="600px" :before-close="CloseSubmit">
            <CheckIn></CheckIn>
        </el-dialog>
        <!-- 驳回弹出窗 -->
        <el-dialog
            title="驳回"
            :visible.sync="hasReject"
            width="800px" :before-close="CloseSubmit">
            <el-form :inline="true" class="demo-form-inline" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-table
                            :data="tableData"
                            style="width: 100%;" class="ssContainer">
                            <el-table-column
                                prop="time"
                            label="时间"
                                width="170">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approverGroup"
                                label="待审部门"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approverRole"
                                label="待审角色"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="approvers"
                                label="指定审批人"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="approvedBy"
                                label="审批人"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                label="选项">
                                <template slot-scope="scope">
                                     <el-radio class="radiusNone" v-if="scope.row.type" v-model="radio" :label="scope.row.lable" @change="rejectSelect(scope.row)"></el-radio>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24">
                        <div style="margin:10px;">备注</div>
                        <el-input type="textarea" v-model="commit" size="mini" placeholder="请输入备注内容" style="width:100%;margin-left:10px;margin-bottom:16px;"></el-input>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:right;">
                <el-button type="primary" @click="rejectSubmit"  size="mini">确定驳回</el-button>
                <el-button @click="closeModale"  size="mini">取消</el-button>
            </div>
        </el-dialog>

        <!-- 选用弹出窗 -->
        <el-dialog
            title="选用"
            :visible.sync="hasSelectId"
            width="600px" :before-close="CloseSubmit">
            <Selection></Selection>
        </el-dialog>

        <!-- 改时弹出窗 -->
        <el-dialog
            title="修改发布时间"
            :visible.sync="hasChangeTime"
            width="400px" :before-close="CloseSubmit">
            <ChangeTime></ChangeTime>
        </el-dialog>

        <!-- 一键撤稿弹出窗 -->
        <el-dialog
            title="一键撤稿"
            :visible.sync="hasManyContribution"
            width="600px" :before-close="CloseSubmit">
            <FinalJudgment></FinalJudgment>
        </el-dialog>
    </div>
  </div>
</template>

<script>
//主体文件引入
import '#/UEditor/themes/default/css/ueditor.min.css'
import '#/UEditor/ueditor.config.js'
import '#/UEditor/ueditor.all.min.js'
import '#/UEditor/lang/zh-cn/zh-cn.js'
// 保存生成图片资源加载
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
// 接口加载
import { submitData ,newSave,listBtn,releaseManuscript,deleteManuscript,subAdopt,subFinalJudgment,revision,withdraw,hasReject,subReject} from "@/http/api"
import { store} from '@/store'
import {mapActions, mapGetters} from 'vuex';
import Submit from "../Popup/submit"
import Adopt from "../Popup/adopt"
import Censorship from "../Popup/censorship"
import Selection from "../Popup/selection"
import CheckIn from "../Popup/checkIn"
import Reject from "../Popup/reject"
import ChangeTime from "../Popup/changeTime"
import FinalJudgment from "../Popup/finalJudgment"
export default {
    name: 'UE',
    props: {
        value: {
            default: function() {
                return ''
            }
        },
        
    },
    inject:['app'],
    data() {
        return {
            // submit:false,
            // adopt:false,
            // censorship:false,
            //每个编辑器生成不同的id,以防止冲突
            randomId: 'editor_' + (Math.random() * 100000000000000000),
            tableData:[],
            commit:'',
            radio:"",
            //编辑器实例
            instance: null,
            rejectUuid:"",
            centerDialogVisible: false,
            ready: false,
            enableAutoSave: false,
            ceshi:false,
            //配置可以传递进来
            ueditorConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 820,

                // 初始容器宽度
                initialFrameWidth: 800,
                toolbars: [
                    [
                    // 'anchor', //锚点
                    'undo', //撤销
                    'redo', //重做
                    'bold', //加粗
                    'indent', //首行缩进
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    // 'snapscreen', //截图
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    // 'subscript', //下标
                    // 'fontborder', //字符边框
                    // 'superscript', //上标
                    'formatmatch', //格式刷
                    // 'source', //源代码
                    // 'blockquote', //引用
                    // 'pasteplain', //纯文本粘贴模式
                    // 'selectall', //全选
                    // 'print', //打印
                    // 'preview', //预览
                    'horizontal', //分隔线
                    // 'removeformat', //清除格式
                    // 'time', //时间
                    // 'date', //日期
                    // 'unlink', //取消链接
                    // 'insertrow', //前插入行
                    // 'insertcol', //前插入列
                    // 'mergeright', //右合并单元格
                    // 'mergedown', //下合并单元格
                    // 'deleterow', //删除行
                    // 'deletecol', //删除列
                    // 'splittorows', //拆分成行
                    // 'splittocols', //拆分成列
                    // 'splittocells', //完全拆分单元格
                    // 'deletecaption', //删除表格标题
                    // 'inserttitle', //插入标题
                    // 'mergecells', //合并多个单元格
                    // 'deletetable', //删除表格
                    // 'cleardoc', //清空文档
                    // 'insertparagraphbeforetable', //"表格前插入行"
                    // 'insertcode', //代码语言
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    // 'simpleupload', //单图上传
                    // 'insertimage', //多图上传
                    // 'edittable', //表格属性
                    // 'edittd', //单元格属性
                    // 'link', //超链接
                    'emotion', //表情
                    // 'spechars', //特殊字符
                    'searchreplace', //查询替换
                    // 'map', //Baidu地图
                    // 'gmap', //Google地图
                    // 'insertvideo', //视频
                    // 'help', //帮助
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    // 'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    // 'fullscreen', //全屏
                    // 'directionalityltr', //从左向右输入
                    // 'directionalityrtl', //从右向左输入
                    // 'rowspacingtop', //段前距
                    // 'rowspacingbottom', //段后距
                    // 'pagebreak', //分页
                    // 'insertframe', //插入Iframe
                    // 'imagenone', //默认
                    'imageleft', //左浮动
                    'imageright', //右浮动
                    // 'attachment', //附件
                    'imagecenter', //居中
                    // 'wordimage', //图片转存
                    'lineheight', //行间距
                    // 'edittip ', //编辑提示
                    // 'customstyle', //自定义标题
                    // 'autotypeset', //自动排版
                    // 'webapp', //百度应用
                    // 'touppercase', //字母大写
                    // 'tolowercase', //字母小写
                    // 'background', //背景
                    // 'template', //模板
                    // 'scrawl', //涂鸦
                    // 'music', //音乐
                    'inserttable', //插入表格
                    // 'drafts', // 从草稿箱加载
                    // 'charts', // 图表
                ]
            ],
            
            },
            storyDeliver:false,
            storySubmit:false,
            storyCheckin:false,
            storySubmitApprove:false,
            storyApprovePass:false,
            storyApprovePassAll:false,
            storyApproveDeny:false,
            selectId:false,
            ChangeTime:false,
            contribution:false,
            manyContribution:false,
            styles:{
                "width":"348px",
                "height": "638.5px",
                "background":"url(http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/iPhone.png) no-repeat",
                "box-sizing":"border-box",
                "background-size": "100% 100%",
                "padding":"127px 38px 87px 47px"
            },
            eventName: "click",
            show:false,
            mobileHtml:"",
            activeIndex:2,
            ueconter:''
        };
    },
    created(){
        
    },
    watch: {
        value: function(val, oldVal) {
            if (val != null  && this.ready) {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                this.instance.setContent(val);
            }
        },
        reshtmlContent(newval){}
    },
    //此时--el挂载到实例上去了,可以初始化对应的编辑器了
    mounted() {
        this.initEditor();
        // 定时获取百度编辑器并赋值
        let that  = this;
        setTimeout(() => {
            that.instance.setContent(that.$store.state.htmlContent)
        }, 500);
        listBtn().then(res=>{

            res.forEach(item=>{
                switch(item.code){
                    case "story-deliver":
                        this.storyDeliver = true;
                        break;
                    case "story-submit":
                        this.storySubmit = true;
                        break;
                    case "story-checkin":
                        this.storyCheckin = true;
                        break;
                    case "story-submit-approve":
                        this.storySubmitApprove = true;
                        break;
                    case "story-approve-pass":
                        this.storyApprovePass = true;
                        break;
                    case "story-approve-passAll":
                        this.storyApprovePassAll = true;
                        break;
                    case "story-approve-deny":
                        this.storyApproveDeny = true;
                        break;
                    case "story-fetch":
                        this.selectId = true;
                        break;
                    case "publish-time":
                        this.ChangeTime = true;
                        break;
                    case "story-retract":
                        this.contribution = true;
                        break;
                    case "story-deep-retract":
                        this.manyContribution = true;
                        break;
                }
            })
        })
        window.addEventListener('beforeunload', e => {
            if(this.$store.state.title==""){
                deleteManuscript().then(res=>{})
            }else {
                releaseManuscript().then(res=>{})
            } 
        });
       
        // 驳回获取数据接口
        hasReject().then(res=>{
           res.records.forEach((item,index)=>{
               let status = '';
               switch(item.status){
                   case 0:
                        status = "待审批"
                         break
                    case 1:
                         status = "已驳回"
                         break
                    case 2:
                         status = "已通过"
                         break
                    case 3:
                         status = "已通过（终审）"
                         break
               }
               this.tableData.push({
                   time:this.timestampToTime (item.updated),
                   status:status,
                   approverGroup:item.approverGroup.name,
                   approverRole:item.approverRole.name,
                   approvers:item.approvers,
                   approvedBy:item.approvedBy?item.approvedBy.name:"",
                   type:item.approvedBy?true:false,
                   lable:(index+1),
                   uuid:item.approvedBy?item.approvedBy.uuid:""
               })
           })
        })
    },

    beforeDestroy() {
        // 组件销毁的时候，要销毁 UEditor 实例
        if(this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    },
    computed:{
        ...mapGetters(["reshtmlContent","resUeditor","hasSubmit","hasCensorship","hasAdopt","hasCheckIn","hasReject","hasSelectId","hasChangeTime","hasManyContribution"])
    },
    components:{
        Submit,Adopt,Censorship,CheckIn,Reject,Selection,ChangeTime,FinalJudgment
    },
    methods: {
        // 按钮操作
        opaBtn1(){
            this.$store.dispatch('modifyAdopt',true);
        },
        opaBtn2(){
            this.$store.dispatch('modifyCensorship',true);
        },
        opaBtn3(){
            this.$store.dispatch('modifySubmit',true);
        },
        CloseSubmit(){
            this.$store.dispatch('modifySubmit',false);
            this.$store.dispatch('modifyCensorship',false);
            this.$store.dispatch('modifyAdopt',false);
            this.$store.dispatch('modifyCheckIn',false);
            this.$store.dispatch('modifyReject',false);
            this.$store.dispatch('modifySelectId',false);
            this.$store.dispatch('modifyChangeTime',false);
            this.$store.dispatch('modifyManyContribution',false);
        },
        opaBtn4(){
            this.ceshi = true
        },
        censorshipfun (){
            this.$store.dispatch('modifyCheckIn',true);
        },
        // 驳回
        rejectFun(){
            this.$store.dispatch('modifyReject',true);
        },
        // 选用
        selectFun(){
            this.$store.dispatch('modifySelectId',true);
        },
        // 改时
        ChangeTimeFun(){
            this.$store.dispatch('modifyChangeTime',true);
        },
        // 一键撤稿
        manyContributionFun(){
            this.$store.dispatch('modifyManyContribution',true);
        },
        // 撤稿
        contributionFun(){
            withdraw().then(res=>{

            })
        },
        // 通过
        adoptFun(){
            let data = this.saveParme()
            subAdopt(data).then(res=>{
                if(res){
                    setTimeout(()=>{
                        window.close()
                    },5000)
                }
            })
        },
        // 终审
        finalJudgment(){
            let data = this.saveParme()
            subFinalJudgment(data).then(res=>{
                setTimeout(()=>{
                    window.close()
                },5000)
            })
        },
        
        initEditor() {
            const _this = this;
            //dom元素已经挂载上去了
            this.$nextTick(() => {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                this.instance.addListener('ready', () => {
                    this.ready = true;
                    this.$emit('ready', this.instance);

                    let _that = this

                    UE.dom.domUtils.on(this.instance.body,"keyup",function(oEvent){
                        
                        var oEvent = oEvent || window.oEvent; 
                        //获取键盘的keyCode值
                        var nKeyCode = oEvent.keyCode || oEvent.which || oEvent.charCode;

                        let selection = _that.instance.selection._bakRange
                        let str = _that.instance.getContentTxt()
                        console.log(str)
                        //do something
                        if(nKeyCode==13){
                         _that.ueconter = str
                        }else if(nKeyCode==188){
                            let newstr = str.substring(0,selection.endOffset+1);
                            let uearr = newstr.split(",")
                            let i = uearr.length-2<0?0:uearr.length-2
                            _that.ueconter = uearr[i]
                        }else if(nKeyCode==190){
                            let newstr = str.substring(0,selection.endOffset+1);
                            let uearr = newstr.split(",")
                            let i = uearr.length-2<0?0:uearr.length-2
                            _that.ueconter = uearr[i]
                        }
                        _that.$emit('listenEvent',_that.ueconter)
                    })

                });
                store.ueditor = this.instance;
            });
        },
        setText(con) {
            this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
            this.instance.setContent(con);
        },
        hasUe(){
            this.mobileHtml = this.instance.getContent();
        },
        saveParme(){
            let data = this.app.form;
            let customMetas = {
                // leadinLineUrl:data.properties.leadinLineUrl,
                // leadinLineStyle: data.leadinLineStyle,
                // originalCategory: data.originalCategory,
                watermark: data.propertie&&sdata.properties.watermark?1:0,
                ad: data.propertie&&data.properties.ad?1:0
            };
            if(this.$store.state.title =="") {
                return  this.$message.error('标题不能为空！');
            }
            let newData = {
                libid: data.libid,
                objid:store.objid,
                folder:data.folder,
                title: this.$store.state.title,
                keywords:data.dynamicTags?data.dynamicTags.join(","):"",
                content: "编辑器内容",
                summary: data.summary,
                signature: data.signature,
                linkHeadline: data.linkHeadline,
                level: data.levelId,
                comment: data.comment,
                reference: "",
                htmlContent:store.ueditor.getContent(),
                elated:"",
                topic:data.topicsId,
                newStory: false,
                origination:data.origination,
                sourceType: "用户创建",
                system: "智能采编",
                canComment: data.canComment?1:0,
                relateModifyStories:"", 
                coverType: data.coverType,
                defaultCoverSwitch: 0,
                isNewEditor: 0,
                primersTitle: "",
                subTitle:"",
                coverListCount: 0,
                sensitiveWord: false,
                customMetas:customMetas,
                ContentType:true,
                isSmartWriteEditor:1,
                newStory:data.isNew
            }
            // 封面图动态添加
            if(data.coverType == 1 && (/add\.png/.test(data.opaImg1) == false)) {
                newData["coverList[0].data"] = data.opaImg1;
                newData["coverList[0].ratioName"] ="1:1";
                newData["coverList[0].compressFlag"] = 1;
                newData.coverListCount = 1;
            }else if(data.coverType == 2 && (/add\.png/.test(data.opaImg2) == false)){
                newData["coverList[0].data"] = data.opaImg2;
                newData["coverList[0].ratioName"] ="1:1";
                newData["coverList[0].compressFlag"] = 1;
                newData.coverListCount = 1;
            }else if(data.coverType == 3){
                let count = 0;
                for(let i=0;i<3;i++) {
                    if(/add\.png/.test(data["opaImg"+(i+1)]) == false){
                        count ++;
                        newData["coverList["+i+"].data"] = data["opaImg"+(i+1)];
                        newData["coverList["+i+"].ratioName"] ="1:1";
                        newData["coverList["+i+"].compressFlag"] = 1;
                    }
                }
                newData.coverListCount = 3;
            }
            // 分享封面参数
            /add\.png/.test(data.addImg)?newData.shareCover= "":newData.shareCover= data.addImg;
            return newData
        },
        save(){
            let newData = this.saveParme();
            let href = window.location.href;
            newData.folderId = href.split("?")[1].split("&")[2].split("=")[1];
            if(newData.libid =="product") {
                revision(newData).then(res=>{
                    if(res) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                    }
                })
            }else {
                newSave(newData).then(res=>{
                    if(res) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                    }
                })
            }
        },
        onMouseOver(){
            this.show  = true
        },
        onMouseOut(){
            this.show  = false
        },
        downloadImg(){
           let body = this.instance.body;
            html2Canvas(body, {
                allowTaint: true,
                useCORS: true
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89
                let leftHeight = contentHeight
                let position = 0
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = pageData;
                a.download = Math.random() * 100000000000000000 + '.png';
                document.body.appendChild(a);
                a.click();
                // 移除元素
                document.body.removeChild(a);
            })
        },
        downloadPdf(){
            let body = this.instance.body;
            html2Canvas(body, {
                allowTaint: true,
                useCORS: true
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89
                let leftHeight = contentHeight
                let position = 0
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                // console.log(pageData)
                let PDF = new JsPDF('', 'pt', 'a4')
                if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight
                    position -= 841.89
                    if (leftHeight > 0) {
                    PDF.addPage()
                    }
                }
                }
                PDF.save(Math.random() * 100000000000000000 + '.pdf')
            })
        },
        mobileD(){
            this.activeIndex = 0;
            this.styles.width = "389px",
            this.styles.height = "725px"
            this.styles.background = "url(http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/iPhoneX.png) 0% 0% / 100% 100% no-repeat"
            
            this.styles.padding = "89px 23px 22px 16px;"
        },
        mobileZ(){
            this.activeIndex = 1;
            this.styles = {
                "width":"389px",
                "height": "713px",
                "background":"url(http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/iPhone.png) 0% 0% / 100% 100% no-repeat",
                "box-sizing":"border-box",
                "padding":"127px 38px 87px 47px"
            }
        },
        mobileX(){
            this.activeIndex = 2;
            this.styles = {
                "width":"348px",
                "height": "638.5px",
                "background":"url(http://qhcloudhongqi.wengegroup.com:9080/sprint/assets/img/iPhone.png) 0% 0% / 100% 100% no-repeat",
                "box-sizing":"border-box",
                "background-size": "100% 100%",
                "padding":"127px 38px 87px 47px"
            }
        },
        timestampToTime (data) {
            let date = new Date(data) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
            let D = date.getDate() + ' '
            let h = date.getHours() + ':'
            let m = date.getMinutes() + ':'
            let s = date.getSeconds()
            return Y+M+D+h+m+s
        },
        // 驳回提交
        rejectSubmit(){
            let data = this.saveParme();
            this.rejectUuid?data.recordId = this.rejectUuid:"";
            data.commit = this.commit;
            subReject(data).then(res=>{
                if(res) {
                    this.$message({
                        message: '稿件已驳回！',
                        type: 'success'
                    });
                }
            })
        },
        rejectSelect(data){
           this.radio = data.lable;
           this.rejectUuid = data.uuid;
        }
    }
};

</script>
<style scoped>
.edui-editort {
    margin: 0 auto;
}
.OperationButton {
    position:absolute;
    bottom: 0%;
    right: 20px;
}
.OperationButton  li a {
    height: 30px;
    width: 30px;
    margin: 0 auto;
    border-radius: 50%;
    background: #fff;
    display:block;
    text-align: center;
    line-height: 30px;
}
.OperationButton  li {
    margin-bottom: 10px;
    font-size: 12px;   
    text-align: center;
    cursor: pointer;
}
.el-button--text {
    color: #000000;
    font-size: 12px;
    padding: 0;
}
.el-button--text span {
    margin-top: 6px;;
    display: inline-block;
}
.preview-btn {
    height: 80px;
    width: 120px;
    position: absolute;
    right: -130px;
    bottom: 50px;
    max-width: 100%;
}
.preview-btn1, .preview-btn2, .preview-btn3, .preview-btn4 {
    box-shadow: 0 0 3px #eee;
    width: 100px;
    height: 30px;
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    font-size: 13px;
    box-sizing: border-box;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 1px;
    color: #000;
    margin-bottom: 4px;
}
.preview-btn>div.active {
    background: #f37e77;
    color: #fff;
    border: 0;
}
/* 动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 下载 */
.download {
    width: 70px;
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.13);
    border: 1px solid #E4E7ED;
    padding: 5px;
}
.download li {
    width: 56px;
    height: 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #666666;
    line-height: 16px;
}
.download::after{
    position: absolute;
    content: '';
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid #fff;
    transform: rotate(-90deg);
    top: 5px;
    left: -11px;
}
.mobileContainer {
    overflow: auto;
}

</style>