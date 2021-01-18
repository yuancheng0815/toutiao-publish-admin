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
          <el-form ref="updateuser-form" :rules="formRules" :model="user" label-width="80px">
            <el-form-item label="编号" >
              <el-input v-model="user.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机" >
              <el-input v-model="user.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="updateProfileLoading"
                @click="onUpdateUser"
              >保存设置</el-button>
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
  getUserProfile,
  updateUserProfile,
  updateUserPhoto
} from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import bus from '@/utils/bus.js'

export default {
  name: 'AccontIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        id: null,
        name: '',
        email: '',
        mobile: '',
        photo: '',
        intro: ''
      },
      dialogVisible: false,
      previewImage: '',
      updatePhotoLoading: false,
      updateProfileLoading: false,
      cropper: null,
      formRules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              if (!reg.test(value)) {
                callback(new Error('邮箱格式错误'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
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
          bus.$emit('update-user', this.user)
        }).catch(() => {
          this.$message.error('更新头像失败')
        })
      })
    },
    onUpdateUser () {
      this.$refs['updateuser-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.updateProfileLoading = true
        const { name, email, intro } = this.user
        console.log(name)
        console.log(email)
        console.log(intro)
        updateUserProfile({
          name,
          email,
          intro
        }).then(res => {
          this.updateProfileLoading = false
          this.$message({
            type: 'sucess',
            message: '用户信息更新成功'
          })
          bus.$emit('update-user', this.user)
        }).catch(() => {
          this.updateProfileLoading = false
          this.$message.error('用户信息更新失败')
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
