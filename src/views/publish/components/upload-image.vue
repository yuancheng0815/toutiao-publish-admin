<template>
  <div class="upload-image">
    <div class="preview"  @click="centerDialogVisible = true">
        <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
     <!--
      visible 控制对话框的显示和隐藏
     -->
     <el-dialog
      title="请选择文章封面图"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      append-to-body
      >
        <!-- 标签导航 -->
        <!--
          el-tabs 组件
            v-model 双向绑定
              数据驱动视图：当绑定数据发生改变，激活的标签页受影响
              视图影响数据：当标签改变的时候，标签的 name 会同步到数据中
            label 标签的标题
            name 相当于标签的 id
        -->
        <el-tabs>
          <el-tab-pane label="素材库" name="first">
            <!-- 标签内容写到里面来 -->
            <!--
              radio 有个 change 事件
              当选择的 radio 改变的时候会触发
            -->
            <el-radio-group>
              <el-radio label="all">全部</el-radio>
              <el-radio label="collect">收藏</el-radio>
            </el-radio-group>
            <el-row :gutter="20">
              <el-col :span="6">
                <img height="100" src="item.url" />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">配置管理</el-tab-pane>
        </el-tabs>
        <!-- /标签导航 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button @click="centerDialogVisible = false">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  components: {},
  props: {},
  data () {
    return {
      centerDialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.upload-image {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 178px;
    text-align: center;
  }
</style>
