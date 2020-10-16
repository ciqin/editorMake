<template>
  <div class='nav_top_articleedit'> 
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关联文章" name="first">
          <div>

            <div v-for="(item,key) in  Relatedarr" :key = key  class='acticle_list'>
                <div>{{item.title}}</div>
                <div class='acticle_list_content'>{{item.content}}</div>
                <div>关联点：{{item.keyword}}</div>
                <div>关联度：{{item.Similarity}}</div>
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
        activeName: 'second',
        Relatedarr:[
            {
                title:'标题一',
                content:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。支持全球200种语言互译，包括中文（简体）、英语、日语、韩语、西班牙语、泰语、法语和阿拉伯语等，覆盖约4万个翻译方向，是国内市场份额第一的翻',
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
        console.log(tab, event);
      }
    }
}
</script>
<style>
  .nav_top_articleedit .el-tabs__nav{
    width: 100%;
  }
  
  .nav_top_articleedit .el-tabs__nav .el-tabs__item{
      padding: 0;
      width: 25%;
      text-align: center;
      line-height: 45px;
   }
   .nav_top_articleedit .el-tabs__nav .is-active{
     color: brown;
     line-height: 40px;
   }
</style>
<style scoped>
.nav_top_articleedit{
      height: 100%;
      overflow-y: auto;
}
.acticle_list{
    width: 90%;
    margin: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}
.acticle_list_content{
  background: #f6f7f9;
  padding: 10px;
}
</style>