import SvgIcon from './SvgIcon/index.vue'
import { App } from 'vue'

const allGlobalComponents = { SvgIcon }

// 对外暴漏一个插件对象
export default {
    install(app: App<Element>) {
        Object.keys(allGlobalComponents).forEach(key => {
            app.component(key, allGlobalComponents[key as keyof typeof allGlobalComponents])
        })
    }
}