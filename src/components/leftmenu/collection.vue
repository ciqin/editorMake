<template>
  <div class='collect_list'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的模板" name="first">
          <div class='first_nav_top'>
            <ul>
              <li v-for="(item,key) in templatearr" :key = key    @click="templatearrclick(key)" :class="{templateactive:key==texttemp}">{{item}}</li>
            </ul>
          </div>
          <div class='third_search' style='padding: 15px 0 0;display:flex'>
            <el-input v-model="templateinput" placeholder="请输入关键字(名称,内容)"></el-input>
            <el-button icon="el-icon-search" @click="searchtemplate()">搜索</el-button>
          </div>
           <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>
           <div>
              <div class="first_main_imgs infinite-list-wrapper" v-loading="loading" >
                  <ul v-if="templateimgarr.length>0" style='height: 785px;overflow: auto;'>
                    <li v-for="(item,key) in templateimgarr" :key = 'key' :title="item.label" @click="templeteSource(key,item)" :class="{show_list_start:item.show===true}">
                      <div class='beijing' v-html = 'item.templeteSource' ></div>
                      <div class='collection_icon' :connectid="item.userId"   @click.stop="collectionIconclick(key,templateimgarr)" :class='item.userId ? "collectionAcitve" : "nocollectionAcitve" '>
                             <i class="el-icon-star-on"></i>
                        </div>
                    </li>

                    <div v-if="loadimgtemplate" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>加载中...</div>
                    <div v-if="templatenoMore" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>没有更多了</div>
                  </ul>

                  <div v-else>
                    <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
                  </div>
              </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="我的稿件" name="third">
          <div class='third_search' style='padding: 0 0 15px;display:flex'>
            <el-input v-model="Manuscriptinput" placeholder="请输入关键字(名称,内容)"></el-input>
            <el-button icon="el-icon-search" @click="Manuscriptsearch()">搜索</el-button>
          </div>

         <div class="third_data">
           <label for="">时间:</label>
           <el-date-picker
              v-model="datavalue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
           </el-date-picker>
           <div class="clear"></div>
        </div>

           <div v-loading="loadingmusc">
              <div class='infinite-list-wrapper'  v-loading="loadingmusc">
                  <div v-if="Manuscript.length>0 && loadingmusc==false"  style="height: 778px;overflow-y: auto;margin-top: 20px;padding-bottom: 20px;" v-infinite-scroll="loadgetFavorite" infinite-scroll-disabled="disabled">
                        <div class="third_libisryarr" v-for="(item,key) in Manuscript" :key = key @click='ManuscriptClick(item)'>
                                 <div v-if="item.thumbnailUrl && item.htmlContent" style='display: flex;position: relative;' :class="{show_list_start:item.show===true}">
                                      <div class='third_libisryarr_list'>
                                           <div class='collection_icon collectionAcitve' @click.stop="collectionIconclick(key,Manuscript)" >
                                              <i class="el-icon-star-on"></i>
                                          </div> 
                                          <div class="third_libisryarr_img">
                                              <img  :src="item.thumbnailUrl.indexOf('http') ? caiApi+item.thumbnailUrl : item.thumbnailUrl">
                                          </div>
                                      </div>
                                      <div class="third_libisryarr_botal">
                                        <p class='third_libisryarr_botal_title'><span class='third_libisryarr_botal_biaoshi'>图文</span>{{item.title?item.title:'暂无标题'}}</p>
                                        <p>{{item.time}}</p>
                                      </div>
                                 </div>

                                 <div v-else :class="{show_list_start:item.show===true}">
                                     <div class="third_libisryarr_botal" style='position: relative;'>
                                         <div class='collection_icon collectionAcitve' @click.stop="collectionIconclick(key,Manuscript)" >
                                              <i class="el-icon-star-on"></i>
                                          </div> 
                                        <p class='third_libisryarr_botal_title'>{{item.title}}</p>
                                      </div>
                                 </div>
                        </div>
                  </div>
                  <div v-else-if='Manuscript.length==0 && loadingmusc==false'>
                      <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
                  </div>
              </div>
           </div>
        </el-tab-pane>

        <el-tab-pane label="关联文章" name="four">
          <div v-loading="loading" style='height: 894px;overflow-y: auto;'>
              <div v-if="Relatedarr.length>0 && loading==false">
                <div v-for="(item,key) in  Relatedarr" :key = key  class='acticle_list' v-infinite-scroll="loadRelated" infinite-scroll-disabled="disabledRelated">
                    <div class='collection_icon collectionAcitve' @click="collectionIconclick(key,Relatedarr)">
                      <i class="el-icon-star-on"></i>
                    </div>

                    <div>
                      <div :class="item.iscontent===true?'arrow_up_icon arrow_down_icon':'arrow_up_icon'" @click="arrowupIconclick(key,item)">
                        <i :class="item.iscontent===true?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                      </div>
                    </div>

                    <div class='acticle_list_title' v-html='item.title'></div>

                    <div v-if='item.content!=""'>
                      <div class="acticle_list_bottom">
                        <div class='acticle_list_content' v-if="item.iscontent" @mouseup="listcontentup" >{{item.content}}</div>
                        <div class='acticle_list_content' v-else @mouseup="listcontentup">{{item.partcontent?item.partcontent:''}}</div>
                      </div>
                    </div>

                    <div v-else>
                          <div class='acticle_list_keyword'>关联点：{{item.words?item.words:''}}</div>
                          <div class='acticle_list_Similarity' style="padding-bottom: 10px;">关联度：{{item.similarity?item.similarity:''}}</div>
                    </div>
                </div>
                <p v-if="loadimgRelated" style='text-align:center;height:50px;line-height:50px;'>加载中...</p>
                <p v-if="noMoreRelated" style='text-align:center;height:50px;line-height:50px;'>没有更多了</p>
                <div class="Tooltip" :style="Tooltipstyle">
                    <div class="arrow"></div>
                    <p @click="Tooltipbtn">插入正文</p>
                </div>
              </div>
              <div v-else-if="Relatedarr.length==0 && loading==false">
                  <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
              </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="我的媒资库" name="second">
          <div class='third_search' style='padding: 0 0 15px;display:flex'>
            <el-input v-model="Shareinput" placeholder="请输入关键字(名称,内容)"></el-input>
            <el-button icon="el-icon-search" @click="searchShare()">搜索</el-button>
          </div>
          <div>
            <div class="labelselect">
                <label for="">分类:</label>
                <el-select v-model="value1" placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>

              <div class="labelselect">
                <label for="">类型:</label>
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <div class="clear"></div>
          </div>




    　　　　　<div v-loading="loading" >
                  <div v-if="Libraryarr.length>0">
                    <div class="libisryarr" v-for="(item,key) in Libraryarr" :key = key>
                        <div class='libisryarr_list' @click="LibraryClick(item)">
                            <div class='collection_icon collectionAcitve' @click.stop="collectionIconclick(key,Libraryarr)">
                                <i class="el-icon-star-on"></i>
                            </div>
                            <div class="libisryarr_img" v-if="item.fileFormat=='mp4'">
                                <video :src="item.url" controls="controls" :poster="item.coverImageUrl">
                                </video>
                            </div>

                            <div class="libisryarr_img" v-else-if="item.fileFormat=='jpg'||item.fileFormat=='jpeg'">
                                <img :src="item.url" alt="">
                            </div>
                        </div>
                        <div class="libisryarr_botal">
                          <p>{{item.mediaName}}</p>
                          <p>{{item.createTime}}</p>
                        </div>
                    </div>
                  </div>
                  <div v-else>
                    <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
                  </div>
         </div>

        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import { getFavorTemplate,Mediacollectlist,classifygetAll,SearchShareAssets,Mediadell} from '@/http/api'
import { listObjects,getFavoriteMediaIds } from '@/http/api'           //稿库
import { getFavoriteMixmdedias } from '@/http/api'    //查看收藏的文稿
import { cancelFavorTemplate } from '@/http/api'           //取消模板收藏
import { favoritedell  } from '@/http/api'    //稿件取消收藏
import { getTopics } from '@/http/api'    //文章收藏
import { Articledell,ilgcreations } from '@/http/api'
import { store } from '@/store'
export default {
  data(){
    return{
      loading:true,
      loadingmusc:true,
      activeName: '',
      templatearr:['标题','正文','图文','引导','分割线','二维码','其他'],
      texttemp:0,
      templateinput:'',//模板搜索的关键字
      templateimgarr:[], //模板
      loadimgtemplate:false,
      templatepage:0,//模板的页数
      templatepageNum:10,//模板每次加载条数
      templatetotal:'',//模板的总条数

      loadimg:false, //稿件滚动加载
      Manuscript:[],   //稿件从template的所有数据
      Manuscriptidarr:{},//收藏的id
      Manuscriptinput:'', //稿库的检索的字
      datavalue: '', //稿件时间检索
      Manuscrippage:0,//稿库的页数
      Manuscriptotal:'',   //稿库的总条数

      actpageNum:0,//关联文章的页数
      Relatedarr:[],//关联文章
      Relatedtotal:'',
      text:'',//滑过获取关联文章
      loadimgRelated:false,
      Tooltipstyle:'display:none',//滑过获取关联文章样式
      templeteType:1,

      tenantId:'',
      value1:'全部',
      options1: [{value:'全部',label:'全部'}],
      options2: [{
        value: 1,
        label: '图片'
      }, {
        value: 2,
        label: '音频'
      }, {
        value: 3,
        label: '视频'
      }, {
        value: 0,
        label: '全部'
      }],
      value2: '图片',
      Shareinput:'',//媒资库检索的关键字
      Libraryarr:[],//媒资库检索结果
      mediapageSize:20,//媒资库每页条数
      mediapageNum:1,//媒资库页数
      mediaIDarr:[],//媒资库id
      collectAssets:[],
      mediatotal:'',

      caiApi:"http://qhcloudhongqi.wengegroup.com:9080",
    }
  },
  computed: {
   //模板=========================================================
    templatenoMore () {
      return this.templateimgarr.length == this.templatetotal
    },
    disabledtemplate (){
        return this.loadimgtemplate || this.templatenoMore
    },

    //稿库=========================================================
    collectionnoMore () {
      return this.Manuscript.length == this.Manuscriptotal
    },
    disabled () {
      return this.loadimg || this.collectionnoMore
    },

    //关联文章收藏的滚动加载
    noMoreRelated(){
     return this.Relatedarr.length == this.Relatedtotal
    },

    disabledRelated(){
      return this.loadimgRelated || this.noMoreRelated
    },


  },
  created(){
    this.tenantId = window.localStorage.getItem("tenantId")
    if(store.collectindex=='0'){
        this.activeName = 'first'
        this.templateimgarr=[]
        this.templatepage=0
        this.loading = true
        this.loadTemplates();
    }else if(store.collectindex=='1'){
        this.activeName = 'third'
        ilgcreations().then(res=>{
             getFavoriteMixmdedias().then((res)=>{
              res.data.forEach((item,key)=>{
                let uuid = item.uuid
                this.Manuscriptidarr[`${item.uuid}`]=item.createTime
              })

              this.Manuscriptotal = this.Manuscriptidarr.length
              this.Manuscrippage = 0
              this.Manuscript=[]
              this.loadgetFavorite()
            })
          })
    }else if(store.collectindex=='2'){
        this.activeName = 'four'
        this.Relatedarr=[]
        this.actpageNum=0
        this.loading = true
        this.loadRelated()
    }else{
        this.activeName = 'first'
        this.templateimgarr=[]
        this.templatepage=0
        this.loading = true
        this.loadTemplates();
    }
  },
  methods: {
      handleClick(tab, event) {
        if(tab.label=='我的稿件'){
          ilgcreations().then(res=>{
             getFavoriteMixmdedias().then((res)=>{
              res.data.forEach((item,key)=>{
                let uuid = item.uuid
                this.Manuscriptidarr[`${item.uuid}`]=item.createTime
              })

              this.Manuscriptotal = this.Manuscriptidarr.length
              this.Manuscrippage = 0
              this.Manuscript=[]
              this.loadgetFavorite()
            })
          })

        }else if(tab.label=='关联文章'){
           this.Relatedarr=[]
           this.actpageNum=0
           this.loading = true
           this.loadRelated()
        }else if(tab.label=='模板'){
          this.templateimgarr=[]
          this.templatepage=0
          this.loading = true
          this.loadTemplates();
        }else if(tab.label == '我的媒资库'){
           this.options1 = [{value:'全部',label:'全部'}]
            //获取分类
            let param = {
              tenantId: this.tenantId,
            }
            classifygetAll(param).then(res=>{
              if(res){
                res.data.forEach((val,ind)=>{
                    this.options1.push({
                      value: val.classifyId,
                      label: val.classifyName
                    })
                })
              }
            })

            this.Libraryarr=[];
            this.mediapageNum=1;
            this.loading = true
            this.loadMedialist()
        }

        store.collectindex = tab.index
      },
      templatearrclick(index){
         let _that = this
         _that.templateimgarr=[]
         _that.texttemp = index
         _that.templeteType = index+1
        this.loadTemplates()
      },
      templeteSource(index,item){
        store.ueditor.focus()
        store.ueditor.execCommand('inserthtml',item.templeteSource)
      },
      searchtemplate(){
        this.templateimgarr=[]
        this.loadTemplates()
      },
      Manuscriptsearch(){
        this.loadingmusc = true
        this.Manuscrippage = 0
        this.Manuscript = []
        this.loadgetFavorite()
      },

      searchShare(){
         this.loading = true
         this.mediapageNum = 1
         this.Libraryarr = []
         this.loadMedialist()
      },

      collectionIconclick(index,arr){
        if(arr == this.templateimgarr){
          let param = {
           templateId:arr[index].templeteId,
           ContentType:true,
          }
          this.templateimgarr[index].isFavorite = false
          ilgcreations().then(res=>{
            cancelFavorTemplate(param).then(res=>{ //取消模板收藏
              if(res.message='取消收藏成功'){
                  this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                  this.templateimgarr.splice(index,1)
              }else{
                  this.$message('取消收藏失败');
              }
            })
          })
        }else if(arr == this.Manuscript){
            let favoriteparam = {
            uuid:arr[index].id,
            }

            ilgcreations().then(res=>{
              favoritedell(favoriteparam).then((res)=>{
                if(res.message='取消收藏成功'){
                    this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                  this.Manuscript.splice(index,1)
                }else{
                  this.$message('取消收藏失败');
                }
              })
            })

        }else if(arr == this.Relatedarr){
            let Relateparam = {
                uuid:this.Relatedarr[index].uuid,
                tenantId:this.tenantId,
                title:this.Relatedarr[index].title,
                content:this.Relatedarr[index].content,
                pubtime:this.Relatedarr[index].pubtime
            }

            ilgcreations().then(res=>{
              Articledell(Relateparam).then((res)=>{
                if(res.message='取消收藏成功'){
                  this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                  });
                  this.Relatedarr.splice(index,1)
                }else{
                  this.$message('取消收藏失败');
                }
              })
            })

        }else if(arr == this.Libraryarr){
            let libraryparam = {
              assetId:arr[index].assetId,
              tenantId:this.tenantId,
              url:arr[index].url
            }

            Mediadell(libraryparam).then(res=>{ //取消媒资库收藏
                if(res.message='取消收藏成功'){
                  this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                  });
                  this.Libraryarr.splice(index,1)
                }else{
                  this.$message('取消收藏失败');
                }
              })
        }

      },
      arrowupIconclick(index,item){
        let newList = [];
        this.Relatedarr.forEach((val,ind)=>{
          if(ind == index) {
            if(val.iscontent == true){
              val.iscontent = false
            }else{
              val.iscontent = true
            }
          }
          newList.push(val)
        })
        this.Relatedarr = newList;
      },
      listcontentup(e){
        let texts = window.getSelection().toString();
          if(texts!=''){
            this.text = texts;
            this.Tooltipstyle = `position: fixed;top:${e.pageY - e.offsetY - 10}px;left:${e.pageX}px;z-index: 999;width: 80px;height: 40px;border:1px solid #ccc;background: #fff;line-height: 40px;display: inline-block;border-radius: 5px;vertical-align: top;`
          }else{
            this.text = '';
            this.Tooltipstyle = 'display:none'
          }
      },
      Tooltipbtn(){
        store.ueditor.focus()
        store.ueditor.execCommand('inserthtml',this.text)
        this.Tooltipstyle = 'display:none'
      },
      loadTemplates(){
        let _that = this
        //获取标题模板
        let Listparam = {
            label:  _that.templateinput,
            templeteType:_that.templeteType,
            status: 0,
            pageSize: _that.templatepageNum,
            pageNum: _that.templatepage,
            sort: 'use_num,desc',
        }

        if(_that.templateimgarr!==_that.templatetotal){
          ilgcreations().then(res=>{
            getFavorTemplate(Listparam).then(res=>{
              if(res){
                _that.loading = false
                _that.templatepage = _that.templatepage+1
                _that.templatetotal = res.total
                res.list.forEach(function (item) {
                  item.show = false
                  _that.templateimgarr.push(item);
                });
              }
            })
          })
        }

      },
      loadRelated(){
         let actparam = {
            pageNum:this.actpageNum,
            pageSize:10
          }

          if(this.Relatedarr!==this.Relatedtotal){
             ilgcreations().then(res=>{
               getTopics(actparam).then((res)=>{
                  if(res){
                    this.loading = false
                    this.Relatedtotal = res.data[0].total
                    this.actpageNum = Number(this.actpageNum)+1
                    res.data[0].list.forEach((item,key)=>{
                        item.iscontent = false;
                        item.partcontent = item.content
                        if(item.content!==''){
                          item.iscontent = false;
                        }else{
                          item.iscontent  = true;
                        }

                        if(item.content.length>125){
                            item.partcontent = item.content.slice(0,125) + '...';
                        }else{
                            item.partcontent = item.content
                        }

                        this.Relatedarr.push(item)
                    })
                  }
              })
            })
          }
      },
      loadgetFavorite(){
        let _that = this
        let Objectparam = {
            keywords: _that.Manuscriptinput,
            library: 'manuscript',
            types: 'TEXT,COMPO,LIVE',
            excludedIds: _that.$route.query.id,
            editorType: 'COMPO',
            number: _that.Manuscrippage,
            count: 10,
            favorIds:JSON.stringify(_that.Manuscriptidarr)=='{}'?'':JSON.stringify(_that.Manuscriptidarr),
            startDate:_that.datavalue[0],
            endDate:_that.datavalue[1],
            ContentType:true,
        }
        listObjects(Objectparam).then((res)=>{
            _that.loadingmusc = false
            _that.loading = false
            _that.Manuscrippage = _that.Manuscrippage+1
            _that.Manuscriptotal = _that.Manuscriptidarr.length
            res.content.forEach(function(item){
              _that.Manuscript.push(item)
            })
        })
      },
      loadMedialist(){
            let _that = this
            if(this.value1=='全部' || this.value2=='全部'){
              this.value1 = '全部'
              this.value2 = 0
            }

            let value1arr = []
            if(this.value1!=='全部'){
              value1arr.push(this.value1)
            }

            let params = {
              tenantId: this.tenantId,
            }


            getFavoriteMediaIds(params).then((res)=>{
               if(res){
                 this.collectAssets=res.data

                  let Searchparam = {
                      classifyIds:value1arr, //分类的id
                      keyWords:this.Shareinput,//关键字
                      mediaType:this.value2, //类型
                      tenantId:this.tenantId, //组织id
                      sortParam:'create_time',
                      sortType:'desc',
                      pageNum: this.mediapageNum,
                      pageSize: this.mediapageSize,
                      isClassifyRecursion:true,
                      collectAssets:this.collectAssets
                  }

                 SearchShareAssets(Searchparam).then(res=>{  //媒资库检索
                    if(res){
                      this.loading = false
                      let rescontent = res.data

                      this.mediapageNum = Number(_that.mediapageNum)+1
                      this.mediatotal = res.total

                      rescontent.forEach(function (item) {
                          _that.Libraryarr.push(item);
                      });

                    }
                  })
               }
            })



      }

  }
}
</script>
<style>

   .collect_list .el-tabs__nav-wrap{
     background: #F6F8FA;
   }
   .collect_list .is-active {
      color: #1A1A1A;
      background: #ffffff;
      font-weight: bold;
   }
   .collect_list .el-tabs__active-bar{
     display:none;
   }
   .collect_list .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
   }
   .collect_list .el-tabs__item:hover{
     color:#D72323
   }
   .collect_list .el-tabs--top .el-tabs__item.is-top{
      width: 97px;
      text-align: center;
      padding: 0;
   }
   .collect_list .el-tabs__nav .el-tabs__item{
      height: 44px;
      line-height: 44px;
   }
   .collect_list .el-tabs__nav{
      height: 44px;
      line-height: 44px;
      font-size: 14px;
   }
</style>
<style scoped>
.htitle{
    height: 60px;
    border-bottom: 4px solid #D72323;
    text-align: center;
    line-height: 60px;
    color: #D72323;
}
 .first_nav_top ul{
   overflow: hidden;
 }
 .first_nav_top ul li{
   padding:0 8px;
    height:25px;
    background: #EEF3F9;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    line-height: 25px;
    text-align: center;
    float: left;
    margin:0 2px;
    cursor: pointer;
 }
 .first_nav_top ul .templateactive{
   color: #0170FF;
   background: #0170ff3b;
   border-radius: 4px;
 }
 .first_texttemp{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 2.2px;
    margin-top: 20px;
 }

.infinite-list-wrapper{
  position: relative;
  min-height: 100px;
}


 .first_main_imgs ul{
   padding-bottom: 10px;
   min-height: 735px;
 }

 .first_main_imgs ul li{
    width: 366px;
    text-align: center;
    position: relative;
    float: left;
    margin: 4px 0;
    margin-bottom: 0;
    background: #F6F8FA;
    border-radius: 5px;
 }

.first_main_imgs ul li:nth-of-type(odd){
  margin-right:0;
}

  .first_main_imgs ul li .beijing{
    background: #ffffff;
    width: 350px;
    margin: 8px;
    padding: 10px
  }
 .first_main_imgs ul li:hover{
   box-shadow: inset 0 0 10px 0px #ccc;
   border: 1px solid #1989FA;
 }
 .first_main_imgs ul li img{
   max-width: 100%;
   margin-top: 5px;
 }
 .third_data{
   height:40px;
 }
 .first_main_imgs .collection_icon,.third_libisryarr .collection_icon{
    width: 18px;
    height: 18px;
    display: inline-block;
    line-height: 16px;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    right: 9px;
    top: 9px;
    font-size: 14px;
}

 .collectionAcitve{
    color: #ffffff;
    background: #f99b47;
    border: 1px solid #f99b47;
    display:block !important
}
.nocollectionAcitve{
    color: #999999;
    background: #ffffff;
    border: 1px solid #dcdfe7;
}
.libisryarr{
    width: 173px;
    height: 180px;
    float: left;
    margin: 20px 0px 20px 0;
}
.libisryarr_list{
  width: 173px;
  height: 141px;
  background: #FFFFFF;
  box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);
  border-radius: 3px;
  position: relative;
}
.libisryarr_img{
    width: 157px;
    height: 125px;
}
.libisryarr_img img,.libisryarr_img video{
    width: 100%;
    height: 100%;
    margin: 8px 10px 0.7% 9px;
}
.libisryarr_botal{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #212B36;
  letter-spacing: 0;
  line-height: 24px;
}
.libisryarr_botal p:first-child{
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.libisryarr_list .collection_icon{
  display: block !important;
  right: 8px;
  z-index: 222;
  cursor: pointer;
}
.labelselect{
    width: 50%;
    float: left;
    padding: 0 0 0 10px;
    display: flex;
}
.labelselect label{
    width: 82px;
    line-height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
}

.third_libisryarr>div{
    width: 365px;
    height: 92px;
    float: left;
    margin: 0;
    border-bottom:1px solid #dcdfe6
}

.third_libisryarr>div:hover{
   box-shadow: inset 0 0 10px 0px #ccc;
 }
.third_libisryarr_botal{
    padding:10px
}
.third_libisryarr_botal_title{
    font-size:15px;
    line-height:25px;
    display:inline-block
}
.third_libisryarr_botal_biaoshi{
       display: inline-block;
       padding: 0px 4px;
       border: 1px solid #D72323;
       font-size: 12px;
       color: #D72323;
       border-radius: 3px;
       height: 18px;
       line-height: 18px;
       margin-right: 6px;
}
.third_libisryarr_list{
  border-radius: 3px;
}

.third_libisryarr_img{
      width: 120px;
      height: 76px;
      margin: 10px;
}
.third_libisryarr_img img,.third_libisryarr_img video{
    width: 100%;
    height: 100%;
}
.sort_naver{
    padding: 10px 20px;
    display: flex;
}
.sort_naver label{
    font-size: 14px;
    color: #333333;
}
 .first_main_imgs{
    margin-top: 10px;
    min-height: 705px;
 }
.acticle_list{
    width: 368px;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    color: #333333;
    font-size: 13px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    box-shadow: 0 9px 9px 0 rgba(0,0,0,0.02), 0 3px 3px 0 rgba(0,0,0,0.02), 0 1px 1px 0 rgba(0,0,0,0.02);
    border-radius: 4px;
}
.acticle_list_content{
  text-align: justify;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 336px;
  font-family: MicrosoftYaHei;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0;
  line-height: 26px;
  padding-right: 10px;
}
.acticle_list_bottom{
  background: #F6F7F9;
  border-radius: 4px;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 5px;
}
.acticle_list_title{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #22272E;
    letter-spacing: 0;
    line-height: 22px;
    padding-bottom: 6px;
    width: 80%;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.acticle_list_Similarity,.acticle_list_keyword{
  letter-spacing: 0;
  font-family: MicrosoftYaHei;
  font-size: 13px;
  color: #212B36;
  line-height: 24px;
}

.collection_icon{
    width: 22px;
    height: 22px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    right: 40px;
    top: 8px;
    font-size: 14px;
}

.arrow_up_icon{
    width: 22px;
    height: 22px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    border: 1px solid #d72323;
    border-radius: 5px;
    color: #ffffff;
    background: #d72323;
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 14px;
}
.arrow_down_icon{
  border: 1px solid #DCDFE6;
  color: #DCDFE6;
  background: #ffffff;
}
.collectionAcitve{
    color: #ffffff;
    background: #f99b47;
    border: 1px solid #f99b47;
}
.nocollectionAcitve{
    color: #999999;
    background: #ffffff;
    border: 1px solid #dcdfe7;
}
.listcontentAcitve{
    height: auto;
    display: block;
}
.htitle{
    height: 60px;
    border-bottom: 4px solid #D72323;
    text-align: center;
    line-height: 60px;
    color: #D72323;
}

.Tooltip p{
   text-align: center;
   font-size: 14px;
   cursor: pointer;
}
</style>
