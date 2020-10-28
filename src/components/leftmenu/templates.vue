<template>
   <div class="nav_top_temlaptes">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="模板" name="first">
        <div class='first_nav_top'>
          <ul>
            <li v-for="(item,key) in templatearr" :key=key @click="templatearrclick(key)" :class="{templateactive:key==texttemp}">{{item}}</li>
          </ul>
        </div>
        <div class='third_search' style='padding: 20px 21px 10px 19px;display:flex'>
          <el-input v-model="templateinput" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search" @click="searchtemplate()">搜索</el-button>
        </div>
        <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>

        <div>
          <div class="first_main_imgs infinite-list-wrapper" v-loading="loading" >
              <ul v-if="templateimgarr.length>0" style='height: 755px;overflow-y: auto;' v-infinite-scroll="loadTemplates" infinite-scroll-disabled="disabledtemplate">
                <li v-for="(item,key) in templateimgarr" :key = key :title="item.label" @click="templeteSource(key,item)" :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,templateimgarr)"  @mouseout="collectionIconmouseout(key,item,templateimgarr)">
                    <div v-html = item.templeteSource ></div>
                    <div class='collection_icon' :connectid="item.userId"   @click.stop="collectionIconclick(key,e,templateimgarr)" :class='item.userId ? "collectionAcitve" : "nocollectionAcitve" '>
                           <i class="el-icon-star-on"></i>
                    </div>
                </li>

                 <p v-if="loadimgtemplate" style='text-align:center'>加载中...</p>
                 <p v-if="templatenoMore">没有更多了</p>
              </ul>
            
              <div v-else>
                  <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
              </div>
          </div>
        </div>

      </el-tab-pane>

      <el-tab-pane label="媒资库" name="second">
       <div class="labelselect">
          <label for="">分类</label>
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
          <label for="">类型</label>
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </div>

        <div class='third_search' style='padding: 10px 20px;display:flex'>
          <el-input v-model="Shareinput" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search" @click="searchShare()">搜索</el-button>
        </div>

　　　　　<div v-loading="loading">
              <div v-if="Libraryarr.length>0">
                <div class="libisryarr" v-for="(item,key) in Libraryarr" :key = key>
                    <div class='libisryarr_list' @click="LibraryClick(item)">
                        <div class='collection_icon' @click.stop="collectionIconclick(key,e,Libraryarr)" :class='item.isFavorite == true ? "collectionAcitve" : "nocollectionAcitve" '>
                            <i class="el-icon-star-on"></i>
                        </div>
                        <div class="libisryarr_img" v-if="item.fileFormat=='mp4'">
                            <video :src="item.url" controls="controls" :poster="item.coverImageUrl">
                            </video>
                        </div>

                        <div class="libisryarr_img" v-else-if="item.fileFormat=='jpg'">
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

      <el-tab-pane label="稿库" name="third">
        <div class='third_search' style='padding: 10px 20px;display:flex'>
          <el-input v-model="Manuscriptinput" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search" @click="Manuscriptsearch()">搜索</el-button>
        </div>

        <div class="third_data">
            <el-date-picker
            v-model="datavalue"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </div>

        <div class='infinite-list-wrapper' v-loading="loading">
            <div v-if="Manuscript.length>0 && loading==false"  style="height: 776px;overflow-y: auto;margin-top: 20px;" v-infinite-scroll="loadManuscript" infinite-scroll-disabled="disabled">
              <div class="third_libisryarr" v-for="(item,key) in Manuscript" :key = key @click='ManuscriptClick(item)'>
                 <div v-if="item.thumbnailUrl && item.htmlContent" style='display: flex;position: relative;' :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,Manuscript)"  @mouseout="collectionIconmouseout(key,item,Manuscript)">
                      <div class='third_libisryarr_list'> 
                           <div class='collection_icon nocollectionAcitve' @click.stop="collectionIconclick(key,e,Manuscript)">
                              <i class="el-icon-star-on"></i>
                          </div> 
                          <div class="third_libisryarr_img">
                              <img  :src="item.thumbnailUrl.indexOf('http')? caiApi+item.thumbnailUrl : item.thumbnailUrl">
                          </div>
                      </div>
                      <div class="third_libisryarr_botal">
                        <p class='third_libisryarr_botal_title'><span class='third_libisryarr_botal_biaoshi'>图文</span>{{item.title?item.title:'暂无标题'}}</p>
                        <p>{{item.time}}</p>
                      </div>
                 </div>

                 <div v-else-if="!item.thumbnailUrl && item.htmlContent" :class="{show_list_start:item.show===true}" @mouseover="collectionIconmouseover(key,item,Manuscript)"  @mouseout="collectionIconmouseout(key,item,Manuscript)">
                     <div class="third_libisryarr_botal" style='position: relative;'>
                          <div class='collection_icon nocollectionAcitve'  @click.stop="collectionIconclick(key,e,Manuscript)">
                              <i class="el-icon-star-on"></i>
                          </div> 
                        <p class='third_libisryarr_botal_title'>{{item.title}}</p>
                      </div>
                 </div>
              </div>

              <p v-if="loadimg" style='text-align:center'>加载中...</p>
              <p v-if="collectionnoMore">没有更多了</p>
            </div>
            <div v-else-if='Manuscript.length==0 && loading==false'>
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
  import { getTempleteSourceList } from '@/http/api'  // 获取模板
  import { listObjects } from '@/http/api'           //稿库
  import { favorTemplate } from '@/http/api'           //模板收藏
  import { cancelFavorTemplate } from '@/http/api'           //取消模板收藏
  import { Mediadd } from '@/http/api'      //媒资库收藏
  import { Mediadell } from '@/http/api'    //取消媒资库收藏
  import { FavoriteMixmdedia } from '@/http/api'    //稿件是否收藏
  import { favoriteadd  } from '@/http/api'    //稿件添加收藏
  import { favoritedell  } from '@/http/api'    //稿件取消收藏
  import { store } from '@/store'
  export default {
    data() {
      return {
        datavalue: '', //稿件时间检索
        activeName: 'first',
        templatearr:['标题','正文','图文','引导','分割线','二维码','其他'],
        texttemp:0,
        Shareinput:'',//媒资库检索的关键字
        Libraryarr:[],//媒资库检索结果
        options1: [],
        value1: '分类',
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
        value2: '图片',
        templateinput:'',//模板搜索的关键字

        templateimgarr:[], //模板
        loadimgtemplate:false,
        templatepage:1,//模板的页数
        templatepageNum:10,//模板每次加载条数
        templatetotal:'',//模板的总条数

        loading:true,
        caiApi:"http://127.0.0.1:9080",

        Manuscriptinput:'', //稿库的检索的字

        Manuscript:[],  //稿库
        Manuscriptotal:'',   //稿库的总条数
        loadimg:false, //稿件滚动加载
        Manuscrippage:0,//稿库的页数
        ManuscrippageNum:10,//稿件每次加载条数
        ManuscripIDarr:[],//稿件id
        Manuscripcollect:[] //收藏的稿件
      };
    },
    created(){
        let _that = this
      //获取标题模板
        let Listparam = {
            label: '',
            templeteType: 1,
            status: 0,
            size: _that.templatepageNum,
            page: _that.templatepage,
            sort: 'use_num,desc',
            ContentType:true
        }
        getTempleteSourceList(Listparam).then(res=>{
            if(res){
              _that.loading = false
              _that.templatetotal = res.totalElements

              res.content.forEach(function (item) {
                item.show = false
                _that.templateimgarr.push(item);
                console.log(_that.templateimgarr)
              });  
            }
        })
    },
    computed: {
      //稿库=========================================================
      collectionnoMore () {  
        return this.Manuscript.length-1 >= this.Manuscriptotal
      },
      disabled () {
        return this.loadimg || this.collectionnoMore
      },

      //模板=========================================================
      templatenoMore () {
        return this.templateimgarr.length-1 >= this.templatetotal
      },
      disabledtemplate (){
          return this.loadimgtemplate || this.templatenoMore
      }
    },

    methods: {
      handleClick(tab, event) {
        if(tab.label=='媒资库'){
            this.options1 = []
            //获取分类
            let param = {
              tenantId: 5,
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

            this.loading = true
            if(this.value1=='分类' || this.value2=='全部'){
              this.value1 = 1
              this.value2 = 0
            }
            let value1arr = []
            value1arr.push(this.value1.toString())
            let Searchparam = {
                ContentType:true,
                classifyIds:value1arr, //分类的id
                keyWords:this.Shareinput,//关键字
                mediaType:this.value2, //类型
                tenantId:5, //组织id
                sortParam:'create_time',
                sortType:'desc',
            }
            SearchShareAssets(Searchparam).then(res=>{  //媒资库检索
              if(res){
                this.loading = false
                this.Libraryarr = res.data
              }
            })
        }else if(tab.label=='稿库'){
            let Objectparam = {
                ContentType:true,
                keywords: '',
                library: 'workspace',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: this.$route.query.id,
                editorType: 'COMPO',
                page: this.Manuscrippage,
                size: 10
            }
            listObjects(Objectparam).then(res=>{
              if(res){
                let _that = this
                _that.loading = false
                res.content.forEach(function (item) {
                   item.show=false
                  _that.Manuscript.push(item);
                  _that.ManuscripIDarr.push(item.id)
                });
                _that.Manuscriptotal = res.totalElements

                let parmas ={
                    tenantId: 5,
                    uuids:_that.ManuscripIDarr
                  }
                FavoriteMixmdedia(parmas).then((res)=>{
                  if(res){
                    this.Manuscripcollect=res.data
                  }
                })
              }
            })
        }
      },
      templeteSource(index,item){
        store.ueditor.setContent(item.templeteSource,true)
      },
      templatearrclick(index){
         let _that = this
         _that.templateimgarr=[]
         _that.texttemp = index
         let Listparam = {
            label: '',
            templeteType: index+1,
            status: 0,
            size: 10,
            page: 0,
            sort: 'use_num,desc',
            ContentType:true
         }
         getTempleteSourceList(Listparam).then(res=>{
            if(res){
             _that.templatetotal = res.totalElements

              res.content.forEach(function (item) {
                item.show = false
                _that.templateimgarr.push(item);
              }); 
            }
         })
      },
      collectionIconclick(index,e,arr){
        let param = {
          templateId:arr[index].templeteId,
          ContentType:true
        }

        let libraryparam = {
          ContentType:true,
          assetId:arr[index].assetId,
          tenantId:5
        }

        let favoriteparam = {
           ContentType:true,
           tenantId:5,
           uuid:arr[index].id,
           createTime:arr[index]
        }
        

        if(arr == this.templateimgarr){
            if(arr[index].userId){
                this.arr[index].userId = false
                cancelFavorTemplate(param).then(res=>{ //取消模板收藏
                  console.log(res)
                })
            }else{
                this.arr[index].userId = true
                favorTemplate(param).then(res=>{ //模板收藏
                  console.log(res)
                })
            }
        }else if(arr == this.Libraryarr){
           if(arr[index].isFavorite){
                this.arr[index].isFavorite = false
                Mediadell(libraryparam).then(res=>{ //取消媒资库收藏
                  console.log(res)
                })
           }else{
                this.arr[index].isFavorite = true
                Mediadd(libraryparam).then(res=>{ //媒资库收藏
                  console.log(res)
                })
           }
        }else if(arr == this.Manuscript){
             if(this.Manuscripcollect.length==0){
                favoriteadd(favoriteparam).then(res=>{ //取消稿件收藏
                  console.log(res)
                })
            }else{
                // this.arr[index].isFavorite = true
                favoritedell(favoriteparam).then(res=>{ //稿件收藏
                  console.log(res)
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
       store.ueditor.setContent(str,true)
      },
      searchShare(){
         this.loading = true
         if(this.value1=='分类' || this.value2=='全部'){
           this.value1 = 1
           this.value2 = 0
         }
         let value1arr = []
         value1arr.push(this.value1.toString())
         let Searchparam = {
             classifyIds:value1arr, //分类的id
             keyWords:this.Shareinput,//关键字
             mediaType:this.value2, //类型
             tenantId:5 //组织id
         }
         SearchShareAssets(Searchparam).then(res=>{  //媒资库检索
           if(res){
             this.loading = false
             this.Libraryarr = res.data
           }
         })
      },
      searchtemplate(){
        //获取标题模板
         let Listparam = {
            label: this.templateinput,
            templeteType: 1,
            status: 0,
            size: 10,
            page: 1,
            sort: 'use_num,desc',
            ContentType:true
         }
         getTempleteSourceList(Listparam).then(res=>{
            if(res){
              this.loading = false
              this.templateimgarr = res.content
            }
         })

      },
      Manuscriptsearch(){
           this.loading = true
           let Objectparam = {
                ContentType:true,
                keywords: this.Manuscriptinput,
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: this.$route.query.id,
                editorType: 'COMPO',
                page: 0,
                size: 10,
                startDate:this.datavalue,
                endDate:this.datavalue
            }
            listObjects(Objectparam).then(res=>{
              if(res){
                this.loading = false
                
                 res.content.forEach(function (item) {
                   item.show=false
                  _that.Manuscript.push(item);
                  _that.ManuscripIDarr.push(item.id)
                });
                _that.Manuscriptotal = res.totalElements
              }
            })
      },
      ManuscriptClick(item){
          store.ueditor.setContent(item.htmlContent)
      },
      loadManuscript () {
          let _that = this
           _that.loadimg = true

          let Objectparam = {
                ContentType:true,
                keywords: '',
                library: 'workspace',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: _that.$route.query.id,
                editorType: 'COMPO',
                page: _that.Manuscrippage,
                size: _that.ManuscrippageNum
            }
          if(_that.loadimg){
            listObjects(Objectparam).then(res=>{
            if(res){
               _that.loadimg = false
               _that.Manuscrippage = _that.Manuscrippage+1
               _that.Manuscriptotal = res.totalElements
              res.content.forEach(function (item) {
                 item.show=false
                _that.Manuscript.push(item);
                _that.ManuscripIDarr.push(item.id)
              }); 
              
              
            }
          })
          }
         

      },
      loadTemplates(){
        let _that = this
        _that.loadimgtemplate = true

        //获取标题模板
        let Listparam = {
            label: '',
            templeteType: 1,
            status: 0,
            size: _that.templatepageNum,
            page: _that.templatepage,
            sort: 'use_num,desc',
            ContentType:true
        }

        if(_that.loadimgtemplate){
            getTempleteSourceList(Listparam).then(res=>{
            if(res){
              _that.loading = false
              _that.templatepage = _that.templatepage+1
              _that.templatetotal = res.totalElements
              res.content.forEach(function (item) {
                 item.show = false
                _that.templateimgarr.push(item);
              });  
            }
          })
        }
        
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
      }
    }
  };
</script>
<style>
   .nav_top_temlaptes .el-input__icon{
     line-height: 36px;
   }
   .nav_top_temlaptes .is-active {
      color: #D72323;
   }
   .nav_top_temlaptes .el-tabs__active-bar{
      width: 112px;
      height: 4px;
      background-color: #D72323;
   }
   .nav_top_temlaptes .el-tabs__item:hover{
     color:#D72323
   }
   .nav_top_temlaptes .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
   }
   .nav_top_temlaptes .el-tabs--top .el-tabs__item.is-top{
      width: 112px;
      text-align: center;
   }
   .nav_top_temlaptes .el-tabs__nav{
     margin-left: 32px;
     height: 60px;
     line-height: 70px;
     font-size: 14px;
   }
   .third_search .el-input__inner{
     border-right: none;
   }
   .third_search .el-button{
     border-radius: 0px 4px 4px 0px;
   }
   .third_data .el-input__inner{
     width: 140px;
     height: 35px;
   }
   .nav_top_temlaptes .labelselect .el-input--suffix .el-input__inner{
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 4px;
   }
</style>
<style scoped>
 .first_nav_top ul{
   margin-left: 15px;
   overflow: hidden;
 }
 .first_nav_top ul li{
    width:48px;
    height:32px;
    background: #EEF3F9;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    line-height: 32px;
    text-align: center;
    float: left;
    margin:0 2px;
    cursor: pointer;
 }
 .first_nav_top ul .templateactive{
    background: #ffe1e1;
    color: #EA5E5E;
    border-radius: 4px;
    border-radius: 4px;
 }
 .first_main_imgs{
    width: 343px;
    border: 1px solid #E7ECF2;
    margin-left: 25px;
    margin-top: 10px;
    min-height: 745px;
 }

 .first_texttemp{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 2.2px;
    margin-top: 10px;
    margin-left: 20px;
 }

 .first_main_imgs ul{
   padding-bottom: 10px;
   min-height: 735px;
 }

 .first_main_imgs ul li{
    width: 100%;
    text-align: center;
    padding: 15px 0px;
    position: relative;
 }
 .first_main_imgs ul li:hover{
   box-shadow: inset 0 0 10px 0px #ccc;
 }
 .first_main_imgs ul li img{
   max-width: 100%;
   margin-top: 5px;
 }
 .third_data{
   width:140px;
   height:35px;
   margin-left: 240px;
 }
 .collection_icon{
    width: 18px;
    height: 18px;
    display: inline-block;
    line-height: 16px;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    right: 0px;
    top: 5px;
    font-size: 14px;
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
.libisryarr{
    width: 173px;
    height: 180px;
    float: left;
    margin: 10px 0px 20px 18px;
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
    padding: 10px 20px;
    display: flex;
}
.labelselect label{
    width: 82px;
    line-height: 38px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
}

.third_libisryarr>div{
    width: 364px;
    height: 125px;
    float: left;
    margin: 0px 18px 0px 18px;
    border-bottom:1px solid #dcdfe6
}
.third_libisryarr:first-child>div{
    border-top:1px solid #dcdfe6
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
      height: 104px;
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
.collection_icon{
  display: none;
}
.show_list_start .collection_icon{
   display: block;
   cursor: pointer;
}
</style>
