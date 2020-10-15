<template>
  <div>
    <!--下面通过传递进来的id完成初始化-->
    <div style="position:relative;width: 500px;margin: 0 auto;">
        <div :id="randomId"></div>
        <div class="OperationButton">
            <ul>
                <li><a href="javascript:"><img src="@/assets/icon1.png"  width="20" alt=""></a>预览</li>
                <li><a href="javascript:"><img src="@/assets/icon2.png" width="20" alt=""></a>保存</li>
                <li><a href="javascript:"><img src="@/assets/icon3.png" width="20" alt=""></a>下载</li>
                <li><a href="javascript:"><img src="@/assets/icon4.png" width="20" alt=""></a>提交审核</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
	//主体文件引入
	import '../../../static/UEditor/themes/default/css/ueditor.min.css'
    import '../../../static/UEditor/ueditor.config.js'
    import '../../../static/UEditor/ueditor.all.min.js'
    import '../../../static/UEditor/lang/zh-cn/zh-cn.js'
    
export default {
    name: 'UE',
    props: {
        value: {
            default: function() {
                return ''
            }
        },
        
    },
    data() {
        return {
            //每个编辑器生成不同的id,以防止冲突
            randomId: 'editor_' + (Math.random() * 100000000000000000),
            //编辑器实例
            instance: null,
            ready: false,
            //配置可以传递进来
            ueditorConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 580,
                // 初始容器宽度
                initialFrameWidth: 500,
            }
        };
    },
    watch: {
        value: function(val, oldVal) {
            if (val != null  && this.ready) {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                this.instance.setContent(val);
            }
        }
    },
    //此时--el挂载到实例上去了,可以初始化对应的编辑器了
    mounted() {
        this.initEditor();
    },

    beforeDestroy() {
        // 组件销毁的时候，要销毁 UEditor 实例
        if(this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    },
    methods: {
        initEditor() {
            const _this = this;
            //dom元素已经挂载上去了
            this.$nextTick(() => {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                this.instance.addListener('ready', () => {
                    this.ready = true;
                    this.$emit('ready', this.instance);
                });
            });
        },
        setText(con) {
            this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
            this.instance.setContent(con);
        },
    }
};

</script>
<style scoped>
.edui-editort {
    margin: 0 auto;
}
.OperationButton {
    position:absolute;
    bottom: 10%;
    right: -12%;
}
.OperationButton  li a {
    height: 30px;
    width: 30px;
    margin: 0 auto;
    border-radius: 50%;
    background: #fff;
    display:block;
    text-align: center;
    line-height: 30px;
}
.OperationButton  li {
    margin-bottom: 10px;
    font-size: 12px;   
    text-align: center;
    cursor: pointer;
}
</style>