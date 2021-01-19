<template>
  <div class="upload-image">
    <div class="preview"  @click="centerDialogVisible = true">
        <el-image class="preview" :src="value">
          <div slot="error" class="image-slot">
            <i class="avatar-uploader-icon el-icon-plus"></i>
          </div>
        </el-image>
    </div>
     <!--
      visible 控制对话框的显示和隐藏
     -->
     <el-dialog
      title="请选择文章封面图"
      :visible.sync="centerDialogVisible"
      width="700px"
      center
      append-to-body
      >
        <!-- 标签导航 -->
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <image-list
              ref="image-list"
              :is-show-selected="true"
              :isShowAdd="false"
              :isShowAction="false"
            />
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <input
              type="file"
              ref="file"
              hidden
              @change="onFileChange"
            >
            <el-image class="preview" :src="uploadImageSrc" @click.native="$refs.file.click()">
              <div slot="error" class="image-slot">
                <i class="avatar-uploader-icon el-icon-plus"></i>
              </div>
            </el-image>
          </el-tab-pane>
        </el-tabs>
        <!-- 标签导航 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCoverUnconfirm">取消</el-button>
          <el-button type="primary" @click="onCoverConfirm" :loading="loading">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
import ImageList from '@/views/image/components/image-list.vue'
export default {
  name: 'UploadImage',
  components: {
    ImageList
  },
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false,
      activeName: 'first',
      uploadImageSrc: '',
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.uploadImageSrc = window.URL.createObjectURL(file)
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        if (!this.uploadImageSrc) {
          this.$message.error('请选择文件')
          return false
        }
        this.loading = true
        const fd = new FormData()
        fd.append('image', this.$refs.file.files[0])
        uploadImage(fd).then(res => {
          this.loading = false
          this.centerDialogVisible = false
          this.uploadImageSrc = ''
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message.error('请选择封面图片')
          return
        }
        this.centerDialogVisible = false
        this.$emit('input', imageList.images[selected].url)
      }
    },
    onCoverUnconfirm () {
      this.uploadImageSrc = ''
      this.centerDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.upload-image{
  display: inline-block;
  margin-right: 20px;
}
.preview {
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
