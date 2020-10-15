<template>
  <div class="clear">
      <SedebarMain></SedebarMain>
      <div class="content">
         
      </div>
  </div>
</template>
<script>
import SedebarMain from '../sidebarMain'
export default {
    components:{
        SedebarMain
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