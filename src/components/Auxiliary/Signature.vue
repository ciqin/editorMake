<template>
  <div>
        <div class="grid-content bg-purple-light" style="overflow:auto;padding-top:16px;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文章封面">
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">小图</el-radio>
                        <el-radio :label="6">大图</el-radio>
                        <el-radio :label="9">三图</el-radio>
                        <el-radio :label="9">无图</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <ImgCutter  ref="imgCutterModal"
                                :cross-origin="true"
                                :tool-bgc="none"
                                :is-modal="true"
                                :show-choose-btn="true"
                                :lock-scroll="true"
                                :box-width="600"
                                :box-height="500"
                                :cut-width="200"
                                :cut-height="200"
                                :size-change="true"
                                :move-able="true"
                                @cutDown="xztpCutDown">
                                <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button>
                    </ImgCutter>
                </el-form-item>
                    <el-form-item label="文章封面">
                    <ImgCutter  ref="imgCutterModal1"
                                :cross-origin="true"
                                :tool-bgc="none"
                                :is-modal="true"
                                :show-choose-btn="true"
                                :lock-scroll="true"
                                :box-width="600"
                                :box-height="500"
                                :cut-width="200"
                                :cut-height="200"
                                :size-change="true"
                                :move-able="true"
                                @cutDown="xztpCutDown">
                                <button slot="open" class="upDataImg" style="width:100px;height:100px;"><i class="el-icon-plus" style="font-size:50px;"></i></button>
                    </ImgCutter>
                </el-form-item>
                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                    <el-form-item label="关键字">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="稿件级别">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                    <el-form-item label="选题">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链接标题">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="引题链接">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="引题样式">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原创分类">
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="引题" name="type"></el-checkbox>
                    <el-checkbox label="副题" name="type"></el-checkbox>
                    <el-checkbox label="有水印" name="type"></el-checkbox>
                    <el-checkbox label="广告" name="type"></el-checkbox>
                    <el-checkbox label="视频" name="type"></el-checkbox>
                    <el-checkbox label="可评论" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import ImgCutter from 'vue-img-cutter'
export default {
    name: 'Signature',
    data(){
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            
        }
    }
}
</script>
<style scoped>
</style>