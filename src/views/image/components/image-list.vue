<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group
        v-model="collect"
        size="mini"
        @change="loadImages(1)"
      >
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        type="success"
        size="mini"
        @click="dialogVisible = true"
        v-if="isShowAdd"
      >添加素材</el-button>
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(image, index) in images"
        :key="index"
        @click.native="selected = index"
        class="image-item"
        style="height:100px;"
      >
        <el-image
          style="height: 100px;width:100%;"
          :src="image.url"
          fit="cover"
          lazy
        ></el-image>
        <div class="selected" v-if="isShowSelected && selected === index">
          <div></div>
        </div>
        <div class="image-action" v-if="isShowAction">
          <el-button
            :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="onCollect(image)"
            :loading="image.loading"
            circle
            type="primary"
            size="small"
          ></el-button>
          <el-button
          icon="el-icon-delete"
          circle
          type="danger"
          :loading="image.loading"
          @click="onDelete(image)"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[12, 24, 36, 48]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count">
      </el-pagination>
    </div>
    <el-dialog
      title="上传素材"
      append-to-body
      :visible.sync="dialogVisible"
      width="400px"
    >
      <el-upload
        class="upload-demo"
        action=""
        drag
        multiple
        accept=".png,.jpg,gif,jpeg"
        :before-upload="beforeUpload"
        :http-request="uploadImage"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getImages,
  collectImage,
  deleteImage,
  uploadImage
} from '@/api/image.js'
export default {
  name: 'ImageList',
  components: {},
  props: {
    // 是否显示添加素材
    isShowAdd: {
      type: Boolean,
      default: true
    },
    // 是否显示收藏和删除按钮
    isShowAction: {
      type: Boolean,
      default: true
    },
    // 是否显示背景的打勾按钮
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collect: false,
      page: 1,
      per_page: 12,
      total_count: 0,
      images: [],
      selected: null,
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.per_page
      }).then(res => {
        console.log(res)
        const results = res.data.data.results
        results.forEach(img => {
          img.loading = false
        })
        this.images = results
        this.total_count = res.data.data.total_count
      })
    },
    handleSizeChange (perPage) {
      this.per_page = perPage
      this.loadImages(1)
    },
    handleCurrentChange (page) {
      this.loadImages(page)
    },
    onCollect (image) {
      image.loading = true
      collectImage(image.id, !image.is_collected).then(res => {
        image.is_collected = !image.is_collected
        image.loading = false
      })
    },
    onDelete (image) {
      image.loading = true
      deleteImage(image.id).then(res => {
        image.loading = false
        this.loadImages(this.page)
      })
    },
    beforeUpload (file) {
      if (file.size > 400000) {
        this.$message.error('图片最大不能超过4Kb')
        return false
      }
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/gif') {
        this.$message.error('图片格式不正确')
        return false
      }
    },
    uploadImage (file) {
      const fd = new FormData()
      fd.append('image', file.file)
      uploadImage(fd).then(res => {
        this.$message({
          type: 'success',
          message: '图片上传成功'
        })
        this.loadImages(1)
        this.dialogVisible = false
      }).catch((err) => {
        this.$message.error('上传图片失败' + err)
      })
    }
  }
}
</script>
<style scoped lang='less'>
.action-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}
.block {
  margin-top: 8px;
}
.image-item {
  position: relative;
}
.image-action {
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 4px;
}
.el-button.is-circle {
    padding: 8px;
}
.selected {
  position: absolute;
  left: 18%;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width:100%;
    height:100%;
    background: url(./selected.png) no-repeat;
    background-size: contain;
  }
}
</style>
