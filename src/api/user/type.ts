// 登录接口需要携带参数ts类型
export interface I_LOGIN_FORM {
  username: string;
  password: string;
}
interface I_LOGIN_DATA_TYPE {
  token?: string;
  message?: string;
}

// 登录接口返回数据类型
export interface I_LOGIN_RESPONSE_DATA {
  code: number;
  data: I_LOGIN_DATA_TYPE;
}

// 用户信息接口部分
interface I_USER_INFO {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface I_USER_DATA_TYPE {
  checkUser: I_USER_INFO;
}
export interface I_USE_RESPONSE_DATA {
  code: number;
  data: I_USER_DATA_TYPE;
}
