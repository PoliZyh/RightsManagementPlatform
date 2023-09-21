<template>
    <el-card>
      <el-form inline>
        <el-form-item label="一级分类" >
          <el-select v-model="categoryStore.c1Id">
            <el-option 
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :value="c1.id"
            :label="c1.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select>
            <el-option label="北京"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select>
            <el-option label="北京"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/useCategoryStore.ts'

const categoryStore = useCategoryStore()

onMounted(() => {
  getC1()
})

const getC1 = () => {
  categoryStore.getC1()
}

</script>


<style lang="scss" scoped>

</style>