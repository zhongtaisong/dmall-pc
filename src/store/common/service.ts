import axios from '@axios';
import { IResponse } from '@types';
import { IBuyGoodsInfo } from './type';

export interface IPids {
    /** 商品id */
    pids: Array<number>;
}

/**
 * 加入收藏
 * @param params 
 * @param url 
 * @returns 
 */
export const goodsCollectionAddService = (params: IPids, url: string): Promise<IResponse> => {
    return axios.post(`/goods-collection/add${ url || '' }`, params);
}

/**
 * 删除收藏列表 / 取消加入收藏
 * @param params 
 * @returns 
 */
export const goodsCollectionDeleteService = (params: IPids): Promise<IResponse> => {
    return axios.put(`/goods-collection/delete`, params);
}

/**
 * 加入购物车
 * @param params 
 * @param url 
 * @returns 
 */
export const shoppingCartAddService = (goodsInfo: Array<IBuyGoodsInfo>, url: string): Promise<IResponse> => {
    return axios.post(`/shopping-cart/add${ url || '' }`, { goodsInfo, });
}

/**
 * 查询 - 已加购商品数量
 * @returns 
 */
export const shoppingCartSelectNumService = (): Promise<IResponse> => {
    return axios.get("/shopping-cart/select/num");
};
