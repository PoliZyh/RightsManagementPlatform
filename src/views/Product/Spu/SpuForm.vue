<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="spuParams.tmId">
                <el-option 
                v-for="trademark in allTrademark"
                :label="trademark.tmName"
                :key="trademark.id"
                :value="trademark.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input v-model="spuParams.description" type="textarea" placeholder="请输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-upload v-model:file-list="imageList" action="/api//admin/product/fileUpload"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible" >
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'" v-model="saleAttrIdAndName">
                <el-option 
                v-for="item in unSelectSaleAttr"
                :key="item.id"
                :label="item.name"
                :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button icon="Plus" type="primary" style="margin-left: 10px;" :disabled="!saleAttrIdAndName" @click="handleAddSaleAttr">添加属性</el-button>
            <el-table border style="margin: 10px 0;" :data="saleAttrList">
                <el-table-column type="index" width="80px" label="序号" align="center"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值" >
                    <template #="{ row }">
                        <el-tag closable v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" style="margin: 0 5px;" @close="row.spuSaleAttrValueList.splice(index, 1)">
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.flag" placeholder="请输入属性值" size="small" style="width: 120px;" v-model="row.saleAttrValue" @blur="handleToView(row)"></el-input>
                        <el-button v-else type="primary" size="small" icon="Plus" @click="handleToEdit(row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100px">
                    <template #="{ $index }">
                        <el-button type="danger" icon="Delete" size="small" @click="saleAttrList.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSave" :disabled="saleAttrList!.length <= 0 ? true : false">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { I_SPU_OBJ, I_SPU_IMAGE_LIST, I_SALE_ATTR_LIST, I_ALL_SALE_ATTR_LIST, I_SALE_ATTR } from '@/api/product/spu/type';
import type { I_TRADEMARK_RECORDS } from '@/api/product/trademark/type';
import { reqGetAllTrademark, reqGetSpuImageList, reqGetSpuSaleAttr, reqGetAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu';
import { ElMessage, type UploadProps, type UploadRawFile } from 'element-plus'

const emit = defineEmits<{
    (e: 'changeScene', newScene: 0 | 1 | 2, type: 'update' | 'add'): void
}>()
const allTrademark = ref<I_TRADEMARK_RECORDS>([])
const imageList = ref<I_SPU_IMAGE_LIST>([])
const saleAttrList = ref<I_SALE_ATTR_LIST>([])
const allSaleAttrList = ref<I_ALL_SALE_ATTR_LIST>([])
const spuParams = ref<I_SPU_OBJ>({
    category3Id: null, // 收集三级分类的ID
    spuName: '', // spu名称
    description: '', // spu描述
    tmId: null, // 品牌的ID
    spuImageList: [], // 照片墙
    spuSaleAttrList: [], // 销售属性
}) 
const dialogVisible = ref<boolean>(false) 
const dialogImageUrl = ref<string>('')
const unSelectSaleAttr = computed(() => {
    const unSelectArr = allSaleAttrList.value.filter(item => {
        return saleAttrList.value.every(saleItem => item.name !== saleItem.saleAttrName)
    })
    return unSelectArr
})// 当前SPU还未拥有的销售属性
const saleAttrIdAndName = ref<string>('')

// 点击取消事件
const handleCancel = () => {
    emit('changeScene', 0, 'update')
}

// 
const getSpuData = async (spuItem: I_SPU_OBJ) => {
    // 不完整的spuItem
    spuParams.value = spuItem
    // 获取全部品牌的数据
    const resAllTrademark = await reqGetAllTrademark()
    // 获取某一个品牌旗下全部售卖商品的图片
    const resImageList = await reqGetSpuImageList(spuItem.id as number)
    // 获取Spu销售属性的数据
    const resSaleAttr = await reqGetSpuSaleAttr(spuItem.id as number)
    // 获取所有的销售属性
    const resAllSaleAttr = await reqGetAllSaleAttr()
    // 存储数据
    allTrademark.value = resAllTrademark.data
    imageList.value = resImageList.data.map(item => ({name: item.imgName, url: item.imgUrl}))
    saleAttrList.value = resSaleAttr.data
    allSaleAttrList.value = resAllSaleAttr.data
}

// 照片墙点击预览按钮触发的回调
const handlePictureCardPreview: UploadProps['onPreview'] = (file) => {
    dialogImageUrl.value = file.url as string
    dialogVisible.value = true
}

// 照片墙删除按钮触发的回调
const handleRemove : UploadProps['onRemove']= () => {
    ElMessage.success('删除成功')
}

// 照片墙图片上传成功前触发的回调
const handleBeforeUpload = (file: UploadRawFile) => {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
        return true
    }
    ElMessage.error('文件类型不符合')
    return false
}

// 添加属性按钮回调
const handleAddSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
    // 新的销售属性对象
    const newSaleAttr: I_SALE_ATTR = {
        baseSaleAttrId: parseInt(baseSaleAttrId),
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 追加到数组中
    saleAttrList.value.push(newSaleAttr)
    // 清空手机的内容
    saleAttrIdAndName.value = ''
}

// 切换为编辑模式
const handleToEdit = (row: I_SALE_ATTR) => {
    row.flag = true
    row.saleAttrValue = '' // 用于收集input内容
}

// 切换为查看模式
const handleToView = (row: I_SALE_ATTR) => {
    // 空串
    if (!row.saleAttrValue?.trim()) {
        row.flag = false
        ElMessage.warning('属性值不能为空')
        return
    }
    // 是否重复
    const hasFind = row.spuSaleAttrValueList.find(item => item.saleAttrValueName === row.saleAttrValue)
    if (hasFind) {
        row.flag = false
        ElMessage.warning('属性值已重复')
        return
    }
    const { baseSaleAttrId, saleAttrValue } = row
    row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue as string
    })
    row.flag = false
}

// 保存按钮的回调
const handleSave = async () => {
    // 整理参数
    // 1. 照片墙数据
    spuParams.value.spuImageList = imageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (!!item.response && item.response.data) || item.url
        }
    })
    // 2. 销售属性的数据
    spuParams.value.spuSaleAttrList = saleAttrList.value
    // 发请求
    const res = await reqAddOrUpdateSpu(spuParams.value)
    if (res.code === 200) {
        ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
        emit('changeScene', 0, spuParams.value.id ? 'update' : 'add')
    } else {
        ElMessage.error(spuParams.value.id ? '修改失败' : '添加失败')
    }
}

// 添加Spu需要发的请求
const addSpuRepuest = async (c3Id: number) => {
    clearParams()
    spuParams.value.category3Id = c3Id
    // 获取全部品牌的数据
    const resAllTrademark = await reqGetAllTrademark()
    // 获取所有的销售属性
    const resAllSaleAttr = await reqGetAllSaleAttr()
    allTrademark.value = resAllTrademark.data
    allSaleAttrList.value = resAllSaleAttr.data
}

// 清空数据
const clearParams = () => {
    Object.assign(spuParams.value, {
        category3Id: null, // 收集三级分类的ID
        spuName: '', // spu名称
        description: '', // spu描述
        tmId: null, // 品牌的ID
        spuImageList: [], // 照片墙
        spuSaleAttrList: [], // 销售属性
    })
    imageList.value = []
    saleAttrList.value = []
    saleAttrIdAndName.value = ''
}
// 对外暴露
defineExpose({
    getSpuData,
    addSpuRepuest
})


</script>


<style scoped lang="scss"></style>