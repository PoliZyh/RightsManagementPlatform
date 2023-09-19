<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component" v-if="refreshFlag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/useSettingStore';
import { watch, ref, nextTick } from 'vue';

const settingStore = useSettingStore()
let refreshFlag = ref(true)
// 监听仓库内数据是否发生变化，若果变化则需要刷新
watch(
  () => settingStore.refresh,
  async () => {
    refreshFlag.value = false
    await nextTick()
    refreshFlag.value = true
  }
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
