<template>
  <div class='nav_top_articleedit'> 
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关联文章" name="first">
          <div>

            <div v-for="(item,key) in  Relatedarr" :key = key  class='acticle_list'>
                <div class='collection_icon' @click="collectionIconclick(key)" :class='item.iscollection===true ? "collectionAcitve" : "nocollectionAcitve" '>
                  <i class="el-icon-star-on"></i>
                </div>
                <div class='arrow_up_icon' @click="arrowupIconclick(key)">
                  <i class="el-icon-arrow-up"></i>
                </div>
                <div class='acticle_list_title'>{{item.title}}</div>
                <div class="acticle_list_bottom">
                  <div class='acticle_list_content'>{{item.content}}</div>
                  <div class='acticle_list_keyword'>关联点：{{item.keyword}}</div>
                  <div class='acticle_list_Similarity'>关联度：{{item.Similarity}}</div>
                </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="知识图谱" name="second">知识图谱</el-tab-pane>
        <el-tab-pane label="热文分析" name="third">热文分析</el-tab-pane>
        <el-tab-pane label="智能报告" name="fourth">智能报告</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
export default {
     data() {
      return {
        activeName: 'first',
        arrowupAcitve:false,
        collectionIndex:0,
        arrowupIndex:false,
        Relatedarr:[
            {
                title:'标题一',
                content:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务支持全球200种语言互译，包括中文（简体）、英语、日语、韩语、西班牙语、泰语、法语和阿拉伯语等，覆盖约4万个翻译方向，是国内市场份额第一的翻',
                iscollection:true,
                keyword:'习近平，特朗普',
                Similarity:'30%'

            },
            {
                title:'标题二',
                content:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。支持全球200种语言互译，包括中文（简体）、英语、日语、韩语、西班牙语、泰语、法语和阿拉伯语等，覆盖约4万个翻译方向，是国内市场份额第一的翻',
                iscollection:false,
                keyword:'习近平，特朗普',
                Similarity:'30%'

            },
            {
                title:'标题三',
                content:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。支持全球200种语言互译，包括中文（简体）、英语、日语、韩语、西班牙语、泰语、法语和阿拉伯语等，覆盖约4万个翻译方向，是国内市场份额第一的翻',
                iscollection:false,
                keyword:'习近平，特朗普',
                Similarity:'30%'

            },
            {
                title:'标题四',
                content:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。支持全球200种语言互译，包括中文（简体）、英语、日语、韩语、西班牙语、泰语、法语和阿拉伯语等，覆盖约4万个翻译方向，是国内市场份额第一的翻',
                iscollection:false,
                keyword:'习近平，特朗普',
                Similarity:'30%'

            }
        ]
      };
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
      arrowupIconclick(index){
        this.arrowupIndex = index
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
    height:253px;
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
  display: -webkit-box;
  -webkit-line-clamp:5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  width: 336px;
  height: 135px;
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
  height: 200px;
}
.acticle_list_title{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #22272E;
    letter-spacing: 0;
    line-height: 22px;
    padding-bottom: 6px;
}
.acticle_list_Similarity,.acticle_list_keyword{
  letter-spacing: 0;
  font-family: MicrosoftYaHei;
  font-size: 13px;
  color: #212B36;
  line-height: 24px;
}
.acticle_list_Similarity{
  padding-bottom: 37px;
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
.arrowupAcitve{
    
}
</style>