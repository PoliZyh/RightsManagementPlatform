<template>
  <div>
    <Category :disabled="isDisabled"></Category>
    <el-card style="margin: 10px 0">
      <!-- 场景--展示table -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="handleAddSpu"
        >
          添加SPU
        </el-button>
        <!-- table -->
        <el-table style="margin: 10px 0" border :data="spuList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button size="small" icon="Plus" title="添加SKU" @click="handleAddSku(row)"></el-button>
              <el-button
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="handleUpdateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="handleFindSku(row)"
              ></el-button>
              <el-popconfirm title="你确定删除该SPU嘛?" @confirm="handleDeleteSpu(row)">
                <template #reference>
                  <el-button size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
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
          :total="totalSpu"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
        />
      </div>
      <!-- 场景--添加修改Spu -->
      <SpuFrom
        ref="spuFormRef"
        v-show="scene === 1"
        @change-scene="changeScene"
      ></SpuFrom>
      <!-- 场景--添加Sku -->
      <SkuForm v-show="scene === 2" @change-scene="changeScene" ref="skuFormRef"></SkuForm>
    </el-card>
    <el-dialog title="SKU列表" v-model="isShowDialog">
      <el-table border :data="skuList">
        <el-table-column label="sku名字" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/useCategoryStore'
import { reqGetSpuList, reqGetSkuList, reqDeleteSpu } from '@/api/product/spu'
import type { I_SKU_DATA, I_SPU_LIST, I_SPU_OBJ } from '@/api/product/spu/type'
import SpuFrom from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import { ElMessage } from 'element-plus'

const isDisabled = ref<boolean>(false)
const categoryStore = useCategoryStore()
let pageNo = ref<number>(1) // 页码
let pageSize = ref<number>(3)
let spuList = ref<I_SPU_LIST>([])
let totalSpu = ref<number>(0)
let scene = ref<0 | 1 | 2>(0) // 0-展示table 1-添加修改Spu 2-添加Sku
let skuList = ref<I_SKU_DATA[]>()
let isShowDialog = ref<boolean>(false)
const spuFormRef = ref<any>() // SpuForm组件实例
const skuFormRef = ref<any>() // SkuForm组件实例

// 监听三级菜单的变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getSpuList()
  },
)

onBeforeUnmount(() => {
  categoryStore.$reset()
})

// 获取三级分类下的SPU
const getSpuList = async (pager: number = 1) => {
  pageNo.value = pager
  const res = await reqGetSpuList(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id as number,
  )
  if (res.code === 200) {
    spuList.value = res.data.records
    totalSpu.value = res.data.total
  }
}

// 页大小变化
const handleSizeChange = () => {
  if (!categoryStore.c3Id) return
  getSpuList()
}

// 添加新的SPU按钮回调
const handleAddSpu = () => {
  // 切换场景
  scene.value = 1
  // 调用自组件方法初始化数据
  spuFormRef.value.addSpuRepuest(categoryStore.c3Id)
}

// 自组件自定义事件-切换场景
const changeScene = (newScene: 0 | 1 | 2, type: 'update' | 'add') => {
  scene.value = newScene
  getSpuList(type === 'update' ? pageNo.value : 1)
}

// 修改SPU按钮回调
const handleUpdateSpu = (spuItem: I_SPU_OBJ) => {
  scene.value = 1
  // 调用自组件实例方法获取spu数据
  spuFormRef.value.getSpuData(spuItem)
}

// 添加sku
const handleAddSku = (spuItem: I_SPU_OBJ) => {
  // 切换场景 -> skuForm
  scene.value = 2
  // 调用子组件获取sku数据
  const { c1Id, c2Id } = categoryStore
  skuFormRef.value.getSkuData(c1Id as number, c2Id as number, spuItem)
}

// 展示sku
const handleFindSku = async (row: I_SPU_OBJ) => {
  const res = await reqGetSkuList(row.id as number)
  if (res.code === 200) {
    skuList.value = res.data
    isShowDialog.value = true
  } else {
    ElMessage.error('获取skuList失败')
  }
}

// 删除spu
const handleDeleteSpu = async (row: I_SPU_OBJ) => {
  const res = await reqDeleteSpu(row.id as number)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    await getSpuList()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss"></style>
