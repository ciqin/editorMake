<template>
  <div class="nav">
      <nav class="navbar-default">
          <a class="navbar-brand" href="/">
                <div class="logo title" style="padding: 0">
                    <img src="@/assets/header-logo.png">
                </div>
                <span class="logoText" id="logo_text">智能采编</span>
            </a>
            <el-input placeholder="请输入内容"
                prefix-icon="el-icon-search" class="top6"
                v-model="input2" size="small" style="width: 250px;margin-left:16px;height:40px;">
            </el-input>
            <el-button class="top6" size="small" style="background:#c93931;color:#fff;margin-left:8px;">高级搜索</el-button>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style="padding-top: 5px;padding-bottom: 5px;">
                <img class="img-avatar-sm" src="@/assets/user.png">
                <span>{{getAvater}}</span> <span class="caret"></span>
            </a>
      </nav>
  </div>
</template>
<script>
import { store,mutations} from '../store'
export default {
   data () {
    return {
      input2: ''
    }
  },
  computed:{
    getAvater() {
      return store.avatar
    }
  },
}
</script>
<style scoped>
.el-input__prefix, .el-input__suffix {
    top: -3px;
}
.navbar-default {
    border-bottom: 0px solid #e0e0e0;
    padding-left: 10px;
    height: 60px;
    background: url(../assets/header-bg.png);
}
.navbar-brand > .logo {
    background-size: 130px 100%;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    color: #073e6e;
    margin-top: 9px;
}
.navbar-brand >.logoText  {
    color:#000;
    font-size:18px;
    margin-top: 6px;
    margin-left: 6px;
    font-weight: 700;
    display:inline-block;
    position: relative;
    top: 7px;
}
.top6 {
    position: relative;
    top: 6px;
}
nav .dropdown-toggle {
    display: inline-block;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: transparent;
    color: #caa267;
    font-size: 16px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
    float: right;
    margin-top: 7px;
    margin-right: 16px;
}

nav a .img-avatar-sm {
    padding: 3px;
    width: 30px;
    height: 30px;
    border: 2px solid #caa267;
    max-width: none;
    border-radius: 50%;
}
</style>