<template>
  <div class="logo-box" v-if="!setting.logo.hidden">
    <img :src="setting.logo.src" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
</script>

<style scoped lang="scss">
.logo-box {
  height: $base-menu-logo-height;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-title-fontSize;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
