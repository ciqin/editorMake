<template>
  <div class="content_nav clear">
        <ol id="breadcrumb" class="breadcrumb pull-left small hidden-xs hidden-sm hidden-md" style="color: #777;">
            <li class="breadcrumb-library"><span class="fa fa-user"></span> {{getNavText}}</li>
            <li>/</li>
            <li class="active">我的草稿</li>
        </ol>
        <div class="breadcrumb" style="padding-left:0px;">
            <i class="el-icon-refresh" style="color:#c93931;font-size:20px;vertical-align: middle;"></i>
        </div>
  </div>
</template>
<script>
import { store,mutations} from '../../store'
export default {
    computed:{
        getNavText(){
            return store.navText
        }
    }
}
</script>
<style scoped>
.content_nav {
    padding: 10px 24px;
    background: #fafafa;
}
.breadcrumb {
    padding-left: 0;
    margin-bottom: 0px;
    background: #fafafa;
    line-height: 24px;
    font-size: 14px;
    color: #777;
    float: left;
    padding: 8px 15px;
    border-radius: 4px;
}
.breadcrumb > li {
    display: inline-block;
}
.breadcrumb li:nth-child(1) {
    font-weight: bold;
    color: #0b70b3;
    font-size: 15px;
    color:#c93931;
}
</style>