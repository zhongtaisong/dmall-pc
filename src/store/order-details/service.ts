import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 订单详情
 * @param ordernum 
 * @returns 
 */
export const orderSelectDetailService = (ordernum: string): Promise<IResponse> => {
    return axios.get(`order/select/${ ordernum }`);
}
