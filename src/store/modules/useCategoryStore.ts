import { defineStore } from 'pinia'
import { reqGetC1 } from '@/api/product/attr'
import type { I_CATEGORY_STATE } from './types/type'

const useCategoryStore = defineStore('category', {

    state: (): I_CATEGORY_STATE => ({
        c1Arr: [],
        c1Id: null
    }),

    actions: {

        async getC1() {
            const res = await reqGetC1()
            if (res.code === 200) {
                this.c1Arr = res.data
            }
        }

    },

    getters: {

    }

})

export default useCategoryStore