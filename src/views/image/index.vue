<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px;">
        <el-radio-group
          v-model="collect"
          @change="onCollectChange(collect)"
          size="mini">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <el-row :gutter="10">
        <el-col
          v-for="(img, index) in images"
          :key="index"
          :xs="12"
          :sm="6" :md="6" :lg="4">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload-text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload-tip" slot="tip">只能上传jpg/png文件，且不超过500K</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image.js'

export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // '默认查询所有素材',
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  wathch: {},
  created () {
    this.loadImages()
  },
  mounted () {},
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false

      // 更新素材列表
      this.loadImages(false)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
