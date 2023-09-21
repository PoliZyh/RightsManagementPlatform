// 属性相关的API
import request from "@/utils/request";
import type { I_CATEGORY_RESPONSE_DATA } from "./type";

enum API {
    // 获取一级分类的接口地址
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类的接口地址
    C2_URL = '/admin/product/getCategory2',
    // 获取三级分类的接口地址
    C3_URL = '/admin/product/getCategory3'
}

// 获取一级分类接口的方法
export const reqGetC1 = () => {
    return request<any, I_CATEGORY_RESPONSE_DATA>({
        url: API.C1_URL,
        method: 'get'
    })
}

// 获取二级分类接口的方法
export const reqGetC2 = (category1Id: number) => {
    return request<any, I_CATEGORY_RESPONSE_DATA>({
        url: API.C2_URL + `/${category1Id}`,
        method: 'get'
    })
}

// 获取三级分类接口的方法
export const reqGetC3 = (category2Id: number) => {
    return request<any, I_CATEGORY_RESPONSE_DATA>({
        url: API.C3_URL + `/${category2Id}`,
        method: 'get'
    })
}
