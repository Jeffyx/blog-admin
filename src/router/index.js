import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
import ArticalList from '../views/aiticalList/articalList.vue'
import ArticalCategory from '../views/articalCategory/articalCategory.vue'
import Dashboard from '../views/dashBoard/dashBoard.vue'
import ArticalOperate from '../views/articalOperate/articalOperate.vue'
import ArticalComment from '../views/articalComment/articalComment.vue'
import AlbumList from '../views/albumList/albumList.vue'

Vue.use(Router)

const constantRouterMap = [
  { path: '/login', component: () => import('../views/login/login.vue') },
  // {
  //   path: '/',
  //   component: Layout,
  //   children: []
  // },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    leaf: true, // 只有一个节点
    menuShow: true,
    iconCls: 'iconfont icon-home', // 图标样式class
    children: [
      {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
    ]
  },
  { path: '/register', component: () => import('@/views/register/register.vue') },
  {
    path: '/usercenter',
    component: () => import('@/views/userCenter/userCenter.vue')
  },
  { path: '*', redirect: '/404' },
  { path: '/404', component: () => import('../views/404/404.vue') },
  {
    path: '/',
    component: Layout,
    menuShow: true,
    name: '文章管理',
    iconCls: 'el-icon-edit-outline',
    children: [
      { path: '/artical/list', component: ArticalList, name: '文章列表', menuShow: true },
      { path: '/artical/category', component: ArticalCategory, name: '文章分类', menuShow: true },
      { path: '/artical/articalOperate', component: ArticalOperate, name: '文章页', menuShow: false },
      { path: '/artical/articalComment', component: ArticalComment, name: '评论页', menuShow: false },
    ]
  },
  {
    path: '/',
    component: Layout,
    menuShow: true,
    name: '相册管理',
    iconCls: 'el-icon-picture',
    children: [
      { path: '/albumList', component: AlbumList, name: '相册列表', menuShow: true },
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
