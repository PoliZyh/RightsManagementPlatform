<template>
    <div>
        <template 
        v-for="item in menuList" 
        :key="item.path">
            <!-- 没有自路由 -->
            <template v-if="!item.children">
                <el-menu-item v-if="!item.meta!.hidden" :index="item.path" @click="handleGoRoute">
                    <el-icon>
                        <component :is="item.meta!.icon"></component>
                    </el-icon>
                    <template #title>
                        {{ item.meta!.title }}
                    </template>
                </el-menu-item>
            </template>
            <!-- 有自路由且只有一个子路由 -->
            <template v-if="item.children && item.children.length === 1">
                <el-menu-item v-if="!item.children[0].meta!.hidden"  :index="item.children[0].path" @click="handleGoRoute">
                    <el-icon>
                        <component :is="item.children[0].meta!.icon"></component>
                    </el-icon>
                    <template #title>
                        {{ item.children[0].meta!.title }}
                    </template>
                </el-menu-item>
            </template>
            <!-- 有自路由且子路由大于一个 -->
            <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta!.icon"></component>
                    </el-icon>
                    {{ item.meta!.title }}
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </div>
</template>


<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { MenuItemRegistered } from 'element-plus'
const router = useRouter()
defineProps<{
    menuList: RouteRecordRaw[]
}>()

const handleGoRoute = (vc: MenuItemRegistered) => {
    router.push(vc.index)
}
</script>

<script lang="ts">
export default {
    name: 'Menu' // 递归组件必须有name
}
</script>

<style lang="sccss" scoped>

</style>