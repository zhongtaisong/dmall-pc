import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminBrandsSelectParams {
    /** 第几页 */
    current: number;
    /** 一页几条 */
    pageSize: number;
}

/**
 * 查询 - 品牌列表
 * @param params 
 * @returns 
 */
export const adminBrandsSelectService = (params: IAdminBrandsSelectParams): Promise<IResponse> => {
    return axios.post("/admin/brands/select", params);
};

/**
 * 添加品牌
 * @param params 
 * @returns 
 */
export const adminBrandsAddService = (params: {
    /** 品牌名称 */
    brand_name: string;
}): Promise<IResponse> => {
    return axios.post("/admin/brands/add", params);
};

export interface IAdminBrandsUpateParams {
    /** 品牌id */
    brand_id: number;
    /** 品牌名称 */
    brand_name: string;
}

/**
 * 更新品牌
 * @param params 
 * @returns 
 */
export const adminBrandsUpdateService = (params: IAdminBrandsUpateParams): Promise<IResponse> => {
    return axios.put("/admin/brands/update", params);
};

/**
 * 删除品牌
 * @param brand_id 
 * @returns 
 */
export const adminBrandsDeleteService = (brand_id: number): Promise<IResponse> => {
    return axios.delete(`/admin/brands/delete/${ brand_id }`);
};
