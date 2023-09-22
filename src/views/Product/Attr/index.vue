<template>
  <div class="attr-box">
    <!-- 三级分类全局组件 -->
    <Category :disabled="!showAttrList"></Category>

    <!-- table组件 -->
    <el-card style="margin: 10px 0">
      <!-- 展示 -->
      <div v-show="showAttrList">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="handleAddAttr">添加平台属性</el-button>
        <el-table border style="margin: 10px 0px" :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性名称" width="130px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag 
              v-for="tag in row.attrValueList" 
              :key="tag.id"
              style="margin: 5px;"
              >{{ tag.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px">
            <template #="{ row }">
              <el-button size="small" type="primary" icon="Edit" @click="handleUpdateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}吗？`" @confirm="handleDeleteAttr(row.id)">
                <template #reference>
                  <el-button size="small" type="primary" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 修改/添加属性 -->
      <div v-show="!showAttrList">
        <el-form inline>
          <el-form-item label="属性的名称" >
            <el-input placeholder="请输入属性的名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="handleAddAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column width="80px" type="index" align="center" label="序号"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input :ref="(vc: InputInstance) => elInputArr[$index] = vc" size="small" v-if="row.flag" placeholder="请输入属性值名称" v-model="row.valueName" @blur="handleToLook(row, $index)"></el-input>
              <div v-else @click="handleToEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button type="danger" size="small" icon="Delete" @click="handleDeleteAttrValue($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="Plus" @click="handleSave" :disabled="attrParams.attrValueList.length <= 0">保存</el-button>
        <el-button @click="handleCancelSave">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/useCategoryStore';
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import { reqGetAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr/index'
import type { I_ATTR_LIST, I_ATTR_OBJ, I_ATTR_VALUE_OBJ } from '@/api/product/attr/type'
import { ElMessage, type InputInstance } from 'element-plus';

const categoryStore = useCategoryStore()
let attrList = ref<I_ATTR_LIST>([])
let showAttrList = ref<boolean>(true)
let attrParams = reactive<I_ATTR_OBJ>({
  attrName: '', // 新增属性名字
  attrValueList: [], // 新增属性值
  categoryId: null, // 三级分类的ID
  categoryLevel: 3 // 代表的是三级分类
})
const elInputArr = ref<InputInstance[]>([]) // el-input组件实例数组

watch(
  () => categoryStore.c3Id,
  () => {
    if (categoryStore.c3Id) getAttrList()
    else attrList.value = []
  }
)

onBeforeUnmount(() => {
  // 销毁前清空仓库数据
  categoryStore.$reset()
})

// 获取table的attrList
const getAttrList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res = await reqGetAttr(c1Id as number, c2Id as number, c3Id as number)
  if (res.code === 200) {
    attrList.value = res.data
  }
}

// 添加属性按钮的回调
const handleAddAttr = () => {
  // 先清空数据
  clearAttrParams()
  showAttrList.value = false
  attrParams.categoryId = categoryStore.c3Id
}

// 修改属性按钮的回调
const handleUpdateAttr = (attrRow: I_ATTR_OBJ) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(attrRow)))
  showAttrList.value = false
}

// 取消保存按钮的回调
const handleCancelSave = () => {
  showAttrList.value = true
}

// 添加属性值按钮的回调
const handleAddAttrValue = async () => {
  // 点击添加属性值按钮时，向数组添加一个属性对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  await nextTick()
  elInputArr.value[attrParams.attrValueList.length - 1].focus()
}

// 保存新增/修改的属性
const handleSave = async () => {
  // 发请求
  const res = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    await getAttrList()
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    showAttrList.value = true
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

// 清空attrParams
const clearAttrParams = () => {
  const clear: I_ATTR_OBJ = {
    attrName: '',
    attrValueList: [],
    categoryId: null,
    categoryLevel: 3,
  }
  Object.assign(attrParams, clear)
}

// table-input失去焦点
const handleToLook = (attrValueRow: I_ATTR_VALUE_OBJ, index: number) => {
  // 属性值不能为空
  if (!attrValueRow.valueName.trim()) {
    ElMessage.warning('属性值名称不能为空')
    // 删除为空的元素
    attrParams.attrValueList.splice(index, 1)
    return
  }
  // 属性值不能重复
  const hasRepeat = attrParams.attrValueList.find(item => item !== attrValueRow && item.valueName === attrValueRow.valueName)
  if (hasRepeat) {
    ElMessage.warning('属性值重复')
    attrParams.attrValueList.splice(index, 1)
    return
  }
  attrValueRow.flag = false
}

// table-div点击事件
const handleToEdit = async (attrValueRow: I_ATTR_VALUE_OBJ, index: number) => {
  attrValueRow.flag = true
  // 聚焦input
  await nextTick()
  elInputArr.value[index].focus()
}

// 删除修改/新增下表格的一项
const handleDeleteAttrValue = (index: number) => {
  attrParams.attrValueList.splice(index, 1)
}

// 删除属性方法
const handleDeleteAttr = async (id: number) => {
  const res = await reqDeleteAttr(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAttrList()
  }
  else ElMessage.error('删除失败')
}
</script>

<style scoped lang="scss">

</style>
