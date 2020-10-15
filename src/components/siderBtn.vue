<template>
      <div id="sidebar-navi" class="sidebar sidebar-navi">
        <ul>
            <li v-for="item in iconArr" :key="item.index" @click.stop="loadMain(item)">
                    <router-link v-if="item.url" :to="item.url">
                        <i style="font-size:26px;" :class="item.icon"></i>
                        <p>{{item.name}}</p>
                    </router-link>
                    <a v-if="!item.url">
                        <i style="font-size:26px;" :class="item.icon"></i>
                        <p>{{item.name}}</p>
                    </a>
            </li>
        </ul>
      </div>
</template>
<script>
import {store,mutations} from '../store'
export default {
    data(){
        return {
            iconArr: [
                {
                    index:1,
                    icon:"el-icon-user-solid",
                    name:"我的",
                    content:'我的工作区',
                    url:'/self'
                },
                {
                    index:2,
                    icon:"el-icon-s-finance",
                    name:"待编稿库",
                    content:'待编稿库',
                    url:'/manuscript'
                },
                {
                    index:3,
                    icon:"el-icon-first-aid-kit",
                    name:"加工",
                    content:'编辑中心',
                    url:'/add'
                },
                {
                    index:4,
                    icon:"el-icon-potato-strips",
                    name:"发布库",
                    content:' 发布中心',
                    url:'/compiled'
                },
                {
                    index:5,
                    icon:"el-icon-s-data",
                    name:"云稿库",
                    content:'云稿库',
                    url:'/release'
                },
                // {
                //     index:6,
                //     icon:"el-icon-s-grid",
                //     name:"版面库"
                // },
                {
                    index:7,
                    icon:"el-icon-document",
                    name:"融媒专线"
                },
                {
                    index:8,
                    icon:"el-icon-receiving",
                    name:"锐思审版"
                },
                {
                    index:9,
                    icon:"el-icon-coin",
                    name:"资源库",
                    url:'/resources'
                }
            ]
        }
    },
    methods:{
        loadMain(item){
            mutations.setNavText(item.content);
            item.name === "融媒专线" ?window.open("http://wenda.wengegroup.com:9528/#/chooseManagement"):"";
            item.name === "锐思审版" ?window.open("http://192.168.4.120:8080/zuban2/#/review?phone=&accessToken=1629b7679db00e8aba959534cc61c991&appId=HG0002"):"";
        }
    }
}
</script>
<style scoped>
    .sidebar-navi {
        left: 0;
        max-height: none;
        width: 60px;
        padding: 0px;
        background: none repeat scroll 0 0 #c93931;
        height: calc(100vh - 60px);
        float: left;
    }
    .sidebar-navi li {
        list-style: none;
        padding: 0;
        margin: 0;
        line-height: 45px;
        width: 100%;
        height: 66px;
        text-align: center;
    }
    .sidebar-navi li > a {
        width: 100%;
        height: 66px;
        display: inline-block;
        padding-top: 0px;
        border: 0px solid #fbfbfb;
        color: #ffffff;
        text-decoration: none;
    }
    .sidebar-navi li > a.router-link-active {
        border: 0px;
        background-color: #732b2e;
        color: #fff;
    }
    .sidebar.sidebar-navi li > a>p {
        line-height: 8px;
        font-size: 14px;
    }
    
</style>