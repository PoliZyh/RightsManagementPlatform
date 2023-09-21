import type { I_RESPONSE_DATA } from "../type"

// 登录接口携带参数
export interface I_LOGIN_FORM_DATA {
  username: string;
  password: string;
}
// 登录接口返回数据接口
export interface I_LOGIN_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: string;
}

// 定义获取用户信息接口
export interface I_USERINFO_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  }
}
