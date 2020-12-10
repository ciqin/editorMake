<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="head">
      <div class="logo_div">
        <img src="./assets/img/logo.png"/>
      </div>
      <div class="logo_title">
        智能创作
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.head {
  width: 100%;
  height: 66px;
  background: #E21837;
}
.logo_div {
  height:66px;
  float: left;
  width: 64px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo_title {
  height:66px;
  line-height: 66px;
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #FFFFFF;
  margin-left: 32px;
  float: left;
}
#app {
  font-family: "PingFangSC-Regular, PingFang SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 99.8vh;
  overflow: hidden;
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
  border:1px solid #576779!important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #576779!important;
}
.el-checkbox__label {
  padding-left: 5px;
}
.el-progress-bar__inner {
  background-color: #576779;
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
  color: #000000;
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
.correction tbody .el-table__row td:nth-child(1) .cell{
  color: #EA5E5E;
}
/* 模态框优化 */
.el-dialog__header {
  border-bottom: 1px solid #F2F2F2;
}
.el-dialog__title {
  color: #1A1A1A;
}
.el-dialog__headerbtn .el-dialog__close {
      color:#808080;
}

.el-radio__input.is-checked .el-radio__inner{
  border-color: #576779;
  background: #576779;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #333333;
}
.el-dialog__body .el-form--inline .el-form-item{
  margin-bottom:10px;
}
.dialog-footer {
   margin-top:30px;
}
.el-dialog__body .el-textarea__inner {
  height: 120px;
}
.dialog-footer .el-button{
  background: #666666;
  color: #FFF;
  padding: 12px 15px;
}

.dialog-footer .el-button--primary {
  color: #FFF;
  background-color: #D72323;
  border-color: #D72323;
  padding: 12px 15px;
}
.el-table th {
  background: #f2f2f2;
  padding: 8px 0;
}

.ssContainer td.el-table_1_column_1  .cell{
    text-align: right;
}
#edui68,#edui69{
    display: none !important;
}
.bg-purple-light .el-input__inner{
    height: 34px;
}
.bg-purple-light .el-textarea__inner,.bg-purple-light .el-input__inner{
  width: 290px;
}
.bg-purple-light .el-textarea__inner,.bg-purple-light .el-input__inner,.bg-purple-light .el-button{
    border: 1px solid #A0A2B2;
}

.tabsContainer .el-input__inner{
  width: 100px;
}
.NavContainer .el-input__inner{
  height: 30px;
  line-height: 30px;
}
.NavContainer .el-button{
  padding: 6px 20px
}
.NavContainer .el-input__icon{
  line-height: 30px;
}
.edui-editor-toolbarboxouter{
 border: none !important;
 box-shadow: none !important;
 background: #ffffff !important;
}
</style>
