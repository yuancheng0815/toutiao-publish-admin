import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import NProgress from 'nprogress'
import ArticleIndex from '@/views/article/index.vue'
import PublishIndex from '@/views/publish/index.vue'
import ImageIndex from '@/views/image/index.vue'

Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空 会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: ArticleIndex
      },
      {
        path: '/publish',
        name: 'publish',
        component: PublishIndex
      },
      {
        path: '/image',
        name: 'image',
        component: ImageIndex
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  NProgress.start()
  const user = window.localStorage.getItem('user')

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach((to, form) => {
  // 结束顶部的导航进度条
  NProgress.done()
})
export default router
