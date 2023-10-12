<template>
  <div class="age-box">
    <div class="title">
      <p>年龄比例</p>
      <img src="../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="chartRef">

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'


const chartRef = ref<HTMLDivElement>()

onMounted(() => {
  const myCharts = echarts.init(chartRef.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '20%',
      right: '20px',
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        emphasis: {
          label: {
            show: true,
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '18以下' },
          { value: 735, name: '18-30岁' },
          { value: 580, name: '30-40岁' },
          { value: 484, name: '40-50岁' },
          { value: 300, name: '50岁以上' }
        ]
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})

</script>

<style lang="scss" scoped>
.age-box {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
    width: 100%;
  }
}</style>
