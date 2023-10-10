<template>
  <div>
    <el-card style="height: 80px;">
      <el-form inline class="header-form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" @click="handleAddUser">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 展示用户信息 -->
      <el-table style="margin: 10px 0;" border :data="userList">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300px" align="center" fixed="right">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="handleEditUser(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
       <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getUserList"
      />
      <!-- 抽屉 -->
      <el-drawer v-model="isShowDrawer" :direction="'rtl'">
        <template #header>
          <h4>添加用户</h4>
        </template>
        <template #default>
          <div>
            <el-form>
              <el-form-item label="用户名字" v-model="userParams.username">
                <el-input placeholder="请输入用户的名字"></el-input>
              </el-form-item>
              <el-form-item label="用户名称" v-model="userParams.name">
                <el-input placeholder="请输入用户的名称"></el-input>
              </el-form-item>
              <el-form-item label="用户密码" v-model="userParams.password">
                <el-input placeholder="请输入用户的密码"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="handleCancelOnDrawer">取消</el-button>
            <el-button type="primary" @click="handleConfirmOnDrawer">确认</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { reqGetUserList, reqAddOrUpdateUser } from '@/api/acl/user/index'
import { ElMessage } from 'element-plus';
import type { I_USER_OBJ } from '@/api/acl/user/type';

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const userList = ref<I_USER_OBJ[]>()
const isShowDrawer = ref<boolean>(false)
const userParams = reactive<I_USER_OBJ>({
  username: '',
  name: '',
  password: ''
})

onMounted(() => {
  getUserList()
})

const getUserList = async (pager: number = 1) => {
  pageNo.value = pager
  const res = await reqGetUserList(pageNo.value, pageSize.value)
  if (res.code === 200) {
    ElMessage.success('获取用户列表成功')
    userList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取用户列表失败')
  }
}

const clearParams = () => {
  if (userParams.id) delete userParams.id
  Object.assign(userParams, {
    username: '',
    name: '',
    password: ''
  })
}

const handleSizeChange = () => {
  getUserList()
}

// 添加用户
const handleAddUser = () => {
  isShowDrawer.value = true
}

// 编辑用户
const handleEditUser = (row: I_USER_OBJ) => {
  isShowDrawer.value = true
}

// 取消编辑/添加用户
const handleCancelOnDrawer = () => {
  isShowDrawer.value = false
  clearParams()
}

// 确认编辑/添加用户
const handleConfirmOnDrawer = async () => {
  const res = await reqAddOrUpdateUser(userParams)
  if (res.code === 200) {
    isShowDrawer.value = false
    ElMessage.success(userParams.id ? '更新成功' : '添加成功')
    getUserList(userParams.id ? pageNo.value : 1)
    clearParams()
  } else {
    ElMessage.error(userParams.id ? '更新成功' : '添加成功')
  }
}
</script>

<style scoped lang="scss">
.header-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
