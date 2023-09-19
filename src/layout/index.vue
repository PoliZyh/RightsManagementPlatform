<template>
  <div class="layout-box">
    <!-- 左侧导航 -->
    <div class="layout-slider" :class="{ fold: settingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="$base-menu-background" text-color="white" :default-active="route.path"
          :collapse="settingStore.fold" class="menu" :style="{ 'bg-color': 'red' }" popper-effect="dark">
          <!-- 动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar" :class="{ fold: settingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout-main" :class="{ fold: settingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Main from './Main/index.vue'
import Tabbar from './Tabbar/index.vue'
import useUserStore from '@/store/modules/useUserStore'
import useSettingStore from '@/store/modules/useSettingStore'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const settingStore = useSettingStore()
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
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      color: white;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        --el-menu-bg-color: $base-menu-background;
        border-right: none;
      }

    }

    // 相当于.layout-slider.fold同时具备这两个类名
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout-tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all .3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all .3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

<style lang="scss">
.el-popper.is-light {
  background-color: $base-menu-background;
}
</style>
