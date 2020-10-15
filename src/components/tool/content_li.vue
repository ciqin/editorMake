<template>
    <div id="search-list" class="row" style="height: 45px; margin: 10px 0 5px 0; background: #fafafa">
            <ul>
                <li data-type="TOTAl" @click="loadList(index,item.count)" :class="navCount ==index?'activeType':''" style="display: list-item;" v-for="(item,index) in mediaName" :key="item.name">{{item.name}}(<span>{{item.count}}</span>)</li>
                <!-- <li data-type="COMPO" style="display: list-item;">多媒体稿(<span>64</span>)</li>
                <li data-type="TEXT" style="display: list-item;">文字(<span>0</span>)</li>
                <li data-type="PHOTO" style="display: list-item;">图片(<span>8</span>)</li>
                <li data-type="GRAPH" style="display: list-item;">图表(<span>0</span>)</li>
                <li data-type="GALLERY" style="display: list-item;">图集(<span>0</span>)</li>
                <li data-type="VIDEO" style="display: list-item;">视频(<span>0</span>)</li>
                <li data-type="LIVE" style="display: list-item;">直播(<span>2</span>)</li>
                <li data-type="AUDIO" style="display: list-item;">音频稿(<span>0</span>)</li>
                <li data-type="HREF" style="display: list-item;">链接稿(<span>2</span>)</li>
                <li data-type="WECHAT" style="display: list-item;">微信稿(<span>2</span>)</li> -->
            </ul>
    </div>
</template>
<script>
import {mutations} from '../../store'
export default {
    data(){
        return {
            mediaName:[
                {
                    name:"全部",
                    index:0,
                    count:78
                },
                {
                    name:"多媒体稿",
                    index:1,
                    count:64
                },
                {
                    name:"文字",
                    index:2,
                    count:0
                },
                {
                    name:"图片",
                    index:3,
                    count:8
                },
                {
                    name:"图表",
                    index:4,
                    count:0
                },
                {
                    name:"图集",
                    index:5,
                    count:0
                },
                {
                    name:"视频",
                    index:6,
                    count:0
                },
                {
                    name:"直播",
                    index:7,
                    count:2
                },
                {
                    name:"音频稿",
                    index:8,
                    count:0
                },
                {
                    name:"链接稿",
                    index:9,
                    count:2
                },
                {
                    name:"微信稿",
                    index:10,
                    count:2
                }
            ],
            navCount:0
        }
    },
    computed:{
        getCount(){
            return store.mediaArr
        }
    },
    methods:{
        loadList(index,count){
            this.navCount = index;
            mutations.setMediaMax(count)
            if(count<=4) {
                let objArr = [];
                for( let i=0;i<count;i++) {
                    objArr.push({name:"312",index:i})
                }
                mutations.setListObj(objArr)
            }else {
                mutations.setListObj([{name:"312",index:0},{name:"312",index:1},{name:"312",index:2},{name:"312",index:3},{name:"312",index:4}])
            }
        }
    }
}
</script>
<style scoped>
#search-list ul {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
#search-list li {
    padding: 0 30px;
    line-height: 45px;
    float: left;
    list-style: none;
    cursor: pointer;
    font-size: 14px;
}
#search-list li.activeType {
    background: #c93931;
    color: #fff;
}
</style>