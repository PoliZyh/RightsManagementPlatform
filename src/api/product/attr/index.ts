// 属性相关的API
import request from '@/utils/request'
import type {
  I_CATEGORY_RESPONSE_DATA,
  I_GET_ATTR_RESPONSE_DATA,
  I_ATTR_OBJ,
} from './type'

enum API {
  // 获取一级分类的接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类的接口地址
  C2_URL = '/admin/product/getCategory2',
  // 获取三级分类的接口地址
  C3_URL = '/admin/product/getCategory3',
  // 获取分类接口下的属性和属性值
  GET_ATTR_URL = '/admin/product/attrInfoList',
  // 新增或修改已有属性的接口
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性接口
  DELETE_ATTR_URL = '/admin/product/deleteAttr',
}

// 获取一级分类接口的方法
export const reqGetC1 = () => {
  return request<any, I_CATEGORY_RESPONSE_DATA>({
    url: API.C1_URL,
    method: 'get',
  })
}

// 获取二级分类接口的方法
export const reqGetC2 = (category1Id: number) => {
  return request<any, I_CATEGORY_RESPONSE_DATA>({
    url: API.C2_URL + `/${category1Id}`,
    method: 'get',
  })
}

// 获取三级分类接口的方法
export const reqGetC3 = (category2Id: number) => {
  return request<any, I_CATEGORY_RESPONSE_DATA>({
    url: API.C3_URL + `/${category2Id}`,
    method: 'get',
  })
}

// 获取对应分类下的已有的属性和属性值接口
export const reqGetAttr = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) => {
  return request<any, I_GET_ATTR_RESPONSE_DATA>({
    url: API.GET_ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })
}

// 新增或修改已有属性接口
export const reqAddOrUpdateAttr = (data: I_ATTR_OBJ) => {
  return request<any, any>({
    url: API.ADD_OR_UPDATE_ATTR_URL,
    method: 'post',
    data,
  })
}

// 删除属性的方法
export const reqDeleteAttr = (id: number) => {
  return request<any, any>({
    url: API.DELETE_ATTR_URL + `/${id}`,
  })
}
