import { createApp } from 'vue'
import App from './App.vue'
// 配置element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// SVG集成
import 'virtual:svg-icons-register'
// 全局注册组件
import globalComponents from '@/components/index.ts'
// 引入模版全局样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn // 国际化配置-简体中文
})
app.use(globalComponents)



app.mount('#app')

