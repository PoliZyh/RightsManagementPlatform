<template>
    <div class="layout-box">
        <!-- 左侧导航 -->
        <div class="layout-slider">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu
                background-color="$base-menu-background"
                text-color="white"
                :default-active="route.path"
                >
                    <!-- 动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout-tabbar">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout-main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Main from './Main/index.vue'
import Tabbar from './Tabbar/index.vue'
import useUserStore from '@/store/modules/useUserStore';
import { useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()

</script>

<style lang="scss" scoped>
.layout-box {
    width: 100%;
    height: 100vh;
    .layout-slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        .scrollbar {
            width: 100%;
            color: white;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu {
                border-right: none;
            }
        }
    }
    .layout-tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0;
        left: $base-menu-width;
    }
    .layout-main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: bisque;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }
}
</style>