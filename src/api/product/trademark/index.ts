// 品牌管理模块
import request from '@/utils/request'
import type { I_TRADEMARK_RESPONSE_DATA, I_TRADEMARK } from './type'

enum API {
  // 获取已有品牌接口地址
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 添加品牌接口地址
  ADD_TREADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口地址
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除已有品牌接口地址
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

// 获取已有品牌接口
export const reqHasTrademark = (page: number = 1, limit: number = 3) => {
  return request<any, I_TRADEMARK_RESPONSE_DATA>({
    url: API.TRADEMARK_URL + `/${page}/${limit}`,
    method: 'get',
  })
}

// 添加与修改已有品牌的接口方法
export const reqAddOrUpdateTrademark = (data: I_TRADEMARK) => {
  if (data.id) {
    // 修改
    return request<any, any>({
      url: API.UPDATE_TRADEMARK_URL,
      method: 'put',
      data,
    })
  } else {
    // 新增
    return request<any, any>({
      url: API.ADD_TREADEMARK_URL,
      method: 'post',
      data,
    })
  }
}

// 删除已有品牌接口
export const reqDeleteTrademark = (id: number) => {
  return request<any, any>({
    url: API.DELETE_TRADEMARK_URL + `/${id}`,
    method: 'delete',
  })
}
