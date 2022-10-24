import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminGoodsSelectParams {
    /** 第几页 */
    current: number;
    /** 一页几条 */
    pageSize: number;
}

/**
 * 查询 - 商品列表
 * @param params 
 * @returns 
 */
export const adminGoodsSelectService = (params: IAdminGoodsSelectParams): Promise<IResponse> => {
    return axios.post("/admin/goods/select", params);
};

/**
 * 添加商品
 * @param params 
 * @returns 
 */
export const adminGoodsAddService = (params: FormData): Promise<IResponse> => {
    return axios.post("/admin/goods/add", params);
};

/**
 * 更新商品
 * @param params 
 * @returns 
 */
export const adminGoodsUpdateService = (params: FormData): Promise<IResponse> => {
    return axios.put("/admin/goods/update", params);
};

/**
 * 删除商品
 * @param id 
 * @returns 
 */
export const adminGoodsDeleteService = (id: number): Promise<IResponse> => {
    return axios.delete(`/admin/goods/delete/${ id }`);
};

/**
 * 查询 - 所有品牌
 * @returns 
 */
export const adminBrandsSelectAllService = (): Promise<IResponse> => {
    return axios.get("/admin/brands/select/all");
};

export interface IAdminGoodsUpdateStatusService {
    id: number;
    /** 商品状态 */
    status: 0 | 1;
}

/**
 * 上下架
 * @param id 
 * @param params 
 * @returns 
 */
export const adminGoodsUpdateStatusService = (params: IAdminGoodsUpdateStatusService): Promise<IResponse> => {
    return axios.patch("/admin/goods/update/status", params);
};

/**
 * 推广商品
 * @param params 
 * @returns 
 */
export const adminGoodsUpdateRecommendService = (params: FormData): Promise<IResponse> => {
    return axios.patch("/admin/goods/update/recommend", params);
};
