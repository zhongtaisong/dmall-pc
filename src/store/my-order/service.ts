import axios from '@axios';
import { IResponse } from '@types';

export interface IOrderSelectService {
    /** 第几页 */
    current?: number;
    /** 一页几条 */
    pageSize?: number;
}

/**
 * 查询 - 订单列表
 * @param params 
 * @returns 
 */
export const orderSelectService = (params: IOrderSelectService): Promise<IResponse> => {
    return axios.post("/order/select", params);
}
