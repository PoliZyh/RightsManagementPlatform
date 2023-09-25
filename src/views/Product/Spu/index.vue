<template>
  <div>
    <Category :disabled="isDisabled"></Category>
    <el-card style="margin: 10px 0;">
      <!-- 场景--展示table -->
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="handleAddSpu">添加SPU</el-button>
        <!-- table -->
        <el-table style="margin: 10px 0;" border :data="spuList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button size="small" icon="Edit" title="修改SPU" @click="handleUpdateSpu(row)"></el-button>
              <el-button size="small" icon="View" title="查看SKU列表"></el-button>
              <el-button size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="totalSpu"
          @size-change="handleSizeChange" @current-change="getSpuList" />
      </div>
      <!-- 场景--添加修改Spu -->
      <SpuFrom ref="spuFormRef" v-show="scene === 1" @change-scene="changeScene"></SpuFrom>
      <!-- 场景--添加Sku -->
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useCategoryStore from '@/store/modules/useCategoryStore';
import { reqGetSpuList } from '@/api/product/spu';
import type { I_SPU_LIST, I_SPU_OBJ } from '@/api/product/spu/type';
import SpuFrom from './SpuForm.vue'
import SkuForm from './SkuForm.vue'

const isDisabled = ref<boolean>(false)
const categoryStore = useCategoryStore()
let pageNo = ref<number>(1) // 页码
let pageSize = ref<number>(3)
let spuList = ref<I_SPU_LIST>([])
let totalSpu = ref<number>(0)
let scene = ref<0 | 1 | 2>(0) // 0-展示table 1-添加修改Spu 2-添加Sku
const spuFormRef = ref<any>() // SpuForm组件实例

// 监听三级菜单的变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getSpuList()
  }
)

// 获取三级分类下的SPU
const getSpuList = async (pager: number = 1) => {
  pageNo.value = pager
  const res = await reqGetSpuList(pageNo.value, pageSize.value, categoryStore.c3Id as number)
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
</script>

<style scoped lang="scss"></style>
