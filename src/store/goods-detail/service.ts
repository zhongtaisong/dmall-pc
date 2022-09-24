import axios from '@axios';
import { IResponse } from '@types';
import { commonFn, } from '@utils';

export interface ISelectGoodsDetail {
    /**
     * 商品id
     */
    id: number;
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

export interface IGoodsCollection {
    /** 商品id */
    pids: Array<number>;
}

/**
 * 根据pid查询是否被“加入收藏”
 * @param params 
 * @returns 
 */
export const goodsCollectionSelectPidsService = (params: IGoodsCollection): Promise<IResponse> => {
    const isLogin = commonFn.isLogin();
    if(!isLogin) return;
    
    return axios.post("/goods-collection/select/pids", params);
}

/**
 * 加入收藏
 * @param params 
 * @returns 
 */
export const goodsCollectionAddService = (params: IGoodsCollection): Promise<IResponse> => {
    return axios.post("/goods-collection/add", params);
}

/**
 * 取消加入收藏
 * @param params 
 * @returns 
 */
export const goodsCollectionDeleteService = (params: IGoodsCollection): Promise<IResponse> => {
    return axios.put(`/goods-collection/delete`, params);
}
