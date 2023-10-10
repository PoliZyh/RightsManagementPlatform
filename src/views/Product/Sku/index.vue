<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuList">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{ row }">
          <el-button
            size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="handleChangeSaleStatus(row)"
          ></el-button>
          <el-button
            size="small"
            icon="Edit"
            @click="ElMessage.warning('程序员在研发中...')"
          ></el-button>
          <el-button
            size="small"
            icon="InfoFilled"
            @click="handleFindSku(row)"
          ></el-button>
          <el-popconfirm title="确定删除嘛?" @confirm="handleDeleteSku(row)">
            <template #reference>
              <el-button size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 10, 12]"
      :background="true"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getSkuList"
    />
    <!-- 抽屉组件 -->
    <el-drawer v-model="isDrawer" :direction="'rtl'">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo?.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuAttrValueList"
              style="margin: 5px"
              :key="item.attrId"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuSaleAttrValueList"
              style="margin: 5px"
              :key="item.saleAttrId"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo?.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqGetSkuList,
  reqCancelSale,
  reqOnSale,
  reqGetSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
import type { I_SKU_DATA } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const skuList = ref<I_SKU_DATA[]>([])
const isDrawer = ref<boolean>(false)
const skuInfo = ref<I_SKU_DATA>()

onMounted(() => {
  getSkuList()
})

const getSkuList = async (pager: number = 1) => {
  pageNo.value = pager
  const res = await reqGetSkuList(pageNo.value, pageSize.value)
  if (res.code === 200) {
    ElMessage.success('获取SKU成功')
    total.value = res.data.total
    skuList.value = res.data.records
  }
}

const getSkuInfo = async (id: number) => {
  const res = await reqGetSkuInfo(id)
  if (res.code === 200) {
    ElMessage.success('获取详情成功')
    skuInfo.value = res.data
  } else {
    ElMessage.error('获取详情失败')
  }
}

const handleSizeChange = () => {
  getSkuList()
}

const handleChangeSaleStatus = async (row: I_SKU_DATA) => {
  if (row.isSale && row.isSale === 1) {
    // 上架变下架
    const res = await reqCancelSale(row.id as number)
    if (res.code === 200) {
      ElMessage.success('下架成功')
      getSkuList(pageNo.value)
    } else {
      ElMessage.error('下架失败')
    }
  } else if (row.isSale === 0) {
    const res = await reqOnSale(row.id as number)
    if (res.code === 200) {
      ElMessage.success('上架成功')
      getSkuList(pageNo.value)
    } else {
      ElMessage.error('上架失败')
    }
  }
}

const handleFindSku = async (row: I_SKU_DATA) => {
  isDrawer.value = true
  await getSkuInfo(row.id as number)
}

const handleDeleteSku = async (row: I_SKU_DATA) => {
  const res = await reqDeleteSku(row.id as number)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSkuList()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss"></style>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
