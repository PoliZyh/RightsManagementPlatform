// SKU模块接口管理
import request from "@/utils/request";
import type {
    I_SKU_LIST_RESPONSE_DATA,
    I_SKU_INFO_RESPONSE_DATA
} from './type'

enum API {
    // 获取已有商品的数据
    GET_SKU_URL = '/admin/product/list',
    // 上架商品
    ON_SALE_URL = '/admin/product/onSale',
    // 下架商品
    CANCEL_SALE_URL = '/admin/product/cancelSale',
    // 获取商品详情的接口
    GET_SKU_INFO_URL = '/admin/product/getSkuInfo',
    // 删除商品接口
    DELETE_SKU_URL = '/admin/product/deleteSku'
}


// 获取已有商品的方法
export const reqGetSkuList = (page: number, limit: number) => {
    return request<any, I_SKU_LIST_RESPONSE_DATA>({
        method: 'get',
        url: API.GET_SKU_URL + `/${page}/${limit}`
    })
} 

// 上架的方法
export const reqOnSale = (skuId: number) => {
    return request<any, any>({
        method: 'get',
        url: API.ON_SALE_URL + `/${skuId}`
    })
}

// 下架的方法
export const reqCancelSale = (skuId: number) => {
    return request<any, any>({
        method: 'get',
        url: API.CANCEL_SALE_URL + `/${skuId}`
    })
}

// 获取商品信息
export const reqGetSkuInfo = (skuId: number) => {
    return request<any, I_SKU_INFO_RESPONSE_DATA>({
        method: 'get',
        url: API.GET_SKU_INFO_URL + `/${skuId}`
    })
}


// 删除商品
export const reqDeleteSku = (skuId: number) => {
    return request<any, any>({
        method: 'delete',
        url: API.DELETE_SKU_URL + `/${skuId}`
    })
}