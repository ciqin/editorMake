<template>
   <div class="nav_top_temlaptes" >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="模板" name="first">
        <div class='first_nav_top'>
          <ul>
            <li v-for="(item,key) in templatearr" :key=key @click="templatearrclick(key)" :class="{templateactive:key==texttemp}">{{item}}</li>
          </ul>
        </div>
        <div class='third_search' style='padding: 15px 0 0 0;display:flex'>
          <el-input v-model="templateinput" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search" @click="searchtemplate()">搜索</el-button>
        </div>
        <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>

        <div>
          <div class="first_main_imgs infinite-list-wrapper" v-loading="loading" >
              <ul v-if="templateimgarr.length>0" style='height: 785px;overflow-y: auto;' v-infinite-scroll="loadTemplates" infinite-scroll-disabled="disabledtemplate">
                <li v-for="(item,key) in templateimgarr" :key = 'key' :title="item.label" @click="templeteSource(key,item)" :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,templateimgarr)"  @mouseout="collectionIconmouseout(key,item,templateimgarr)">
                    <div class='beijing' v-html = 'item.templeteSource'></div>
                    <div class='collection_icon' :connectid="item.userId"   @click.stop="collectionIconclick(key,templateimgarr)" :class='item.isFavorite==1 ? "collectionAcitve" : "nocollectionAcitve" '>
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

      <el-tab-pane label="媒资库" name="second">
        <div class='third_search' style='padding: 0 0 15px;display:flex'>
         <el-input v-model="Shareinput" placeholder="请输入关键字(名称,内容)"></el-input>
         <el-button icon="el-icon-search" @click="searchShare()">搜索</el-button>
       </div>
          <div>
            <div class="labelselect">
                <label for="">分类</label>
                <el-select v-model="value1" placeholder="请选择" @change="searchShare()">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
            </div>

              <div class="labelselect">
                <label for="">类型</label>
                <el-select v-model="value2" placeholder="请选择" @change="searchShare()">
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


　　　　　<div class='infinite-list-wrapper' v-loading="loading" style='display:flex;margin-top:20px;'>
              <div v-if="Libraryarr.length>0" style='height: 805px;overflow-y: auto;overflow-x:hidden'  v-infinite-scroll="loadMedialist" infinite-scroll-disabled="disabledLibraryarr">
                <div class="libisryarr" v-for="(item,key) in Libraryarr" :key = 'key'>
                    <div class='libisryarr_list_div'>
                      <div class='libisryarr_list' @click="LibraryClick(item)">
                          <div class='collection_icon' @click.stop="collectionIconclick(key,Libraryarr)" :class='item.isFavorite == true ? "collectionAcitve" : "nocollectionAcitve" '>
                              <i class="el-icon-star-on"></i>
                          </div>
                          <div class="libisryarr_img" v-if="item.fileFormat=='mp4'">
                              <video :src="item.url" controls="controls" :poster="item.coverImageUrl">
                              </video>
                          </div>

                          <div class="libisryarr_img" v-else-if="item.fileFormat=='jpg'||item.fileFormat=='png'||item.fileFormat=='jpeg' || item.fileFormat=='mov' || item.fileFormat=='gif'">
                              <img :src="item.url" alt="">
                          </div>
                      </div>
                    </div>

                    <div class="libisryarr_botal">
                      <p>{{item.mediaName}}</p>
                      <p>{{item.createTime}}</p>
                    </div>
                </div>

                 
                 <div v-if="Libraryarrtemplate" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>加载中...</div>
                 <div v-if="LibraryarrnoMore" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>没有更多了</div>
              </div>
              <div v-else style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;width: 100%;'>
                <p><i class='el-icon-warning-outline'></i>暂无数据</p>
              </div>
         </div>

      </el-tab-pane>

      <el-tab-pane label="稿库" name="third">
        <div class='third_search' style='padding: 10px 0;display:flex'>
          <el-input v-model="Manuscriptinput" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search" @click.stop="Manuscriptsearch()">搜索</el-button>
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

        <div class='infinite-list-wrapper' v-loading="loadingManuscript">
            <div v-if="Manuscript.length>0 && loadingManuscript==false"  style="height: 805px;overflow-y: auto;margin-top: 20px;" v-infinite-scroll="loadManuscript" infinite-scroll-disabled="disabled">
              <div class="third_libisryarr" v-for="(item,key) in Manuscript" :key = key>
                 <div v-if="item.thumbnailUrl && item.htmlContent" style='display: flex;position: relative;' :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,Manuscript)"  @mouseout="collectionIconmouseout(key,item,Manuscript)">
                      <div class='third_libisryarr_list'>
                           <div class='collection_icon' @click.stop="collectionIconclick(key,Manuscript)" :class='item.isFavorite==true ? "collectionAcitve" : "nocollectionAcitve" '>
                              <i class="el-icon-star-on"></i>
                          </div> 
                          <div class="third_libisryarr_img">
                              <img  :src="item.thumbnailUrl.indexOf('http')?caiApi+item.thumbnailUrl : item.thumbnailUrl">
                          </div>
                      </div>
                      <div class="third_libisryarr_botal">
                        <p class='third_libisryarr_botal_title'><span class='third_libisryarr_botal_biaoshi'>图文</span>{{item.title?item.title:'暂无标题'}}</p>
                        <p>{{item.time}}</p>
                      </div>
                      <div class='preview'><span @click="preview(item)"><i class='el-icon-view'></i>预览</span><span @click='ManuscriptClick(item)'><i  class='el-icon-download'></i>插入</span></div>
                 </div>

                 <div v-else-if="!item.thumbnailUrl && item.htmlContent" :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,Manuscript)"  @mouseout="collectionIconmouseout(key,item,Manuscript)">
                     <div class="third_libisryarr_botal" style='position: relative;'>
                          <div class='collection_icon'  @click.stop="collectionIconclick(key,Manuscript)" :class='item.isFavorite==true ? "collectionAcitve" : "nocollectionAcitve" '>
                              <i class="el-icon-star-on"></i>
                          </div> 
                          <p class='third_title'>{{item.title}}</p>
                          <div class='preview'><span @click="preview(item)"><i class='el-icon-view'></i>预览</span><span @click='ManuscriptClick(item)'><i  class='el-icon-download'></i>插入</span></div>
                      </div>
                 </div>
              </div>

              <div v-if="loadimg" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>加载中...</div>
              <div v-if="collectionnoMore" style='text-align:center;height:50px;line-height:50px;float:left;width: 100%;'>没有更多了</div>
            </div>
            <div v-else-if='Manuscript.length ==0 && loadingManuscript==false'>
                <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
            </div>
        </div>

      </el-tab-pane>
    </el-tabs>
   </div>

</template>
<script>
  import { classifygetAll } from '@/http/api'
  import { SearchShareAssets } from '@/http/api'
  import { getTempleteSourceList,ilgcreations } from '@/http/api'  // 获取模板
  import { templatelist } from '@/http/api'           //稿库
  import { favorTemplate } from '@/http/api'           //模板收藏
  import { cancelFavorTemplate } from '@/http/api'           //取消模板收藏
  import { Mediadd } from '@/http/api'      //媒资库收藏
  import { Mediadell } from '@/http/api'    //取消媒资库收藏
  import { FavoriteMixmdedia } from '@/http/api'    //稿件是否收藏
  import { favoriteadd  } from '@/http/api'    //稿件添加收藏
  import { favoritedell  } from '@/http/api'    //稿件取消收藏
  import { Mediacollectlist } from '@/http/api'    //获取媒资库收藏列表
  import { store } from '@/store'
  export default {
    data() {
      return {
        datavalue: '', //稿件时间检索
        activeName: '',
        templatearr:['标题','正文','图文','引导','分割线','二维码','其他'],
        texttemp:0,
        options1: [{value:'全部',label:'全部'}],
        value1: '全部',
        seen:false,
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
        value2: '全部',
        templateinput:'',//模板搜索的关键字
        templateimgarr:[], //模板
        loadimgtemplate:false,
        templatepage:0,//模板的页数
        templatepageNum:10,//模板每次加载条数
        templatetotal:'',//模板的总条数

        loading:true,
        caiApi:"http://qhcloudhongqi.wengegroup.com:9080",

        Manuscriptinput:'', //稿库的检索的字

        Manuscript:[],  //稿库
        Manuscriptotal:'',   //稿库的总条数
        loadimg:false, //稿件滚动加载
        Manuscrippage:0,//稿库的页数
        ManuscrippageNum:10,//稿件每次加载条数
        ManuscripIDarr:[],//稿件id

        Libraryarrtemplate:false,
        Shareinput:'',//媒资库检索的关键字
        Libraryarr:[],//媒资库检索结果
        mediapageSize:20,//媒资库每页条数
        mediapageNum:1,//媒资库页数
        mediaIDarr:[],//媒资库id
        mediatotal:'',//媒资库的总页数

        loadingManuscript:true,
        templeteType:1,

        tenantId:'', //租户id

      };
    },
    created(){
      console.log(123456)
      this.tenantId = window.localStorage.getItem("tenantId")
      if(store.letfTab1Idx=='0'){
          this.activeName = 'first'
          this.templateimgarr=[]
          this.templatepage=0
          this.loading = true
          ilgcreations().then(res=>{
            if(res){
              this.loadTemplates();
            }
          })
      }else if(store.letfTab1Idx=='1'){
          this.activeName = 'second'
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
            this.mediapageNum=0;
            this.loading = true
            this.loadMedialist()
      }else if(store.letfTab1Idx=='2'){
           this.activeName = 'third'

           let _that = this
            _that.loadingManuscript = true
            _that.ManuscripIDarr=[]
            _that.Manuscript = []
            let Objectparam = {
                ContentType:true,
                keywords: '',
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: this.$route.query.id,
                editorType: 'COMPO',
                number: this.Manuscrippage,
                count: 10
            }
            ilgcreations().then(res=>{
                templatelist(Objectparam).then(res=>{
                    if(res){
                      let rescontent = res.content
                      _that.Manuscriptotal = res.totalElements

                      rescontent.forEach(function (item) {
                        _that.ManuscripIDarr.push(item.id)
                      })

                      let parmas ={
                          uuids:_that.ManuscripIDarr
                        }
                      FavoriteMixmdedia(parmas).then((res)=>{
                        if(res){
                          rescontent.forEach(function (item) {
                              item.show=false
                              if(res.data.indexOf(item.id)>=0){
                                item.isFavorite = true
                              }else{
                                item.isFavorite = false
                              }
                              _that.Manuscript.push(item);
                            });

                          _that.loadingManuscript = false

                        }
                      })
                    }
               })
            })
      }else{
          this.activeName = 'first'
          this.templateimgarr=[]
          this.templatepage=0
          this.loading = true
          ilgcreations().then(res=>{
            if(res){
              this.loadTemplates();
            }
          })
      }
    },

    computed: {
      //稿库=========================================================
      collectionnoMore () {
        return this.Manuscript.length == this.Manuscriptotal
      },
      disabled () {
        return this.loadimg || this.collectionnoMore
      },

      //模板=========================================================
      templatenoMore () {
        return this.templateimgarr.length == this.templatetotal
      },
      disabledtemplate (){
          return this.loadimgtemplate || this.templatenoMore
      },

      //媒资库
      LibraryarrnoMore(){
          return this.Libraryarr.length == this.mediatotal
      },
      disabledLibraryarr(){
          return this.Libraryarrtemplate || this.LibraryarrnoMore
      }
    },

    methods: {
      handleClick(tab, event) {
        if(tab.label=='媒资库'){
            this.datavalue = ''
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
        }else if(tab.label=='稿库'){
            let _that = this
            _that.loadingManuscript = true
            _that.ManuscripIDarr=[]
            _that.Manuscript = []
            let Objectparam = {
                ContentType:true,
                keywords: '',
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: this.$route.query.id,
                editorType: 'COMPO',
                number: this.Manuscrippage,
                count: 10
            }
            ilgcreations().then(res=>{
                templatelist(Objectparam).then(res=>{
                    if(res){
                      let rescontent = res.content
                      _that.Manuscriptotal = res.totalElements

                      rescontent.forEach(function (item) {
                        _that.ManuscripIDarr.push(item.id)
                      })

                      let parmas ={
                          uuids:_that.ManuscripIDarr
                        }
                      FavoriteMixmdedia(parmas).then((res)=>{
                        if(res){
                          rescontent.forEach(function (item) {
                              item.show=false
                              if(res.data.indexOf(item.id)>=0){
                                item.isFavorite = true
                              }else{
                                item.isFavorite = false
                              }
                              _that.Manuscript.push(item);
                            });

                          _that.loadingManuscript = false

                        }
                      })
                    }
               })
            })
        }else if(tab.label=='模板'){
          this.datavalue = ''
          this.templateimgarr=[]
          this.templatepage=0
          this.loading = true
          this.loadTemplates();
        }
        store.letfTab1Idx = tab.index
      },
      templeteSource(index,item){
        store.ueditor.focus()
        store.ueditor.execCommand('inserthtml',item.templeteSource)
      },
      templatearrclick(index){
          this.templateimgarr=[]
          this.templatepage=0
          this.loading = true
          this.texttemp = index
          this.templeteType = index+1
          this.loadTemplates();

      },
      collectionIconclick(index,arr){
        if(arr == this.templateimgarr){
            let param = {
              templateId:arr[index].templeteId,
              ContentType:true,
            }
            if(this.templateimgarr[index].isFavorite==1){
                ilgcreations().then(res=>{
                  cancelFavorTemplate(param).then(res=>{ //取消模板收藏
                    if(res.message=='取消成功'){
                      this.templateimgarr[index].isFavorite = false
                      this.$message({
                            message: '取消收藏成功',
                            type: 'success'
                      });
                    }else{
                      this.$message('取消收藏失败');
                    }
                  })
                })

            }else{
                ilgcreations().then(res=>{
                  favorTemplate(param).then(res=>{ //模板收藏
                    if(res.message=='收藏成功'){
                       this.templateimgarr[index].isFavorite = true
                       this.$message({
                            message: '收藏成功',
                            type: 'success'
                      });
                    }else{
                      this.$message('收藏失败');
                    }
                  })
                })
            }
        }else if(arr == this.Libraryarr){
            let libraryparam = {
              assetId:arr[index].assetId,
              tenantId:this.tenantId,
              url:arr[index].url
            }

           if(this.Libraryarr[index].isFavorite){
                ilgcreations().then(res=>{
                  Mediadell(libraryparam).then(res=>{ //取消媒资库收藏
                    if(res.message='取消收藏成功'){
                      this.Libraryarr[index].isFavorite = false
                      this.$message({
                            message: '取消收藏成功',
                            type: 'success'
                      });
                    }else{
                      this.$message('取消收藏失败');
                    }
                  })
                })

           }else{
                ilgcreations().then(res=>{
                  Mediadd(libraryparam).then(res=>{ //媒资库收藏
                     if(res.message=='收藏成功'){
                         this.Libraryarr[index].isFavorite = true;
                         this.$message({
                            message: '收藏成功',
                            type: 'success'
                        });
                     }else{
                       this.$message('收藏失败');
                     }
                    console.log(res)
                  })
                })

           }
        }else if(arr == this.Manuscript){
          let favoriteparam = {
           uuid:arr[index].id,
          }
          if(this.Manuscript[index].isFavorite == true){
            ilgcreations().then(res=>{
              favoritedell(favoriteparam).then((res)=>{
                 if(res.message='取消收藏成功'){
                    this.Manuscript[index].isFavorite = false
                    this.$message({
                          message: '取消收藏成功',
                          type: 'success'
                    });
                  }else{
                    this.$message('取消收藏失败');
                  }
              })
            })
          }else{
            ilgcreations().then(res=>{
              favoriteadd(favoriteparam).then((res)=>{
                if(res.message='收藏成功'){
                    this.Manuscript[index].isFavorite = true
                    this.$message({
                          message: '收藏成功',
                          type: 'success'
                    });
                  }else{
                    this.$message('收藏失败');
                  }
              })
            })

          }
        }
      },
      LibraryClick(item){
       let str = ''
       if(item.fileFormat=='mp4'){
         str=`<video src=${item.url} controls="controls" poster=${item.coverImageUrl}></video>`
       }else if(item.fileFormat=='jpg'){
         str=`<img src=${item.url} alt="">`
       }

       store.ueditor.focus()
       store.ueditor.execCommand('inserthtml',str)
      },
      searchShare(){
         this.loading = true
         this.mediapageNum = 1
         this.Libraryarr = []
         this.loadMedialist()
      },
      searchtemplate(){
        this.templateimgarr=[]
        this.templatepage=0
        this.loading = true
        this.loadTemplates()
      },
      Manuscriptsearch(){
           let _that = this
           _that.loadingManuscript = true
           _that.Manuscript=[];
           _that.ManuscripIDarr=[]
           let Objectparam = {
                ContentType:true,
                keywords: _that.Manuscriptinput,
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: _that.$route.query.id,
                editorType: 'COMPO',
                page: 0,
                size: 10,
                startDate:_that.datavalue[0],
                endDate:_that.datavalue[1]
            }
          if(_that.Manuscript.length!==_that.Manuscriptotal){
             ilgcreations().then(res=>{
                templatelist(Objectparam).then(res=>{
                  if(res){
                    let rescontent = res.content
                    _that.Manuscriptotal = res.totalElements
                    rescontent.forEach(function (item) {
                      _that.ManuscripIDarr.push(item.id)
                    })

                    let parmas ={
                        uuids:_that.ManuscripIDarr
                      }
                      FavoriteMixmdedia(parmas).then((res)=>{
                        if(res){
                          rescontent.forEach(function (item) {
                              item.show=false
                              if(res.data.indexOf(item.id)>=0){
                                item.isFavorite = true
                              }else{
                                item.isFavorite = false
                              }
                              _that.Manuscript.push(item);
                            });

                            _that.loadingManuscript = false
                        }
                      })
                  }
                })
            })
          }
      },
      ManuscriptClick(item){
          store.ueditor.focus()
          store.ueditor.execCommand('inserthtml',item.htmlContent)
      },
      preview(item){
        let str=`<div style='width: 1000px;height: 800px;overflow-y: auto;'>${item.htmlContent}</div>`
        this.$alert(str, item.title, {
          dangerouslyUseHTMLString: true
        });
      },
      loadManuscript () {
          let _that = this
          let Objectparam = {
                ContentType:true,
                keywords: _that.Manuscriptinput,
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: _that.$route.query.id,
                editorType: 'COMPO',
                page: _that.Manuscrippage,
                size: _that.ManuscrippageNum,
                startDate:_that.datavalue[0],
                endDate:_that.datavalue[1]
            }
          if(_that.Manuscript.length!==_that.Manuscriptotal){
            ilgcreations().then(res=>{
               templatelist(Objectparam).then(res=>{
                if(res){
                  _that.Manuscrippage = Number(_that.Manuscrippage)+1
                  _that.Manuscriptotal = res.totalElements
                    res.content.forEach(function (item) {
                      item.show=false
                      _that.Manuscript.push(item);
                      _that.ManuscripIDarr.push(item.id)
                    });
                }
              })
            })
          }
      },
      loadTemplates(){
        let _that = this

        //获取标题模板
        let Listparam = {
            label: _that.templateinput,
            templeteType:_that.templeteType,
            status: 0,
            pageSize: _that.templatepageNum,
            pageNum: _that.templatepage,
            sort: 'use_num,desc',
        }

        if(_that.templateimgarr.length!==_that.loadimgtemplate){
            getTempleteSourceList(Listparam).then(res=>{
                if(res){
                  _that.loading = false
                  _that.templatepage = Number(_that.templatepage)+1
                  _that.templatetotal = res.total
                  res.list.forEach(function (item) {
                    item.show = false
                    _that.templateimgarr.push(item);
                  });
                }
            })
        }

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
            }
            SearchShareAssets(Searchparam).then(res=>{  //媒资库检索
              if(res){
                this.loading = false
                let rescontent = res.data

                let parmas ={
                    tenantId:this.tenantId,
                }

                Mediacollectlist(parmas).then((res)=>{
                  if(res.message=='获取成功'){
                     this.mediaIDarr = res.data

                    _that.mediapageNum = Number(_that.mediapageNum)+1
                    _that.mediatotal = res.total

                     rescontent.forEach(function (item) {
                        item.show=false
                        if(res.data.indexOf(item.id)>=0){
                          item.isFavorite = true
                        }else{
                          item.isFavorite = false
                        }
                        _that.Libraryarr.push(item);
                    });


                  }
                })


              }
            })
      },
      collectionIconmouseover(key,item,arr){
        let newList = [];
        arr.forEach((val,ind)=>{
          if(ind == key) {
            if(val.show == false){
              val.show = true
            }
          }
          newList.push(val)
        })
        this.arr = newList;
      },
      collectionIconmouseout(key,item,arr){
        let newList = [];
        arr.forEach((val,ind)=>{
          if(ind == key) {
            if(val.show == true){
              val.show = false
            }
          }
          newList.push(val)
        })
        this.arr = newList;
      },
    }
  };
</script>
<style>
   .el-message-box{
     width: 1100px;
   }
   .el-tabs__content {
     padding: 0 12px;
   }
   .el-tabs__content .el-input__inner {
        height: 40px;
        line-height: 40px;
    }
   .nav_top_temlaptes .el-tabs__nav-wrap{
     background: #F6F8FA;
   }
   .nav_top_temlaptes .is-active {
      color: #1A1A1A;
      background: #ffffff;
      font-weight: bold;
   }
   .nav_top_temlaptes .el-tabs__active-bar{
      display: none;
   }
   .nav_top_temlaptes .el-tabs__item:hover{
     color:#D72323
   }
   .nav_top_temlaptes .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
   }
   .nav_top_temlaptes .el-tabs--top .el-tabs__item.is-top{
      width: 33.3%;
      text-align: center;
      padding:0
   }
   .nav_top_temlaptes .el-tabs__nav .el-tabs__item{
      height: 44px;
      line-height: 44px;
   }
   .nav_top_temlaptes .el-tabs__nav {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      width: 100%;
   }
   .third_search .el-input__inner{
     border: 1px solid #A0A2B2;
     border-right: none;
     border-radius: 4px 0 0 4px;
   }
   .third_search .el-button{
     border: 1px solid #A0A2B2;
     border-radius: 0px 4px 4px 0;
   }
   /* .third_data .el-input__inner{
     height: 40px;
   } */
   .third_data label {
        width: 45px;
        line-height: 40px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333333;
        float:left;
    }
   .third_data .el-date-editor .el-range-input{
    width: 85px;
  }
   .third_data .el-date-editor--daterange.el-input__inner{
    width: calc(100% - 45px);
  }
   .third_data .nav_top_temlaptes .el-input__icon {
    line-height: 22px;
  }
   .third_data .el-date-editor .el-range__icon,.third_data .el-date-editor .el-range-separator,.third_data .el-date-editor .el-range__close-icon{
    line-height: 34px;
  }
   .nav_top_temlaptes .labelselect .el-input--suffix .el-input__inner{
      background: #FFFFFF;
      border: 1px solid #A0A2B2;
      border-radius: 4px;
   }
</style>
<style scoped>
 .first_nav_top ul{
   overflow: hidden;
 }
 .first_nav_top ul li{
    padding:0 8px;
    height:25px;
    background: #EEF3F9;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9193AC;
    line-height: 25px;
    text-align: center;
    float: left;
    margin:0 3px;
    cursor: pointer;
 }
 .first_nav_top ul .templateactive{
   color: #0170FF;
   background: #0170ff3b;
   border-radius: 4px;
 }
 .first_main_imgs{
    margin-top: 10px;
    min-height: 705px;
 }
 .infinite-list-wrapper {
   position:relative;
   min-height: 100px;
 }
 .first_texttemp{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 2.2px;
    margin-top: 20px;
 }

 .first_main_imgs ul{
   padding-bottom: 10px;
   /* min-height: 735px; */
 }

 .first_main_imgs ul li{
    width: 366px;
    text-align: center;
    position: relative;
    float: left;
    margin: 4px;
    margin-bottom: 0;
    margin-left: 0;
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
    padding: 10px;
  }
 .first_main_imgs ul li:hover{
   box-shadow: inset 0 0 10px 0px #ccc;
   border: 1px solid #1989FA;
 }
 .first_main_imgs ul li img{
   width: 90%;
   margin-top: 5px;
 }
 .third_data{
    height: 40px;
    /* margin-left: 143px; */
    padding:0;
 }

 .collection_icon{
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
    cursor: pointer;
}

 .collectionAcitve{
    color: #ffffff;
    background: #f99b47;
    border: 1px solid #f99b47;
    display: block !important;
}
.nocollectionAcitve{
    color: #999999;
    background: #ffffff;
    border: 1px solid #dcdfe7;
}
.libisryarr{
    width: 173px;
    float: left;

}
.libisryarr:nth-child(odd) {
  margin: 0 14px 15px 0;
}
.libisryarr_list_div {
  width: 173px;
  height: 141px;
  border-radius: 3px;
  position: relative;
  background-color: #F6F8FA;
  padding:8px;
}
.libisryarr_list{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);
  border-radius: 3px;
  position: relative;
}
.libisryarr_img{
    width: 157px;
    height: 125px;
}
.libisryarr_img img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.libisryarr_img video{
    height: 100%;
    width: 100%;
    border-radius: 3px;
}
.libisryarr_botal{
  font-size: 12px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #B7BCC5;
  line-height: 24px;
}
.libisryarr_botal p:first-child{
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #212B36;
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
.clear {
  clear:both;
}
.third_libisryarr>div{
    width: 365px;
    height: 92px;
    float: left;
    margin: 0;
    background: #F6F8FA;
    border-radius: 4px;
    margin-bottom: 8px;
}

.third_libisryarr>div:hover{
   box-shadow: inset 0 0 10px 0px #ccc;
 }
.third_libisryarr_botal{
    padding:10px;
    height: 92px;
}
.third_libisryarr_botal_title{
    width: 200px;
    font-size: 14px;
    line-height: 22px;
    height: 52px;
    display:inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.third_title{
    width: 315px;
    height: 52px;
    font-size: 14px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
      width: 110px;
      height: 76px;
      margin: 8px;
}
.third_libisryarr_img img,.third_libisryarr_img video{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.sort_naver{
    padding: 10px 20px;
    display: flex;
}
.sort_naver label{
    font-size: 14px;
    color: #333333;
}
.collection_icon{
  display: none;
}
.show_list_start .collection_icon{
   display: block;
   cursor: pointer;
}
.preview{
  font-size: 12px;
  position: absolute;
  right: 7px;
  bottom: 9px;
  font-weight: bold;
}
.preview span{
  margin-right: 10px;
  cursor: pointer;
}

.preview span i{
  margin-right: 5px;
}
</style>
