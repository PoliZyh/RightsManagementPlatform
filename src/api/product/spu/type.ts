import { I_RESPONSE_DATA } from '@/api/type'

import { I_TRADEMARK_RECORDS } from '../trademark/type'

// SPU列表接口
export interface I_SPU_OBJ {
  id?: number
  spuName: string
  description: string
  category3Id: number | null
  tmId: number | null // 品牌的ID
  spuSaleAttrList: null | I_SALE_ATTR_LIST //spu销售属性
  spuImageList: null | I_SPU_IMAGE_LIST //spu照片墙
}
export type I_SPU_LIST = I_SPU_OBJ[]
export interface I_SPU_LIST_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: {
    records: I_SPU_LIST
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 品牌数据的类型
export interface I_ALL_TRADEMARK_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: I_TRADEMARK_RECORDS
}

// 商品图片墙的数据类型
export interface I_SPU_IMAGE {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export type I_SPU_IMAGE_LIST = I_SPU_IMAGE[]
export interface I_SPU_IMGAGE_LIST_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: I_SPU_IMAGE_LIST
}

// 已有SPU销售属性部分
export interface I_SALE_ATTR_VALUE {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
export type I_SALE_ATTR_VALUE_LIST = I_SALE_ATTR_VALUE[]
export interface I_SALE_ATTR {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: I_SALE_ATTR_VALUE_LIST
  flag?: boolean
  saleAttrValue?: string;
  saleIdAndValueId?: string;
}
export type I_SALE_ATTR_LIST = I_SALE_ATTR[]
export interface I_SALE_ATTR_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: I_SALE_ATTR_LIST
}

// 已有全部SPU返回数据的类型
export interface I_ALL_SALE_ATTR {
  id: number
  name: string
}
export type I_ALL_SALE_ATTR_LIST = I_ALL_SALE_ATTR[]
export interface I_ALL_SALE_ATTR_RESPONSE_DATA {
  data: I_ALL_SALE_ATTR_LIST
}



export interface I_SKU_ATTR_VALUE_ITEM {
  attrId: number | null;
  valueId: number | null;
}
export interface I_SKU_SALE_ATTR_VALUE_ITEM {
  saleAttrId: number | null;
  saleAttrValueId: number | null;
}
export interface I_SKU_DATA {
  category3Id: number | null;
  spuId: number | null;
  tmId: number | null;
  skuName: string;
  price: number | null;
  weight: number | null;
  skuDesc: string;
  skuAttrValueList: Array<I_SKU_ATTR_VALUE_ITEM>;
  skuSaleAttrValueList: Array<I_SKU_ATTR_VALUE_ITEM>;
  skuDefaultImg: string;
}


export interface I_SKU_INFO_RESPONSE_DATA extends I_RESPONSE_DATA {
  data: I_SKU_DATA[];
}
