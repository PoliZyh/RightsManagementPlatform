import { defineStore } from 'pinia'
import { reqGetC1, reqGetC2, reqGetC3 } from '@/api/product/attr'
import type { I_CATEGORY_STATE } from './types/type'
import { ElMessage } from 'element-plus'

const useCategoryStore = defineStore('category', {
    state: (): I_CATEGORY_STATE => ({
        c1Arr: [], // 一级菜单列表
        c1Id: null, // 选中的一级id
        c2Arr: [], // 二级
        c2Id: null,
        c3Arr: [], // 三级
        c3Id: null
    }),

    actions: {
        // 获取一级菜单列表
        async getC1() {
            const res = await reqGetC1()
            if (res.code === 200) {
                this.c1Arr = res.data
            } else {
                ElMessage.error('获取一级菜单失败')
            }
        },

        // 获取二级菜单列表
        async getC2() {
            const res = await reqGetC2(this.c1Id as number)
            if (res.code === 200) {
                this.c2Arr = res.data
            } else {
                ElMessage.error('获取二级菜单失败')
            }
        },

        // 获取三级菜单的列表
        async getC3() {
            const res = await reqGetC3(this.c2Id as number)
            if (res.code === 200) {
                this.c3Arr = res.data
            } else {
                ElMessage.error('获取三级菜单失败')
            }
        },

        clearC2() {
            this.c2Arr = []
            this.c2Id = null
        },

        clearC3() {
            this.c3Arr = []
            this.c3Id = null
        }
    },

    getters: {},
})

export default useCategoryStore
