
// 品牌管理模块
import request from "@/utils/request";

enum API {
    // 获取已有品牌接口地址
    TRADEMARK_URL = "/admin/product/baseTrademark"
}

export const reqHasTrademark = (page: number = 1, limit: number = 3) => {
    return request<any, any>({
        url: API.TRADEMARK_URL + `/${page}/${limit}`,
        method: 'get'
    })
}

