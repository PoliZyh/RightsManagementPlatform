import type { I_RESPONSE_DATA } from "@/api/type"

// 分类对象类型
export interface I_CATEGORY_OBJ {
    id: number;
    name: string;
    category1Id?: number;
    category2Id?: number;
}

// 分类接口返回数据类型
export interface I_CATEGORY_RESPONSE_DATA extends I_RESPONSE_DATA {
    data: I_CATEGORY_OBJ[];
}