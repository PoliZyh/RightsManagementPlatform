<template>
    <div class="map-box" ref="mapRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import ChinaJson from './china.json?raw'

const mapRef = ref<HTMLDivElement>()

echarts.registerMap('china', ChinaJson)

onMounted(() => {
    // 注册中国地图
    const myCharts = echarts.init(mapRef.value)
    myCharts.setOption({
        // 地图组件
        geo: {
            map: 'china',
            roam: true, // 鼠标缩放效果
            label: {
                show: true,
                color: 'white',
                fontSize: 14
            },
            zoom: 1.1,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'skyblue' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        },
        series: [
            {
                type: 'lines', // 航线
                data: [
                    {
                        coords: [
                            [116.405285, 39.904989], // 起点
                            [119.306239, 26.075302], // 终点
                        ],
                        lineStyle: {
                            color: 'orange',
                            width: 5
                        },

                    }
                ],
                effect: {
                    show: true,
                    symbol: 'arrow',
                    color: 'yellow',
                    symbolSize: 15
                }
            }
        ]
    })

})

</script>


<style scoped lang="scss">
.map-box {
    width: 100%;
    height: 100%;
}
</style>