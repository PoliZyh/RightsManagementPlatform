<template>
    <div class="login-box">
        <el-row>
            <!-- xs是屏幕小于等于768px时 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form 
                class="login-form"
                :model="loginForm"
                :rules="rules"
                ref="loginFormNode">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input 
                        :prefix-icon="User" 
                        v-model="loginForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                        type="password" 
                        :prefix-icon="Lock" 
                        v-model="loginForm.password"
                        show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                        class="login-btn" 
                        type="primary"
                        @click="handleLogin"
                        :loading="isLoading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/useUserStore'
import { useRouter } from 'vue-router';
import { ElMessage, ElNotification } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import { getTimeNode } from '@/utils/time'

let loginForm = reactive({
    username: '',
    password: ''
})
let isLoading = ref(false)
const loginFormNode = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

// 自定义校验规则
const creaetValidator = (min: number, max: number = 10) => {
    return (_: any, value: any, callback: any) => {
        if (value.length >= min && value.length <= max) {
            callback()
        } else {
            callback(new Error(`账号长度${min}至${max}位`))
        }
    }
}

const rules: FormRules = {
    username: [
        { trigger: 'change', validator: creaetValidator(5) }
    ],
    password: [
        { trigger: 'change', validator: creaetValidator(6, 11) }
    ]
}

const handleLogin = async () => {
    isLoading.value = true
    // 保证表单校验通过再发请求
    try {
        await loginFormNode.value?.validate()
    } catch {
        isLoading.value = false
        return Promise.reject(void 0)
    }
    try {
        // 登录成功
        await userStore.userLogin(loginForm)
        router.push({
            name: 'Layout' // 跳转到首页
        })
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: 'HI,' + getTimeNode() + '好！'
        })
    } catch (err) {
        // 登录失败
        ElMessage({
            type: 'error',
            message: (err as Error).message
        })
    }
    isLoading.value = false
}




</script>


<style scoped lang="scss">
.login-box {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login-form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
        h1 {
            color: white;
            font-size: 40px;
        }
        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }
        .login-btn {
            width: 100%;
        }
    }
}
</style>