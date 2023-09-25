import type { RouteRecordRaw } from 'vue-router'
import type { I_CATEGORY_OBJ } from '@/api/product/attr/type'

export interface I_USER_STATE {
  token: string
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface I_SETTING_STATE {
  fold: boolean
  refresh: boolean
}

export interface I_CATEGORY_STATE {
  c1Arr: I_CATEGORY_OBJ[]
  c1Id: number | null
  c2Arr: I_CATEGORY_OBJ[]
  c2Id: number | null
  c3Arr: I_CATEGORY_OBJ[]
  c3Id: number | null
}
