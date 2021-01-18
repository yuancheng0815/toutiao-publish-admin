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
      <el-button type="success" size="mini">添加素材</el-button>
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm=6
        :md=6
        :lg=4
        v-for="(image, index) in images"
        :key="index"
        class="image-item"
      >
        <el-image
          style="height: 100px;width:100%;"
          :src="image.url"
          fit="cover"
          lazy
        ></el-image>
        <div class="image-action">
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
  </div>
</template>

<script>
import {
  getImages,
  collectImage
} from '@/api/image.js'
export default {
  name: 'ImageList',
  components: {},
  props: {},
  data () {
    return {
      radio2: null,
      collect: false,
      page: 1,
      per_page: 12,
      total_count: 0,
      images: []
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
</style>
