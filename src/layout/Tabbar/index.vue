<template>
  <div class="tabbar-box">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import Setting from './Setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(244, 236, 236),
    rgb(182, 182, 182),
    rgb(225, 222, 222)
  );
  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    gap: 10px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
