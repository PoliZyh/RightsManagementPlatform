// 用户相关的接口
import request from '@/utils/request'
import type {
  I_LOGIN_FORM_DATA,
  I_LOGIN_RESPONSE_DATA,
  I_USERINFO_RESPONSE_DATA,
} from './type'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: I_LOGIN_FORM_DATA) => {
  return request<any, I_LOGIN_RESPONSE_DATA>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  })
}

// 获取用户信息接口
export const reqUserInfo = () => {
  return request<any, I_USERINFO_RESPONSE_DATA>({
    url: API.USERINFO_URL,
    method: 'get',
  })
}

// 退出登录
export const reqLogout = () => {
  return request<any, any>({
    url: API.LOGOUT_URL,
    method: 'post',
  })
}
