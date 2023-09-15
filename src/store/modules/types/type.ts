import type { RouteRecordRaw } from "vue-router";

export interface I_USER_STATE {
    token: string;
    menuRoutes: RouteRecordRaw[];
}