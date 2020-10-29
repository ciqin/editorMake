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
                      <div class='collection_icon' :connectid="item.userId"   @click.stop="collectionIconclick(key,e,templateimgarr)" :class='item.userId ? "collectionAcitve" : "nocollectionAcitve" '>
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
        <el-tab-pane label="我的素材" name="second">我的素材</el-tab-pane>
        <el-tab-pane label="我的稿件" name="third">
           <div v-loading="loadingmusc">
              <div class='infinite-list-wrapper'>
                  <div v-if="Manuscriptidarr.length>0 && loading==false"  style="height: 872px;overflow-y: auto;margin-top: 20px;" >
                        <div class="third_libisryarr" v-for="(item,key) in Manuscript" :key = key @click='ManuscriptClick(item)'>
                                 <div v-if="item.thumbnailUrl && item.htmlContent" style='display: flex;position: relative;' :class="{show_list_start:item.show===true}">
                                      <div class='third_libisryarr_list'> 
                                           <div class='collection_icon collectionAcitve'>
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
                                         <div class='collection_icon collectionAcitve'>
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
      </el-tabs> 
  </div>
</template>
<script>
import { getFavorTemplate } from '@/http/api'
import { listObjects } from '@/http/api'           //稿库
import { getFavoriteMixmdedias } from '@/http/api'    //查看收藏的文稿
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

      Manuscrippage:0,//稿库的页数

      caiApi:"http://127.0.0.1:9080",
    }
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
    getFavorTemplate(Listparam).then(res=>{
        if(res){
          _that.loading = false
          _that.templatetotal = res.totalElements

          res.content.forEach(function (item) {
            item.show = false
            _that.templateimgarr.push(item);
          });  
        }
    })
  },
  methods: {
      handleClick(tab, event) {
        if(tab.label=='我的稿件'){
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
        }
      },
      templatearrclick(index){
         this.texttemp = index
         let Listparam = {
            label: '',
            templeteType: index+1,
            status: 0,
            size: 10,
            page: this.templatepage,
            sort: 'use_num,desc',
            ContentType:true
         }
         getFavorTemplate(Listparam).then(res=>{
            if(res){
              this.loading = false
              this.templateimgarr = res.content
            }
         })
      },
      templeteSource(index,item){
        store.ueditor.setContent(item.templeteSource,true)
      },
      searchtemplate(){
         let _that = this
         //获取标题模板
          let Listparam = {
              label: _that.templateinput,
              templeteType: 1,
              status: 0,
              size: _that.templatepageNum,
              page: _that.templatepage,
              sort: 'use_num,desc',
              ContentType:true
          }
          getFavorTemplate(Listparam).then(res=>{
              if(res){
                _that.loading = false
                _that.templatetotal = res.totalElements

                res.content.forEach(function (item) {
                  item.show = false
                  _that.templateimgarr.push(item);
                });  
              }
          })
      }
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
      width: 112px;
      text-align: center;
   }
   .collect_list .el-tabs__nav{
     margin-left: 32px;
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
.first_main_imgs{
    width: 343px;
    border: 1px solid #E7ECF2;
    margin-left: 25px;
    margin-top: 10px;
    min-height: 745px;
}

</style>