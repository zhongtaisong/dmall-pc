import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 订单详情
 * @param order_no 
 * @returns 
 */
export const orderSelectDetailService = (order_no: string): Promise<IResponse> => {
    return axios.get(`order/select/${ order_no }`);
}
