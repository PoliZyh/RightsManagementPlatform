<template>
  <!-- 图标 -->
  <el-icon class="expand-icon" @click="handleChangeIcon">
    <component :is="settingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.meta.title"
      :to="item.path"
    >
      <div class="bread-item">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/useSettingStore'
import { useRoute } from 'vue-router'

const settingStore = useSettingStore()
const route = useRoute()
const handleChangeIcon = () => {
  settingStore.changeFold()
}
</script>

<style scoped lang="scss">
.expand-icon {
  cursor: pointer;
}
.bread-item {
  display: flex;
  gap: 3px;
  align-items: center;
}
</style>
