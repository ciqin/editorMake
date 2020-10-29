<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: "PingFangSC-Regular, PingFang SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 99.8vh;
}
/* 设置谷歌滚动条 */
::-webkit-scrollbar {
    width: 4px;
    height: 2px 
}
::-webkit-scrollbar-thumb {
    box-shadow: 0px 1px 3px rgba(212, 212, 212, 0.3) inset;
    border-radius: 10px;
    background-color: #aaa;
}
::-webkit-scrollbar-track {
    box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.3) inset;
    border-radius: 10px;
    background-color: #ddd;
}
/* base样式 */
body,ul,li,ol,dl,dd,h1,h2,h3,h4,h5,h6,input,p{ margin:0;color: #666666;}
ul,ol { padding:0;}
img { border:none;}
.clear{zoom:1;}
.clear:after{display:block; content:"";clear:both; visibility:hidden; height:0;}   /*清除浮动*/
a{text-decoration:none;}
li{list-style:none;}
img{vertical-align: middle;}
div,ul,p {
  box-sizing: border-box;
}
button{outline-style: none;}
/* 单选框按钮样式 */
.el-checkbox__inner {
  border:1px solid #c93931!important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #c93931!important;
}
.el-checkbox__label {
  padding-left: 5px;
}
.el-progress-bar__inner {
  background-color: #c93931;
}
.mobileM>div{
    margin-top:0!important;
    background: transparent;
    box-shadow: none;
}
.mobileM .el-dialog__body{
  position: relative;
}
.el-tabs__item,.el-form-item__label,.first_nav_top ul li{
  color: #666666;
}
.impression .el-form-item__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.edui-default .edui-editor-bottomContainer {
    display: none!important;
}

.ssContainer th{
  padding-top: 0;
}
/* 单选按钮html隐藏 */
.radiusNone .el-radio__label {
    display: none;
}
.el-tabs__nav-wrap::after {
  background: #f3f3f3;
  height: 1px;
}
.manuscriptContainer .el-input__inner{
  border: 1px solid transparent;
}
.edui-default .edui-editor {
  border: 0;
}
.correction tbody .el-table_1_column_1 .cell{
  color: #EA5E5E;
}
</style>
