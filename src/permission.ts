// 路由鉴权
import router from "./router";
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// stroe
import useUserStore from "./store/modules/useUserStore";
import pinia from "./store";
import { ElMessage } from "element-plus";
import setting from "./setting";

const userStore = useUserStore(pinia)
NProgress.configure({ showSpinner: false });
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 修改title
    document.title = setting.title + to.meta.title
    // 开启进度条
    NProgress.start()
    // 获取token，判断是否登录
    const token = userStore.token
    const username = userStore.username
    if (token) {
        // 登录成功 不能去login
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            // 登录成功 访问除了登录的路由
            // 有用户信息 放行 否则发请求
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next()
                } catch (err) {
                    // token过期 或 用户修改了token
                    // 需要退出登录(清空用户数据)
                    await userStore.userLogout()
                    ElMessage.error((err as Error).message)
                    next({path: '/login', query: {redirect: to.path}})
                }
            }
        }
    } else {
        // 前去登录
        if (to.path === '/login') {
            next()
        } else {
            // 不去登录
            next({path: '/login', query: {redirect: to.path}})
        }
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
})



// 1. 进度条
// 2. 路由访问权限
// 全部的路由组件：登录 ｜ 404 ｜ 任意路由 ｜ 首页 ｜ 数据大屏 ｜ 权限管理 ｜ 商品管理
// 是否登录：是否有token
// 未登录：可以访问login，其余六个路由不能访问，指向login
// 登录：不能访问login，可以访问其余路由
