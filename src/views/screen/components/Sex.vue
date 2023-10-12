<template>
  <div class="sex-box">
    <div class="title">
      <p>男女比例</p>
      <img src="../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="chartRef">

    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';

const chartRef = ref<HTMLDivElement>()

onMounted(() => {
  const myCharts = echarts.init(chartRef.value)
  myCharts.setOption({
    // title: {
    //   text: '男女比例',
    //   textStyle: {
    //     color: 'skyblue'
    //   },
    //   left: '40%'
    // },
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
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
.sex-box {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url('../images/man-bg.png') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url('../images/woman-bg.png') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 0 10px;
  }
  .charts {
    height: 60px;
    padding: 0 10px;
    width: 100%;
  }
}
</style>
