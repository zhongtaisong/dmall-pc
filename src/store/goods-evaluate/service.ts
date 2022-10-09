import axios from '@axios';
import { IResponse } from '@types';

/**
 * 根据订单编号查询商品评价列表
 * @param order_no 
 * @returns 
 */
export const goodsEvaluateSelectService = (order_no: string): Promise<IResponse> => {
    return axios.get(`/goods-evaluate/select/${ order_no }`);
}
