<template>
    <el-button size="small" circle icon="Refresh" @click="handleRefresh"></el-button>
    <el-button size="small" circle icon="FullScreen" @click="handleFullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <img :src="userStore.avatar" alt="Logo">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            <span>{{ userStore.username }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/useSettingStore';
import useUserStore from '@/store/modules/useUserStore';
import { useRouter, useRoute } from 'vue-router';
const settingStore = useSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
// 刷新按钮点击事件
const handleRefresh = () => {
    settingStore.updateRefresh()
}
// 全屏按钮点击事件
const handleFullScreen = () => {
    // DOM对象的一个属性：可以判断是否为全屏模式[全屏：true 不是全屏：false]
    const isFullScreen = document.fullscreenElement
    // 切换全屏
    if (!isFullScreen) {
        // 进入全屏
        document.documentElement.requestFullscreen()
    } else {
        // 退出全屏
        document.exitFullscreen()
    }
}
// 退出登录点击事件
const handleLogout = async () => {
    // 退出登录步骤
    // 1. 向服务器发退出登录的请求 告诉服务器token无效
    // 2. 清空仓库中关于用户的数据
    // 3. 跳转到Login页面
    await userStore.userLogout()
    router.push({
        path: '/login',
        query: {
            redirect: route.path
        }
    })
}

</script>


<style scoped lang="scss">
img {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    border-radius: 50%;
}
</style>