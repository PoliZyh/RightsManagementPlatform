import type { I_RESPONSE_DATA } from "../../type"

// 已有品牌数据类型
export interface I_TRADEMARK {
    id?: number;
    tmName: string;
    logoUrl: string;
}
export type I_TRADEMARK_RECORDS = I_TRADEMARK[]
export interface I_TRADEMARK_RESPONSE_DATA extends I_RESPONSE_DATA {
    data: {
        records: I_TRADEMARK_RECORDS;
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    }
}

// LOGO图片上传服务器响应的数据类型
export interface I_UPLOAD_LOGO_RESPONSE_DATA extends I_RESPONSE_DATA {
    data: string;
}

