<template>
  <div> 
    <el-form ref="form"  label-width="130px">
      <div class="p30">
          <h6 class="wordTitle">关联配图</h6>
          <span class="tip">根据文字内容，可自动配图</span> 
      </div>
      <!-- <el-form-item label="敏感词分析"   class="p30">
              <el-switch
                  v-model="value"
                  active-color="#d52324"
                  inactive-color="#d52324">
              </el-switch>
              <span class="tip">识别文本中涉黄、涉政或其他违禁等敏感词汇</span>  
      </el-form-item> -->
      <div class="line"></div>
      <div style="text-align:center;padding:0 20px;" class="impression">
        <el-button type="primary" size="mini" @click="sensitiveWords" style="background: #303841;border:none;">开始分析</el-button>
        <div  v-for="(tab,index) in wordList" :key="tab">
           <el-form-item :label="tab.name">
                  <el-progress :percentage="tab.bl" :format="format" class="mt11" style="color:red;width:230px;"></el-progress>
          </el-form-item>
        </div>
        <div class="noneData" v-if="noneData" style="font-size: 30px;padding-top: 40px;">
           暂无数据
        </div>
      </div>
      
    </el-form>
  </div>
</template>
<script>
import {correction,newG} from '@/http/api'
import { store } from '@/store'
export default {
  data(){
    return{
      form :1,
      value:"",
      wordList:[],
      maxData:0,
      noneData:1
    }
  },
   methods: {
      format(percentage) {
        return percentage === this.maxData ? '满' : `${Math.round(percentage*6/100)}个`;
      },
      sensitiveWords(){
        let data = {
          title:"Ikeqang 习大大中华民国腾讯今年中国人民共和国下半年上世纪将在微信账户钱包帐户的九宫格中开设快遮的笑着",
          content:"江氏政治委员江氏政治委员江氏政治江氏政治委员江氏政治委员江氏政治委员江氏政治委员局解决台湾解放tw江祸心江核心胡温政府1.独眼龙香港、澳门是中国的特别行政区，台湾是中国的一个省。在任何文字、地图、图表中不应将香港、测门、台湾写作（国家）和地区（香港、澳门是中国的特别行政区。在任何文字、地图、图表中都要避免让人误以为香港、演门是国家，尤其是与其他国家名称连用时，应注意以国家和2.不应将台菌写作福摩萝3不应将撒给拉沙溴以南的地区写作黑非，应写作撒验拉沙漠以南的非洲。4不应将朝鲜民主主义人民共和国写作北鲜（英文Noth Korea），应写作朝鲜the DenmocaicPeplesRepbicofKorea DPRK. 5不应将中国台北常驻世贸组织代表写作大使常驻大使，应写作常驻代表，6涉及残疾人报道中，不可以使用伤残人运动会残废大驶眼 瞎子登子餐子呆子弱暂子拐子，可以使用残疾人运动会残疾人盲人善人智力障碍者。禁止使用残疾人体育璀川的说法。7涉及少数民族支系、落，只能称为XX人，如不可以使用阴酸族撒尼族穿（川）青族橙族，可以使用摩梭人尼人穿（川）青人僮人。清空8涉及古代民族名称，不应将高句丽称为高丽，不应将哈萨克族乌孜别克族称为突厥族 突厥人. 9对影确新疆稳定的分裂数对势力的称谓，可以使用东突势力、三股势力;禁止使用疆骇摧糖的说法。10对各民族的称谓，不可以使用回回查子，可以使用回族;不可以使用蒙族觞险菌，可以使用蒙古族维吾尔族喻萨克族"
        }
        // newG().then(res=>{
        //   console.log(res)
        // })
        correction(data).then(res=>{
          var listWord= [];
          res.data[0].content.keyWords.forEach(val=>{
            let  key =eval("/" + val+ "/gi")
            let count = data.content.match(key).length
            listWord.push({
              name:val,
              count:count
            })
            this.maxData<count?this.maxData=count:'';
          })
          listWord.forEach(item=>{
            item.bl = item.count/this.maxData*100
          })
          this.noneData = false;
          this.wordList = listWord;
          store.ueditor.setContent(res.data[0].content.high);
        })

      }
    }
}
</script>
<style scoped>
.p30 {
  padding: 0 30px;
}
.mt11{
  margin-top:11px;
}
.line {
  border-bottom: 1px solid #DCDEE3;
  margin-bottom: 60px;
  margin-top: 12px;
}

.wordTitle {
  width: 80px;
  height: 21px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #666666;
  line-height: 21px;
  margin-bottom: 12px;
}
.tip {
  height: 16px;
  display: block;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999999;
  line-height: 16px;
}
</style>

