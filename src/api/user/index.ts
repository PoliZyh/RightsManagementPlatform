// 用户相关的接口
import request from '@/utils/request'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

import type {
  I_LOGIN_FORM,
  I_LOGIN_RESPONSE_DATA,
  I_USE_RESPONSE_DATA,
} from './type'

// 暴露接口
// 登录接口
export const reqLogin = (data: I_LOGIN_FORM) => {
  return request<any, I_LOGIN_RESPONSE_DATA>({
    url: API.LOGIN_URL,
    method: 'POST',
    data,
  })
}
// 获取用户信息
export const reqUserInfo = () => {
  return request<any, I_USE_RESPONSE_DATA>({
    url: API.USERINFO_URL,
    method: 'GET',
  })
}
