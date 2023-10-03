<template>
    <el-form label-width="90px">
        <el-form-item label="sku名称">
            <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input type="number" placeholder="价格(元)" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input type="number" placeholder="重量(克)" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="sku描述">
            <el-input type="textarea" placeholder="sku描述" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性" >
            <el-form inline>
                <el-form-item :label="item.attrName" v-for="item in attrList" :key="item.id">
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option 
                        :value="`${item.id}:${attrValue.id}`"
                        v-for="attrValue in item.attrValueList" 
                        :key="attrValue.id"
                        :label="attrValue.valueName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item :label="item.saleAttrName" v-for="item in saleList" :key="item.id">
                    <el-select v-model="item.saleIdAndValueId">
                        <el-option 
                        v-for="saleAttrValue in item.spuSaleAttrValueList" 
                        :key="saleAttrValue.id"
                        :value="`${item.id}:${saleAttrValue.id}`"
                        :label="saleAttrValue.saleAttrValueName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgList" ref="TableRef">
                <el-table-column type="selection" align="center" width="80px"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row }">
                        <img :src="row.imgUrl" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" @click="handleDefaultImg(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import type { I_SPU_OBJ, I_SALE_ATTR_LIST, I_SPU_IMAGE_LIST, I_SKU_DATA, I_SPU_IMAGE } from '@/api/product/spu/type';
import { reqGetAttr } from '@/api/product/attr';
import { reqGetSpuImageList, reqGetSpuSaleAttr, reqAddSku } from '@/api/product/spu';
import { reactive, ref } from 'vue';
import type { I_ATTR_LIST } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';

const emit = defineEmits<{
    (e: 'changeScene', newScene: 0 | 1 | 2, type: 'update' | 'add'): void
}>()
let attrList = ref<I_ATTR_LIST>([]) // 平台属性
let saleList = ref<I_SALE_ATTR_LIST>([]) // 销售属性
let imgList = ref<I_SPU_IMAGE_LIST>([]) // 照片墙
let skuParams = reactive<I_SKU_DATA>({
    category3Id: null,
    spuId: null,
    tmId: null,
    skuDesc: '',
    price: null,
    weight: null,
    skuName: '',
    skuAttrValueList:[],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
}) 
const TableRef = ref<any>() // tableVC

// 取消按钮的回调
const handleCancel = () => {
    emit('changeScene', 0, 'add')
}

// 获取sku所需要的数据
const getSkuData = async (c1Id: number, c2Id: number, spuItem: I_SPU_OBJ) => {
    // 收集数据
    skuParams.category3Id = spuItem.category3Id
    skuParams.spuId = spuItem.id as number
    skuParams.tmId = spuItem.tmId
    // 获取平台属性
    const attrRes = await reqGetAttr(c1Id, c2Id, spuItem.category3Id as number)
    // 获取对应的照片墙
    const imgRes = await reqGetSpuImageList(spuItem.id as number)
    // 获取对应的销售属性
    const saleRes = await reqGetSpuSaleAttr(spuItem.id as number)
    // 存储
    attrList.value = attrRes.data
    saleList.value = saleRes.data
    imgList.value = imgRes.data
}

const handleDefaultImg = (row: I_SPU_IMAGE) => {
    // 复选框选中
    TableRef.value.clearSelection()
    TableRef.value.toggleRowSelection(row, true)
    skuParams.skuDefaultImg = row.imgUrl as string
}

const handleSave = async () => {
    skuParams.skuAttrValueList = attrList.value.map(item => {
        if (item.attrIdAndValueId) {
            const [attrId, valueId] = item.attrIdAndValueId.split(':')
            return {
                attrId: parseInt(attrId),
                valueId: parseInt(valueId)
            }
        } else {
            return {
                attrId: null,
                valueId: null
            }
        }
    })
    skuParams.skuSaleAttrValueList = saleList.value.map(item => {
        if (item.saleIdAndValueId) {
            const [attrId, valueId] = item.saleIdAndValueId.split(':')
            return {
                attrId: parseInt(attrId),
                valueId: parseInt(valueId)
            }
        } else {
            return {
                attrId: null,
                valueId: null
            }
        }
    })
    try {
        const res = await reqAddSku(skuParams)
        if (res.code === 200) {
            ElMessage.success('添加sku成功')
            emit('changeScene', 0, 'add')
        } else {
            ElMessage.error('添加sku失败')
        }
    } catch {
        ElMessage.error('添加sku失败')
    }
}

defineExpose({
    getSkuData
})

</script>

<style scoped lang="scss"></style>
