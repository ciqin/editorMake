<template>
  <div class="clear">
      <SedebarMain></SedebarMain>
      <div class="content">
          <contentNav></contentNav>
          <contentLi></contentLi>
          <ResultView></ResultView>
      </div>
  </div>
</template>
<script>
import SedebarMain from '../sidebarMain'
import contentNav from '../tool/content_nav'
import contentLi from '../tool/content_li'
import ResultView from '../tool/resultView'
export default {
    components:{
        SedebarMain,contentNav,contentLi,ResultView
    }
}
</script>
<style scoped>
.content {
    float: left;
    width: calc(100% - 290px);
    margin-left: 10px;
    /* background: #fff; */
    height: calc(100vh - 60px);
}
</style>