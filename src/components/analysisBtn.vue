<template>
    <div class="content" >
      <div class="container" :class="{'animate': animate == true}">
        <div class="middle">
            <div class="small">
              <img src="../assets/img/play_regection.png" alt="" v-if=" title == '开始分析'">
              <i class="iconfont iconjinhangzhong" v-else></i>
            </div>
        </div>
      </div>
      <div class="title">{{title}}</div>
    </div>
</template>

<script>
export default {
  props: ['title', 'animate','disabled'],
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
  padding:20px 0 40px;
}
.animate {
  animation:mymove 3s infinite;
  -webkit-animation:mymove 3s infinite; /*Safari and Chrome*/
  animation-direction:alternate;/*轮流反向播放动画。*/
  animation-timing-function: ease-in-out; /*动画的速度曲线*/
  /* Safari 和 Chrome */
  -webkit-animation:mymove 3s infinite;
  -webkit-animation-direction:alternate;/*轮流反向播放动画。*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
}
.container {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: #c1d3ff;

  position: relative;
  cursor: pointer;


}
.title {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #333330;
  cursor: pointer;
}
.middle {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background-color: #79a1ff;
  position: absolute;
  top: 5px;
  left: 5px;

}
.small {
  position: absolute;
  width: 28px;
  height: 28px;
  top: 19px;
  left: 19px;
  border-radius: 50%;
  color: #fff;
  font-size: $font18px;
  background-color: #3471ff;
  display: flex;
  align-items: center;
  justify-content: center;

}
.small img {
  width: 20px;
  height: 20px;
}
.samll i {
  font-size: $font24px;
}
@keyframes mymove
{
    0%{
    transform: scale(0.9);  /*开始为原始大小*/
    }
    25%{
        transform: scale(1); /*放大1.1倍*/
    }
    50%{
        transform: scale(0.9);
    }
    75%{
        transform: scale(1);
    }

}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
    0%{
    transform: scale(0.9);  /*开始为原始大小*/
    }
    25%{
        transform: scale(1); /*放大1.1倍*/
    }
    50%{
        transform: scale(0.9);
    }
    75%{
        transform: scale(1);
    }
}
</style>
