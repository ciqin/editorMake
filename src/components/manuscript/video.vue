<template>
  <div>
       <!--超级地图-->
      <div id="superMap" style="width:200px;height:200px;border:1px solid red;">
          发动机刻录机发多少就反馈了圣诞节快乐副书记抵抗力
          <input type="text">
      </div>
      <!--点击button即可实现页面的截图-->
      <div id="test">
        <el-button @click="getImg">截图</el-button>
      </div>
  </div>
</template>
<script>
import kscreenshot from 'kscreenshot'
import html2canvas from 'html2canvas'
new kscreenshot(
    {
        key: 65,
        copyPath:function (aa) {
          console.log(aa)
        },
        endCB:function (aa) {
          console.log(aa)
        }  
    }
)
export default {
  methods:{
    //截图方法
    getImg(){
        let self = this;
        var content_html = document.getElementById('superMap');//要转化的div
        let width = content_html.offsetWidth;
        let height = content_html.offsetHeight;
        let offsetTop = content_html.offsetTop;
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');
        // let scaleBy = self.getPixelRatio(context);
        canvas.width = width*1;
        canvas.height = (height+offsetTop)*1;
        context.scale(1,1);
        var opts = {
        　　allowTaint:true,//允许加载跨域的图片
        　　tainttest:true, //检测每张图片都已经加载完成
            scale:1, // 添加的scale 参数
            canvas:canvas, //自定义 canvas
            logging: true, //日志开关，发布的时候记得改成false
            width:width, //dom 原始宽度
            height:height //dom 原始高度
        };
        html2canvas(content_html,opts).then(function (canvas) {
        　canvas.style.width = width+"px";
          canvas.style.height = height+"px";
          var image = new Image();
          image.src = canvas.toDataURL();
          document.getElementById('test').appendChild(image);//将转化好的图片插入到防止图片转换的div中
          // content_html.style.display='none'
        });
    }
  }
}


</script>
<style scoped>
</style>