<template>
  <div class="line-box">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()

onMounted(() => {
  const myCharts = echarts.init(chartRef.value)
  myCharts.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 20,
      bottom: 30,
      right: 10,
    },
    series: [
      {
        type: 'line',
        data: [120, 450, 160, 480, 330, 210, 180, 256],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: 'yellow', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'transparent', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.line-box {
  height: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .title {
    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
