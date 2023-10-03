import type { I_RESPONSE_DATA } from '@/api/type'

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

// 属性和属性值数据返回类型
// 已有属性值类型
export interface I_ATTR_VALUE_OBJ {
  id?: number;
  valueName: string;
  atrrId?: number;
  flag?: boolean;
}
export type I_ATTR_VALUE_LIST = I_ATTR_VALUE_OBJ[]
// 已有属性类型
export interface I_ATTR_OBJ {
  id?: number;
  attrName: string;
  categoryId: number | null;
  categoryLevel: number;
  attrValueList: I_ATTR_VALUE_LIST;
  attrIdAndValueId?: string;
}
export type I_ATTR_LIST = I_ATTR_OBJ[]
// 接口返回类型
export interface I_GET_ATTR_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: I_ATTR_LIST;
}
