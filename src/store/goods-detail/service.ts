import axios from '@axios';
import { IResponse } from '@types';

export interface ISelectGoodsDetail {
    /**
     * 商品id
     */
    id: number | string;
}

/**
 * 查询 - 商品详情
 * @returns 
 */
export const goodsDetailSelectService = (params: ISelectGoodsDetail): Promise<IResponse> => {
    return axios.get(`/goods-detail/public/select/${ params?.id }`);
}

/**
 * 查询 - 商品评价
 * @returns 
 */
export const goodsEvaluateSelectService = (params: ISelectGoodsDetail): Promise<IResponse> => {
    return axios.get(`/goods-evaluate/public/select/${ params?.id }`);
}
