import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { I_USER_STATE } from './types/type'
import { constantRoutes } from '@/router/routes'
import { SET_TOKEN, GET_TOKEN, CLEAR_TOKEN } from '@/utils/token'
import type { I_LOGIN_FORM_DATA } from '@/api/user/type'

const useUserStore = defineStore('user', {
  state: (): I_USER_STATE => ({
    token: GET_TOKEN() || '', //用户唯一标识
    menuRoutes: constantRoutes, // 仓库存储生成菜单需要的数组（路由）
    username: '',
    avatar: ''
  }),

  actions: {
    // 用户登录
    async userLogin(loginForm: I_LOGIN_FORM_DATA) {
      const res = await reqLogin(loginForm)
      // 成功：200 token
      // 失败：201 失败信息
      if (res.code === 200) {
        if (res.data) {
          this.token = res.data
          SET_TOKEN(this.token)
          // 保证返回成功的Promise
          return 'succ'
        }
        return Promise.reject(new Error('获取Token失败'))
      } else {
        return Promise.reject(new Error(res.data))
      }
    },

    // 获取用户信息
    async userInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'succ'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },

    // 用户退出
    async userLogout() {
      const res = await reqLogout()
      if (res.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        CLEAR_TOKEN()
        return 'succ'
      } else {
        return Promise.reject(new Error(res.message))
      }
      
    }

  },

  getters: {},

  persist: [
    {
      paths: [],
      storage: localStorage,
    },
    {
      paths: [],
      storage: sessionStorage
    }
  ],
})

export default useUserStore
