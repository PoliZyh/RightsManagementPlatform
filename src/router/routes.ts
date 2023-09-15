import { RouteRecordRaw } from "vue-router"

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            title: '登录',
            hidden: true, // 路由标题是否隐藏
            icon: 'Promotion' // 菜单左侧图标
        }
    },
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: 'layout',
            hidden: false,
            icon: 'Avatar',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/Home/index.vue'),
                name: 'Home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform'
        }
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/Acl/User/index.vue'),
                name: 'Acl',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/Acl/Role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/Acl/Permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Grid'
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'Goods',
            hidden: false
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/Product/Trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCart',
                    hidden: false
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/Product/Attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled',
                    hidden: false
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/Product/Spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'Spu管理',
                    icon: 'Management',
                    hidden: false
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/Product/Sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'Sku管理',
                    icon: 'Orange',
                    hidden: false
                }
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '404',
            hidden: true,
            icon: 'CloseBold'
        }
    },
    {
        // 任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'Warning'
        }
    }

]
