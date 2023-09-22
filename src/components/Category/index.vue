<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handleChangeC1" :disabled="disabled">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :value="c1.id"
            :label="c1.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handleChangeC2" :disabled="disabled">
          <el-option 
          v-for="c2 in categoryStore.c2Arr"
          :key="c2.id"
          :label="c2.name"
          :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="disabled">
          <el-option 
          v-for="c3 in categoryStore.c3Arr"
          :key="c3.id"
          :value="c3.id"
          :label="c3.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/useCategoryStore.ts'

const categoryStore = useCategoryStore()
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  getC1()
})

const getC1 = () => {
  categoryStore.getC1()
}

// 一级下拉菜单的change事件
const handleChangeC1 = () => {
  // 清空二三级数据
  categoryStore.clearC2()
  categoryStore.clearC3()
  // 获取二级分类的数据
  categoryStore.getC2()
}

const handleChangeC2 = () => {
  // 清空三级的数据
  categoryStore.clearC3()
  // 获取三级分类的数据
  categoryStore.getC3()
}
</script>

<style lang="scss" scoped></style>
