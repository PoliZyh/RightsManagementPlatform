import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { I_LOGIN_FORM } from "@/api/user/type";
import type { I_USER_STATE } from "./types/type";
import { constantRoutes } from "@/router/routes";

const useUserStore = defineStore('user', {

    state: (): I_USER_STATE => ({
        token: '', //用户唯一标识
        menuRoutes: constantRoutes, // 仓库存储生成菜单需要的数组（路由）
    }),

    actions: {
        // 用户登录
        async userLogin(loginForm: I_LOGIN_FORM) {
            const res = await reqLogin(loginForm)
            // 成功：200 token
            // 失败：201 失败信息
            if (res.code === 200) {
                if (res.data.token) {
                    this.token = res.data.token
                    // 保证返回成功的Promise
                    return 'succ'
                }
                return Promise.reject(new Error('获取Token失败'))
            } else {
                return Promise.reject(new Error(res.data.message))
            }
            
        }
    },

    getters: {

    },

    persist: [
        {
            paths: ['token'],
            storage: localStorage
        }
    ]
})


export default useUserStore