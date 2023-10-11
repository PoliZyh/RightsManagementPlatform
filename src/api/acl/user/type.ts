import type { I_RESPONSE_DATA } from '@/api/type'

// 用户账号信息
export interface I_USER_OBJ {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: string
  roleName?: string
}
export interface I_GET_USER_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: {
    records: Array<I_USER_OBJ>
    total: number
    size: number
    current: number
    pages: number
  }
}
