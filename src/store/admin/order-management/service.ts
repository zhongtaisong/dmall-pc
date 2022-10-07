import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminOrderSelectParams {
    /** 第几页 */
    current: number;
    /** 一页几条 */
    pageSize: number;
}

/**
 * 查询 - 订单列表
 * @param params 
 * @returns 
 */
export const adminOrderSelectService = (params: IAdminOrderSelectParams): Promise<IResponse> => {
    return axios.post("/admin/order/select", params);
};
