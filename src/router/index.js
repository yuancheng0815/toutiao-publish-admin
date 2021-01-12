import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/vies/login/index.vue'

Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
