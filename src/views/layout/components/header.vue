<template>
  <div class="header-container">
    <div>
      <i :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse }"  @click="sendCollapse"></i>
      <span>杭州天翼科技有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item
          @click.native="onLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import bus from '@/utils/bus.js'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好后 请求获取用户信息
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 除了登录接口 其他所有接口都需要经过授权才能访问
    // 或者说，除了登录接口 其它接口都需要提供身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(
        res => {
          this.user = res.data.data
        }
      )
    },
    sendCollapse () {
      this.isCollapse = !this.isCollapse
      bus.$emit('sendCollapse', this.isCollapse)
    },
    onLogout () {
      this.$confirm('确认退出吗？', '退出图示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  div {
    display: flex;
    align-items: center;
  }
    .el-icon-s-fold {
      padding-right: 6px;
      font-size: 28px;
    }
    .el-icon-s-unfold {
      padding-right: 6px;
      font-size: 28px
    }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
