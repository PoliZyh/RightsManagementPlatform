import request from '@/utils/request'
import type { I_GET_USER_RESPONSE_DATA, I_USER_OBJ } from './type'

enum API {
  // 获取用户列表的接口地址
  GET_USER_URL = '/admin/acl/user',
  // 新增用户接口
  ADD_USER_URL = '/admin/acl/user/save',
  // 更新用户的接口
  UPDATE_USER_URL = '/admin/acl/user/update',
  //
}

// 获取用户列表的方法
export const reqGetUserList = (page: number, limit: number) => {
  return request<any, I_GET_USER_RESPONSE_DATA>({
    url: API.GET_USER_URL + `/${page}/${limit}`,
    method: 'get',
  })
}

// 新增用户和更新用户的方法
export const reqAddOrUpdateUser = (data: I_USER_OBJ) => {
  if (data.id) {
    // 有id更新
    return request<any, any>({
      url: API.UPDATE_USER_URL,
      method: 'put',
      data,
    })
  } else {
    // 无id添加
    return request<any, any>({
      url: API.ADD_USER_URL,
      method: 'post',
      data,
    })
  }
}
