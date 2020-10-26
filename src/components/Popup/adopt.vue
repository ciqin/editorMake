<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="最近使用">
             <el-form :inline="true" class="demo-form-inline" label-width="100px">
                <div>选择最近常用</div>
                <el-form-item label="传递方式">
                    <el-radio v-model="radio" label="1">直接传稿</el-radio>
                    <el-radio v-model="radio" label="1">复制传稿</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="传递给用户">
            <div>选择接受用户</div>
             <el-form :inline="true" class="demo-form-inline" label-width="100px">

                 <el-form-item label="目录">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目录">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目录">
                    <el-input v-model="desc" placeholder="审批人" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="传递方式">
                    <el-radio v-model="radio" label="1">直接传稿</el-radio>
                    <el-radio v-model="radio" label="1">复制传稿</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确定提交</el-button>
        <el-button @click="centerDialogVisible = false">取消</el-button>
    </span>
  </div>
</template>
<script>
export default {
    data(){
        return {
            radio:1,
            tabPosition: 'left',
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            form:{
                name:"321321",
                form:"321321321",
                desc:"fdsfsd"
            }
        }
    }
}
</script>
<style scoped>
</style>