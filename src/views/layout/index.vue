<template>
  <el-container>
    <el-aside width="200px" class="aside">
      <app-aside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <app-header />
      </el-header>
      <el-main class="main">

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from '@/views/layout/components/aside.vue'
import AppHeader from '@/views/layout/components/header.vue'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
}

.header {
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
}

</style>
