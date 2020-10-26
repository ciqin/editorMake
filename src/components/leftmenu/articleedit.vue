<template>
  <div class='nav_top_articleedit'>
     <p class='htitle'>关联文章</p>
          
      <div v-loading="loading">
        <div v-if="Relatedarr.length>0 && loading==false"> 
          <div v-for="(item,key) in  Relatedarr" :key = key  class='acticle_list'>
              <!-- <div class='collection_icon' @click="collectionIconclick(key)" :class='item.iscollection===true ? "collectionAcitve" : "nocollectionAcitve" '>
                <i class="el-icon-star-on"></i>
              </div> -->

              <div>
                <div :class="item.iscontent===true?'arrow_up_icon arrow_down_icon':'arrow_up_icon'" @click="arrowupIconclick(key,item)">
                  <i :class="item.iscontent===true?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
              </div>

              <div class='acticle_list_title' :title='item.title'>{{item.title}}</div>

              <div v-if='item.content!=""'>
                <div class="acticle_list_bottom">
                  <div class='acticle_list_content' v-if="item.iscontent">{{item.content}}</div>
                  <div class='acticle_list_content' v-else>{{item.partcontent}}</div>
                  <div class='acticle_list_keyword'>关联点：{{item.words}}</div>
                  <div class='acticle_list_Similarity'>关联度：{{item.similarity}}</div>
                </div>
              </div>

              <div v-else>
                    <div class='acticle_list_keyword'>关联点：{{item.words}}</div>
                    <div class='acticle_list_Similarity' style="padding-bottom: 10px;">关联度：{{item.similarity}}</div>
              </div>
          </div>
        </div>
        <div v-else>
            <p style='text-align: center;color: #606266;margin-top: 50px;font-size: 18px;'><i class='el-icon-warning-outline'></i>暂无数据</p>
        </div>
      </div>
        
  </div>
</template>
<script>
import { getRelatedArticles } from '@/http/api'
export default {
    props:{
       uestrvalue:String
    },
    data() {
      return {
        activeName: 'first',
        arrowupAcitve:false,
        collectionIndex:0,
        arrowupIndex:false,
        Relatedarr:[],
        loading:true
      };
    },
    mounted(){
     
    },
    created(){
      let param = {
           content: this.uestrvalue
        }
        getRelatedArticles(param).then(res=>{
            if(res){  
              this.loading = false
              this.Relatedarr = res.data 

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
            }else{
              this.loading = false
            }
        })
    },
    watch:{
      uestrvalue:function(uestrvalue,newuestrvalue){
       let param = {
           content: this.uestrvalue
        }
        getRelatedArticles(param).then(res=>{
            if(res){  
              this.Relatedarr = res.data 

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
            }
        })
      }
      
     },
    methods: {
    handleClick(tab, event) {
    },
    collectionIconclick(index){
      if(this.Relatedarr[index].iscollection===true){
        this.Relatedarr[index].iscollection = false
      }else{
        this.Relatedarr[index].iscollection = true
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

    }
    }
}
</script>
<style>
  .nav_top_articleedit .el-tabs__header{
    margin:0
  }
  .nav_top_articleedit .el-tabs__nav{
    width: 100%;
    height: 60px;
    line-height: 70px;
    font-size: 14px;
  }
  .nav_top_articleedit .el-loading-mask{
    margin:100px
  }
  .nav_top_articleedit .el-loading-mask .el-loading-spinner .path {
    stroke: #d72323;
  }

  .nav_top_articleedit .el-tabs__nav .el-tabs__item{
      padding: 0;
      width: 25%;
      text-align: center;
      line-height: 45px;
   }
   .nav_top_articleedit .el-tabs__nav .is-active{
         color: brown;
          line-height: 60px;
          padding: 0;
          margin: 0;
          height: 60px;
   }
   .nav_top_articleedit .el-tabs__active-bar{
          height: 4px;
          background-color: #D72323;
   }
</style>
<style scoped>
.nav_top_articleedit{
      height: 100%;
      overflow-y: auto;
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
</style>
