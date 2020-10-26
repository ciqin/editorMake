<template>
  <div>
     <el-form :inline="true" class="demo-form-inline" label-width="100px">
        <el-row>
            <el-col :span="24">
                 <el-form-item label="稿库">
                    <el-radio v-model="radio" label="1">产品部</el-radio>
                </el-form-item>
            </el-col>
             <el-col :span="24">
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
            </el-col>
             <el-col :span="24">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="name" size="mini" placeholder="请输入备注内容"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确定签入</el-button>
        <el-button @click="centerDialogVisible = false">取消</el-button>
    </span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name:name,
        radio:1,
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
        value: ''
      }
    }
  }
</script>
<style scoped>
</style>