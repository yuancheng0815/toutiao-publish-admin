<template>
   <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
  <el-menu
    class="nav-menu  el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-document"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-document"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import bus from '@/utils/bus.js'

export default {
  name: 'AppAside',
  components: {},
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    var _this = this
    bus.$on('sendCollapse', function (isCollapse) {
      _this.isCollapse = isCollapse
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.nav-menu {
  height:100%;
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
