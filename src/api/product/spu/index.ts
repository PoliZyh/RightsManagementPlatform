import request from "@/utils/request";
import type {
    I_SPU_LIST_RESPONSE_DATA,
    I_ALL_TRADEMARK_RESPONSE_DATA,
    I_SPU_IMGAGE_LIST_RESPONSE_DATA,
    I_SALE_ATTR_RESPONSE_DATA,
    I_ALL_SALE_ATTR_RESPONSE_DATA,
    I_SPU_OBJ
} from './type'

enum API {
    // 获取spu列表接口地址
    GET_SPU_LIST_URL = '/admin/product',
    // 获取全部品牌的数据地址
    GET_ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    // 获取某一个SPU下的照片墙数据地址
    GET_SPU_IMAGE_LIST_URL = '/admin/product/spuImageList',
    // 获取某一个SPU下全部的已有的销售属性接口地址
    GET_SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList',
    // 获取整个项目全部的销售属性[颜色、版本、尺码]
    GET_ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
    // 添加一个新的SPU
    ADD_SPU_URL = '/admin/product/saveSpuInfo',
    // 更新某一个SPU
    UPDATE_SPU_URL = '/admin/product/updateSpuInfo'
}


// 获取spu列表接口方法
export const reqGetSpuList = (page: number, limit: number, category3Id: number) => {
    return request<any, I_SPU_LIST_RESPONSE_DATA>({
        url: API.GET_SPU_LIST_URL + `/${page}/${limit}?category3Id=${category3Id}`,
        method: 'get',
    })
}

// 获取全部spu品牌的数据
export const reqGetAllTrademark = () => {
    return request<any, I_ALL_TRADEMARK_RESPONSE_DATA>({
        url: API.GET_ALL_TRADEMARK_URL,
        method: 'get'
    })
}

// 获取某一个SPU照片墙接口
export const reqGetSpuImageList = (spuId: number) => {
    return request<any, I_SPU_IMGAGE_LIST_RESPONSE_DATA>({
        url: API.GET_SPU_IMAGE_LIST_URL + `/${spuId}`,
        method: 'get'
    })
}

// 获取某一个已有的SPU拥有的销售属性
export const reqGetSpuSaleAttr = (spuId: number) => {
    return request<any, I_SALE_ATTR_RESPONSE_DATA>({
        url: API.GET_SPU_SALE_ATTR_URL + `/${spuId}`,
        method: 'get'
    })
}

// 获取项目全部的销售属性
export const reqGetAllSaleAttr = () => {
    return request<any, I_ALL_SALE_ATTR_RESPONSE_DATA>({
        url: API.GET_ALL_SALE_ATTR_URL,
        method: 'get'
    })
}

// 添加一个新的SPU
// data为新增或已有的SPU字段
export const reqAddOrUpdateSpu = (data: I_SPU_OBJ) => {
    if (data.id) {
        // 若有id则更新
        return request<any, any>({
            url: API.UPDATE_SPU_URL,
            method: 'post',
            data
        })
    } else {
        // 没有id则为添加
        return request<any, any>({
            url: API.ADD_SPU_URL,
            method: 'post',
            data
        })
    }
}