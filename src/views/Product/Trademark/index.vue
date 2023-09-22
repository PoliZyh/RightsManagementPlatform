<template>
  <div class="trademark-box">
    <!-- card -->
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌 -->
      <el-button type="primary" icon="Plus" @click="handleAddTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件 -->
      <el-table class="table" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称">
          <template #="{ row }">
            <span>{{ row.tmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleUpdateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定删除${row.tmName}嘛`"
              width="250px"
              icon="Delete"
              @confirm="handleDeleteTrademark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @current-change="getHasTrademark"
        @size-change="handleChangePaageSize"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="90px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-wdith="90px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancelDialog">取消</el-button>
        <el-button type="primary" @click="handleConfirmDialog">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  I_TRADEMARK_RECORDS,
  I_TRADEMARK,
  I_UPLOAD_LOGO_RESPONSE_DATA,
} from '@/api/product/trademark/type'
import {
  ElMessage,
  type UploadProps,
  type FormRules,
  type FormInstance,
} from 'element-plus'

let pageNo = ref<number>(1) // 当前页号
let pageSize = ref<number>(3) // 一页展示的数据
let total = ref<number>(0) // 已有品牌总数
let trademarkArr = ref<I_TRADEMARK_RECORDS>([]) // 已有品牌数据
let dialogFormVisible = ref<boolean>(false) // dialog的现实与隐藏
let trademarkParams = reactive<I_TRADEMARK>({
  tmName: '',
  logoUrl: '',
})
const formRef = ref<FormInstance>()

// 表单校验
const validatorTmName = (_: any, value: any, cb: any) => {
  if (value.trim().length >= 2) {
    cb()
  } else {
    cb(new Error('品牌名称位数需大于等于两位'))
  }
}
const validatorLogoUrl = (_: any, value: any, cb: any) => {
  if (value) cb()
  else cb(new Error('请上传Logo图片'))
}
const rules: FormRules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
}

onMounted(async () => {
  await getHasTrademark()
})

const getHasTrademark = async (toPageNo: number = 1) => {
  pageNo.value = toPageNo
  const res = await reqHasTrademark(pageNo.value, pageSize.value)
  if (res.code === 200) {
    // 存储已有品牌总个数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 改变一页的大小触发的回调
const handleChangePaageSize = async () => {
  await getHasTrademark()
}

// 点击新增品牌事件回调
const handleAddTrademark = async () => {
  if (trademarkParams.id) {
    delete trademarkParams.id
  }
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = true
  await nextTick()
  formRef.value?.clearValidate()
}

// 点击修改品牌事件回调
const handleUpdateTrademark = async (row: I_TRADEMARK) => {
  // 展示已有品牌的数据
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
  await nextTick()
  formRef.value?.clearValidate()
}

// dialog取消事件
const handleCancelDialog = () => {
  dialogFormVisible.value = false
}

// dialog确认事件
const handleConfirmDialog = async () => {
  // 调用该方法进行表单全部校验，若全部通过则进行后面语句
  await formRef.value?.validate()
  const res = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
    // 添加成功去第一页
    // 修改成功留在当前页
    await getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
  }
  dialogFormVisible.value = false
}

/**
 * 图片上传之前触发的钩子函数
 * @param rawFile 所上传的文件对象
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 上传之前可以约束文件的类型与大小
  // 上传的格式为png ｜ jpg ｜ gif 4M
  const limitType = ['image/png', 'image/jpeg', 'image/gif']
  if (!limitType.includes(rawFile.type)) {
    ElMessage.error('上传格式为 png | jpg | gif')
    return false
  }
  // 大小约束
  if (rawFile.size / 1024 / 1024 >= 4) {
    ElMessage.error('上传类型大小需小于4M')
    return false
  }
}

/**
 * 图片上传成功的钩子
 * @param response 服务器响应的数据
 * @param uploadFile 图片对象
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: I_UPLOAD_LOGO_RESPONSE_DATA,
) => {
  // 图片上传成功应该清空logo的校验规则
  formRef.value?.clearValidate('logoUrl')
  // 收集上传的地址，添加品牌时上传给服务器
  trademarkParams.logoUrl = response.data
}

// 气泡确认框确认删除该品牌
const handleDeleteTrademark = async (id: number) => {
  const res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage.success('删除品牌成功')
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage.error('删除品牌失败')
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
