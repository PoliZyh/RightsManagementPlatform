<template>
  <div class="container">
    <!-- 内容区 -->
    <div class="screen" ref="screenRef">
      <!-- 顶部 -->
      <Top></Top>

      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/Top.vue'
import Age from './components/Age.vue'
import Tourist from './components/Tourist.vue'
import Sex from './components/Sex.vue'
import Map from './components/Map.vue'
import Line from './components/Line.vue'

const screenRef = ref<HTMLDivElement>()

onMounted(() => {
  screenRef.value?.style.setProperty(
    'transform',
    `scale(${getScale()}) translate(-50%, -50%)`,
  )
})

// 大屏锁放的比例
const getScale = (w: number = 1920, h: number = 1080) => {
  const ww = window.innerWidth / w
  const hh = window.innerHeight / h
  return ww < hh ? ww : hh
}

// 监听适口变化
window.onresize = () => {
  screenRef.value?.style.setProperty(
    'transform',
    `scale(${getScale()}) translate(-50%, -50%)`,
  )
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('./images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;

    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
