import type { RouteRecordRaw } from 'vue-router'

export interface I_USER_STATE {
  token: string;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface I_SETTING_STATE {
  fold: boolean;
  refresh: boolean;
}
