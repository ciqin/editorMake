<template>
  <div class='collect_list'> 
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的模板" name="first">
          <div class='first_nav_top'>
            <ul>
              <li v-for="(item,key) in templatearr" :key = key    @click="templatearrclick(key)" :class="{templateactive:key==texttemp}">{{item}}</li>
            </ul>
          </div>
          <div class='third_search' style='padding: 20px 21px 10px 19px;display:flex'>
            <el-input v-model="templateinput" placeholder="请输入关键字(名称,内容)"></el-input>
            <el-button icon="el-icon-search" @click="searchtemplate()">搜索</el-button>
          </div>
           <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>
           <div>
              <div class="first_main_imgs infinite-list-wrapper" v-loading="loading" >
                  <ul v-if="templateimgarr.length>0" style='height: 755px;overflow: auto;'>
                    <li v-for="(item,key) in templateimgarr" :key = key :title="item.label" @click="templeteSource(key,item)" :class="{show_list_start:item.show===true}">
                      <div v-html = item.templeteSource ></div>
                      <div class='collection_icon' :connectid="item.userId"   @click.stop="collectionIconclick(key,templateimgarr)" :class='item.userId ? "collectionAcitve" : "nocollectionAcitve" '>
                             <i class="el-icon-star-on"></i>
                        </div>
                    </li>
                  </ul>
                
                  <div v-else>
                    <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
                  </div>
              </div>
          </div>
        </el-tab-pane>

        <!-- <el-tab-pane label="我的素材" name="second">我的素材</el-tab-pane> -->
       
        <el-tab-pane label="我的稿件" name="third">
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

           <div v-loading="loadingmusc">
              <div class='infinite-list-wrapper'>
                  <div v-if="Manuscriptidarr.length>0 && loading==false"  style="height: 872px;overflow-y: auto;margin-top: 20px;" >
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
                  <div v-else-if='Manuscriptidarr.length==0 && loading==false'>
                      <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
                  </div>
              </div>
           </div>
        </el-tab-pane>

        <el-tab-pane label="关联文章" name="four">
          <div v-loading="loading" style='height: 894px;overflow-y: auto;'>
              <div v-if="Relatedarr.length>0 && loading==false"> 
                <div v-for="(item,key) in  Relatedarr" :key = key  class='acticle_list'>
                    <div class='collection_icon collectionAcitve' @click="collectionIconclick(key,Relatedarr)">
                      <i class="el-icon-star-on"></i>
                    </div>

                    <div>
                      <div :class="item.iscontent===true?'arrow_up_icon arrow_down_icon':'arrow_up_icon'" @click="arrowupIconclick(key,item)">
                        <i :class="item.iscontent===true?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                      </div>
                    </div>

                    <div class='acticle_list_title' :title='item.title'>{{item.title}}</div>

                    <div v-if='item.content!=""'>
                      <div class="acticle_list_bottom">
                        <div class='acticle_list_content' v-if="item.iscontent" @mouseup="listcontentup">{{item.content}}</div>
                        <div class='acticle_list_content' v-else @mouseup="listcontentup">{{item.partcontent}}</div>
                      </div>
                    </div>
                </div>

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
      </el-tabs> 
  </div>
</template>
<script>
import { getFavorTemplate } from '@/http/api'
import { listObjects } from '@/http/api'           //稿库
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
      activeName: 'first',
      templatearr:['标题','正文','图文','引导','分割线','二维码','其他'],
      texttemp:0,
      templateinput:'',//模板搜索的关键字
      templateimgarr:[], //模板
      loadimgtemplate:false,
      templatepage:0,//模板的页数
      templatepageNum:10,//模板每次加载条数
      templatetotal:'',//模板的总条数

      Manuscript:[],   //稿件从template的所有数据
      Manuscriptidarr:[],//收藏的id
      Manuscriptinput:'', //稿库的检索的字
      datavalue: '', //稿件时间检索

      Manuscrippage:0,//稿库的页数

      actpageNum:0,//关联文章的页数
      Relatedarr:[],//关联文章

      text:'',//滑过获取关联文章
      Tooltipstyle:'display:none',//滑过获取关联文章样式
      templeteType:1,

      caiApi:"http://qhcloudhongqi.wengegroup.com:9080",
    }
  },
  created(){
     this.loadTemplates()
  },
  methods: {
      handleClick(tab, event) {
        if(tab.label=='我的稿件'){
          ilgcreations().then(res=>{
             getFavoriteMixmdedias().then((res)=>{
              this.loadingmusc = false
              this.Manuscriptidarr = res.data

              let Objectparam = {
                  ContentType:true,
                  keywords: '',
                  library: 'manuscript',
                  types: 'TEXT,COMPO,LIVE',
                  excludedIds: this.$route.query.id,
                  editorType: 'COMPO',
                  page: this.Manuscrippage,
                  size: 10,
                  ids:res.data
              }
              listObjects(Objectparam).then((res)=>{
                  console.log(res)
                  this.Manuscript = res.content
              })
            })
          })
          
        }else if(tab.label=='关联文章'){
          let actparam = {
            pageNum:this.actpageNum,
            pageSize:10
          }

          ilgcreations().then(res=>{
               getTopics(actparam).then((res)=>{
                  if(res){
                    this.loading = false
                    this.Relatedarr = res.data[0].list

                    this.Relatedarr.forEach((item,key)=>{
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
                    })
                    console.log(res)
                    console.log(this.Relatedarr)
                  }
              })
          })
         
        }
      },
      templatearrclick(index){
         let _that = this
         _that.templateimgarr=[]
         _that.texttemp = index
         _that.templeteType = index+1
        this.loadTemplates()
      },
      templeteSource(index,item){
        store.ueditor.setContent(item.templeteSource,true)
      },
      searchtemplate(){
        this.templateimgarr=[]
        this.loadTemplates()
      },
      Manuscriptsearch(){
        this.loadingmusc = true
        ilgcreations().then(res=>{
           getFavoriteMixmdedias().then((res)=>{
            this.loadingmusc = false
            this.Manuscriptidarr = res.data

            let Objectparam = {
                ContentType:true,
                keywords: this.Manuscriptinput,
                library: 'manuscript',
                types: 'TEXT,COMPO,LIVE',
                excludedIds: this.$route.query.id,
                editorType: 'COMPO',
                page: this.Manuscrippage,
                size: 10,
                ids:res.data,
                startDate:this.datavalue,
                endDate:this.datavalue
            }
            listObjects(Objectparam).then((res)=>{
                this.loadingmusc = false
                this.Manuscript = res.content
            })
          })
        })
        
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
             this.templateimgarr.splice(index,1)
            })
          })
        }else if(arr == this.Manuscript){
            let favoriteparam = {
            uuid:arr[index].id,
            }
        
            ilgcreations().then(res=>{
              favoritedell(favoriteparam).then((res)=>{
               this.Manuscript.splice(index,1)
              })
            })
            
        }else if(arr == this.Relatedarr){
            let Relateparam = { 
                uuid:this.Relatedarr[index].uuid,
                tenantId:5,
                title:this.Relatedarr[index].title,
                content:this.Relatedarr[index].content,
                pubtime:this.Relatedarr[index].pubtime
            }

            ilgcreations().then(res=>{
              Articledell(Relateparam).then((res)=>{
                this.Relatedarr.splice(index,1)
              })
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
        store.ueditor.setContent(this.text,true)
        this.Tooltipstyle = 'display:none'
      },
      loadTemplates(){
        let _that = this
        _that.loadimgtemplate = true
        //获取标题模板
        let Listparam = {
            label:  _that.templateinput,
            templeteType:_that.templeteType,
            status: 0,
            pageSize: _that.templatepageNum,
            pageNum: _that.templatepage,
            sort: 'use_num,desc',
        }

        if(_that.loadimgtemplate){
          ilgcreations().then(res=>{
            getFavorTemplate(Listparam).then(res=>{
              if(res){
                _that.loading = false
                _that.loadimgtemplate = false
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

  }
}
</script>
<style>
   .collect_list .is-active {
      color: #D72323;
   }
   .collect_list .el-tabs__active-bar{
      width: 112px;
      height: 4px;
      background-color: #D72323;
   }
   .collect_list .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
   }
   .collect_list .el-tabs__item:hover{
     color:#D72323
   }
   .collect_list .el-tabs--top .el-tabs__item.is-top{
      width: 87px;
      text-align: center;
   }
   .collect_list .el-tabs__nav{
     margin-left: 20px;
     height: 60px;
     line-height: 70px;
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
 .first_main_imgs .collection_icon,.third_libisryarr .collection_icon{
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
.first_main_imgs{
    width: 343px;
    border: 1px solid #E7ECF2;
    margin-left: 25px;
    margin-top: 10px;
    min-height: 745px;
}
.acticle_list{
    width: 368px;
    margin: 20px;
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