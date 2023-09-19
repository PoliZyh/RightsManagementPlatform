<template>
  <div class="trademark-box">
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌 -->
      <el-button type="primary" icon="Plus">添加品牌</el-button>
      <!-- 表格组件 -->
      <el-table class="table" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称">
          <template #="{row}">
            <span>{{ row.tmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{row}">
            <img :src="row.logoUrl" :alt="row.tmName + 'Logo'" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark'

let pageNo = ref<number>(1) // 当前页号
let pageSize = ref<number>(3) // 一页展示的数据
let total = ref<number>(0) // 已有品牌总数
let trademarkArr = ref([]) // 已有品牌数据

onMounted(async () => {
  await getHasTrademark()
})

const getHasTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, pageSize.value)
  if (res.code === 200) {
    // 存储已有品牌总个数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

</script>

<style scoped lang="scss">
.trademark-box {
  .box-card {
    .table {
      margin: 10px 0;
    }
  }
}
</style>
