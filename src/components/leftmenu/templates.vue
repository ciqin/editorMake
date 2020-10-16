<template>
   <div class="nav_top_temlaptes">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="模板" name="first">
        <div class='first_nav_top'>
          <ul>
            <li v-for="(item,key) in templatearr" :key=key @click="templatearrclick(key)" :class="{templateactive:key==texttemp}">{{item}}</li>
            <li><i class='el-icon-search' style='font-weight:bolder'></i></li>
          </ul>
        </div>
        <div class='first_texttemp'>内部资源 > 模板 > {{templatearr[texttemp]}} </div>
        <div class="first_main_imgs">
            <ul>
              <li v-for="(item,key) in templateimgarr" :key = key>
                 <img :src="item.img" alt="">
              </li>
            </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="媒资库" name="second">媒资库</el-tab-pane>
      <el-tab-pane label="稿库" name="third">
        <div class='third_search' style='padding: 10px 20px;display:flex'>
          <el-input v-model="input" placeholder="请输入关键字(名称,内容)"></el-input>
          <el-button icon="el-icon-search">搜索</el-button>
        </div>
        <div class="third_data">
            <el-date-picker
            v-model="datavalue"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>

        <div>
           <div class="libisryarr" v-for="(item,key) in Libraryarr" :key = key>
               <div class='libisryarr_list'>
                  <div class='collection_icon' @click="collectionIconclick(key)" :class='item.iscollection===true ? "collectionAcitve" : "nocollectionAcitve" '>
                      <i class="el-icon-star-on"></i>
                    </div>
                  <div class="libisryarr_img">
                      <img :src="item.img" alt="">
                  </div>
               </div>
               <div class="libisryarr_botal">
                 <p>{{item.title}}</p>
                 <p>{{item.time}}</p>
               </div>
           </div>
        </div>
      </el-tab-pane>
    </el-tabs>
   </div>

</template>
<script>
  export default {
    data() {
      return {
        datavalue: '',
        activeName: 'first',
        templatearr:['标题','正文','引导','图文','布局','行业'],
        texttemp:0,
        templateimgarr:[
          {
              img:require('@/assets/temimg/tem1.jpg')
          },
          {
              img:require('@/assets/temimg/tem2.jpg')
          },
          {
              img:require('@/assets/temimg/tem3.jpg')
          },
          {
              img:require('@/assets/temimg/tem4.jpg')
          },
          {
              img:require('@/assets/temimg/tem2.jpg')
          },
        ],
        Libraryarr:[
          {
            title:'标题1',
            time:'2020-08-12',
            img:require('@/assets/container.jpg'),
            iscollection:true,
          },
           {
            title:'标题2',
            time:'2020-08-12',
            img:require('@/assets/container.jpg'),
            iscollection:false,
          },
           {
            title:'标题3',
            time:'2020-08-12',
            img:require('@/assets/container.jpg'),
            iscollection:false,
          }
        ]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      templatearrclick(index){
        this.texttemp = index
      },
      collectionIconclick(index){
        if(this.Libraryarr[index].iscollection===true){
         this.Libraryarr[index].iscollection = false
        }else{
          this.Libraryarr[index].iscollection = true
        }
      },
    }
  };
</script>
<style>
   .nav_top_temlaptes .is-active {
      color: #D72323;
   }
   .nav_top_temlaptes .el-tabs__active-bar{
      width: 112px;
      height: 4px;
      background-color: #D72323;
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
 }

 .first_texttemp{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 2.2px;
    margin-top: 20px;
    margin-left: 20px;
 }

 .first_main_imgs ul{
   padding-bottom: 10px;
 }

 .first_main_imgs ul li{
   width:325px;
   margin-left: 8px;
   text-align: center;
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
    right: 10px;
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
  height:103px
}
.libisryarr_img img{
    width: 100%;
    height: 100%;
    margin: 28px 10px 0.7% 10px;
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
}
</style>