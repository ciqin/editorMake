<template>
  <div class="container">
      <div class="text-center" style="width: 20%;  min-width: 100px;background-color: rgba(255,255,255, 0.3); margin-right: 10%;">
            <div class="text-left" style="margin-bottom: 50px">
                <div><img class="logo_red" src="http://hongqi.wengegroup.com:8082/hongqi/img/login-logo-caibian.png" width="316"></div>
                <h1 style="font-size: 40px; letter-spacing: 1px; font-weight: 700;margin-top: 20px;margin-bottom: 10px;">智能采编平台</h1>
            </div>
            <form id="loginForm" method="post" role="form" style=" position:relative;" action="/uum/login/process">
                <p><span id="message" style="color:#f2641a; display: inline-block"></span></p>
                <div class="col-md-8 col-md-offset-2" style="margin-top: 0px; padding: 0">
                    <div class="form-group">
                        <div class="input-group" style="border: 1px solid #d9d9d9; border-radius: 5px;height: 42px;line-height: 24px;">
                            <i class="el-icon-user-solid" style="color:#d9d9d9;font-size:20px;width:40px;text-align:center;"></i>
                            <input id="username" name="username" type="text" class="form-control" placeholder="请输入账号" style="height:92%;width: calc(100% - 54px);outline-style: none; background:#fff;font-size: 15px;border:0px;border-radius : 0px;border-left: 0;" value="">
                        </div>
                        <span id="username-errormsg-area"></span>
                    </div>
                </div>
                <div class="col-md-8 col-md-offset-2" style="padding: 0;margin-top: 10px;">
                    <div class="form-group">
                        <div class="input-group" style="border: 1px solid #d9d9d9; border-radius: 5px;height: 42px;line-height: 24px;">
                            <i class="el-icon-s-goods" style="color:#d9d9d9;font-size:20px;width:40px;text-align:center;"></i>
                            <input type="password" id="password" name="password" class="form-control" placeholder="请输入密码" autocomplete="off" style="height:92%;width: calc(100% - 54px);outline-style: none; background:#fff;font-size: 15px;border:0px;border-radius : 0px;border-left: 0;">
                        </div>
                        <span id="password-errormsg-area"></span>
                    </div>
                </div>
                <div id="wechat-div-code" class="col-md-8 col-md-offset-2" style="margin-top: 10px;display:none;padding: 0">
                    <div class="form-group">
                        <div class="input-group" style="border: 1px solid #d9d9d9; border-radius: 5px;height: 42px;line-height: 24px;">
                            <i class="el-icon-user-solid" style="color:#d9d9d9;font-size:20px;width:40px;text-align:center;"></i>
                            <input type="text" id="wechatCode" name="wechatCode" class="form-control" placeholder="请输入动态码" autocomplete="off" style="height:92%; font-size: 15px;border:0px;border-radius : 0px;border-left: 0;background-color: #fff !important;">
                        </div>
                        <span id="wechatcode-errormsg-area"></span>
                    </div>
                </div>
                <div id="div-Vcode" class="col-md-8 col-md-offset-2" style="padding: 0px; display: block;margin-top: 10px;">
                    <div class="form-group" style="height: 42px;display: flex;">
                        <div style="border: 1px solid #dadada; border-radius: 3px; height: 42px; width: 50%;display:flex">
                            <div style="height: 40px;width: 46px;background:#fff;border-radius: 5px 0 0 5px;flex:2;line-height: 24px">
                                <i class="el-icon-goods" style="color:#d9d9d9;font-size:20px;width:40px;text-align:center;"></i>
                            </div>
                            <input id="vcode" name="vcode" style="outline:none;border:none;font-size: 15px;line-height: 40px;width: 75%;padding: 0 0 0 10px;flex:8" placeholder="验证码" value="">
                        </div>
                        <input id="btnVcode" type="linkbutton" onclick="getvcode();" style="height: 40px; background:#fd6a05;margin-left:8px; margin-right:5px;border:0px;cursor: pointer;width:18%;float: left;text-align:center;color: #fff;font-family: '宋体';font-size: 15px;" value="获取" readonly="readonly">
                        <img id="img-vcode" style="height: 42px;display:none;border:0px ;float: right;width:80px;">
                    </div>
                </div>
                <div class="col-md-12" style="margin-top: 20px;margin-bottom: 20px;padding:0;display:flex;margin-top: 20px;margin-bottom: 20px;display: flex;justify-content: center;">
                    <div class="form-group btn-group-justified">
                        <div class="col-md-12" style="padding-left: 0px;padding-right: 0;">
                            <div class="btn btn-block" @click="login" style="width: 100%;height: 42px;border:none;background: -webkit-linear-gradient(left,#f5991e, #fe6805);font-size: 16px; letter-spacing: 5px; border-radius: 5px;text-align: center;line-height: 42px;cursor: pointer;">
                                登录
                            </div>
                        </div>
                    </div>
                </div>
                 
            </form>
            <div id="div-qrcode" style="display: none">
                <p>请使用微信扫描下面小程序码,绑定采编账号,获取动态码</p>
                <img style="height:150px;width:150px" src="/uum/img/wechatcode.jpg">
            </div>
        </div>
  </div>
</template>
<script>
export default {
    methods:{
        login(){
           this.$router.push('/self')
        }
    }
}
</script>
<style scoped>
.container {
    background-image: url("../assets/bg_red.png");
    background-color: white;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    background-size: 100% 100%;
    height: 100vh;
    font-size: 40px;
}
.btn-group-justified {
    display: table;
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
}
</style>