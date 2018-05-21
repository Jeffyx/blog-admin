import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path == '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            // 这里在跳转其他页面的时候，应该判断一下vuex是否被刷新，致使用户信息丢失
            // 如果用户信息丢失，应该重新向后台拉取用户信息。鉴于后台接口API并没有获取
            // 用户信息的API，只有登录API能获取用户信息。若被刷新，则登录API保存的信息也会
            // 清掉，所以这里无法再从新拉取用户信息
            // 解决方案：采用localRorage进行本地离线存储信息
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})