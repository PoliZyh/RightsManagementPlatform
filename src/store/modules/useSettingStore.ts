import { defineStore } from "pinia";
import type { I_SETTING_STATE } from "./types/type";

const useSettingStore = defineStore('setting', {

    state: (): I_SETTING_STATE => ({
        fold: false,
        refresh: false // 控制刷新
    }),

    actions: {

        /**
         * 改变是否折叠的状态
         * @param foldState 所需要切换的状态 若不传则取反
         */
        changeFold(foldState?: boolean) {
            if (foldState !== undefined) {
                this.fold = foldState
                return
            }
            this.fold = !this.fold
        },

        /**
         * 刷新界面
         */
        updateRefresh() {
            this.refresh = !this.refresh
        }

    }

})

export default useSettingStore