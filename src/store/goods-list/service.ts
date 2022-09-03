import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 商品列表
 * @param params 
 * @returns 
 */
export const goodsListSelectService = (params = {}): Promise<IResponse> => {
    return axios.post("/goods-list/public/select", params);
};

/**
 * 查询 - 商品过滤条件
 * @param params 
 * @returns 
 */
export const goodsListSelectFilterService = (): Promise<IResponse> => {
    return axios.get("/goods-list/public/select/filter");
};
