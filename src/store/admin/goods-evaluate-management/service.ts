import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminGoodsEvaluateSelectParams {
    /** 第几页 */
    current: number;
    /** 一页几条 */
    pageSize: number;
}

/**
 * 查询 - 评价列表
 * @param params 
 * @returns 
 */
export const adminGoodsEvaluateSelectService = (params: IAdminGoodsEvaluateSelectParams): Promise<IResponse> => {
    return axios.post("/admin/goods-evaluate/select", params);
};

/**
 * 查询 - 商品编号pid
 * @returns 
 */
export const adminGoodsSelectPidsService = (): Promise<IResponse> => {
    return axios.get("/admin/goods/select/pids");
};


/**
 * 删除评价
 * @param id 
 * @returns 
 */
export const adminGoodsEvaluateDeleteService = (id: number): Promise<IResponse> => {
    return axios.delete(`/admin/goods-evaluate/delete/${ id }`);
};
