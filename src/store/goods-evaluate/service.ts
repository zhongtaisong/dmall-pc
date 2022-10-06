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

export interface IGoodsEvaluateAddService {
    /** 商品id */
    pid,
    /** 订单编号 */
    order_no,
    /** 评价内容 */
    content,
}

/**
 * 添加评价
 * @param params 
 * @returns 
 */
export const goodsEvaluateAddService = (params: IGoodsEvaluateAddService): Promise<IResponse> => {
    return axios.post("/goods-evaluate/add", params);
}

export interface IGoodsEvaluateUpdateService {
    /** 评价id */
    id,
    /** 评价内容 */
    content,
}

/**
 * 修改评价
 * @param params 
 * @returns 
 */
export const goodsEvaluateUpdateService = (params: IGoodsEvaluateUpdateService): Promise<IResponse> => {
    return axios.put("/goods-evaluate/update", params);
}
