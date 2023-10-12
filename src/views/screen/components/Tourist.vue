<template>
  <div class="tou-box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999人</span>
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index" class="num-item">
        {{ item }}
      </span>
    </div>
    <div class="charts" ref="waterRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref<string>('216908人')
const waterRef = ref<HTMLDivElement>()

onMounted(() => {
  let myCharts = echarts.init(waterRef.value)
  // 设置配置
  myCharts.setOption({
    title: {
      text: '水球图',
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.4, 0.2],
        outline: {
          show: false,
        },
        radius: '100%',
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.tou-box {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: cover;
      width: 68px;
      height: 7px;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    .num-item {
      flex: 1;
      background: url('../images/total.png') no-repeat;
      background-size: 100% 100%;
      height: 40px;
      text-align: center;
      line-height: 97px;
      color: #29fcff;
      line-height: 40px;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
