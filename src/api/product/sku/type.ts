import { I_RESPONSE_DATA } from "@/api/type";
import { I_SKU_DATA, I_SKU_ATTR_VALUE_ITEM, I_SKU_SALE_ATTR_VALUE_ITEM } from "../spu/type";

// 获取SKU接口返回的数据类型
export interface I_SKU_LIST_RESPONSE_DATA extends I_RESPONSE_DATA {
    data: {
        records: I_SKU_DATA[];
        total: number;
        size: number;
        current: number;
        orders: [];
        optimizeCountSql: boolean;
        hitCount: boolean;
        countId: null;
        maxLimit: null;
        searchCount: number;
        pages: number;
    }
} 

// 获取sku商品详细信息的接口类型
export interface I_SKU_INFO_RESPONSE_DATA extends I_RESPONSE_DATA {
    data: I_SKU_DATA;
}