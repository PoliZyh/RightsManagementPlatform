<template>
  <div class="attr-box">
    <!-- 三级分类全局组件 -->
    <Category></Category>
    
    <el-card style="margin: 10px 0;">
      <el-button type="primary" icon="Plus">添加平台属性</el-button>
      <el-table border style="margin: 10px 0px;">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" width="130px"></el-table-column>
        <el-table-column label="属性值名称"> </el-table-column>
        <el-table-column label="操作" width="130px"></el-table-column>
      </el-table>
    </el-card>
    
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.attr-box {

}
</style>
