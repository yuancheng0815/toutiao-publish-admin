<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="14">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" :offset="2" class="avatar">
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              :src="user.photo"
              fit="cover"
              ></el-avatar>
              <p>点击修改头像</p>
          </label>
          <input
            id="file"
            hidden
            type="file"
            ref="file"
            @change="onFileChange"
            >
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  // getUserProfile,
  // updateUserProfile,
  updateUserPhoto
} from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'AccontIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        name: '',
        email: '',
        mobile: '',
        photo: ''
      },
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
      dialogVisible: false,
      previewImage: '',
      updatePhotoLoading: false,
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.previewImage = window.URL.createObjectURL(file)
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
      }
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      if (this.cropper) {
        return
      }
      const image = this.$refs['preview-image']
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: true
      })
    },
    onDialogClosed () {
    },
    onUpdatePhoto () {
      this.updatePhotoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.updatePhotoLoading = true
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar label{
  display: flex;
  flex-direction:column;
  align-items: center;
  cursor:pointer;
  p{
    margin: 0;
    padding-top:6px
  }
}

.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: block;
    height: 200px;
  }
}
</style>
