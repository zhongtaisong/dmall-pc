import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 购物车列表
 * @returns 
 */
export const shoppingCartSelectService = (): Promise<IResponse> => {
    return axios.get("/shopping-cart/select");
}

export interface IShoppingCart {
    /** 商品id */
    pids: Array<number>;
}

/**
 * 删除 - 购物车列表
 * @param params 
 * @returns 
 */
export const shoppingCartDeleteService = (params: IShoppingCart): Promise<IResponse> => {
    return axios.put(`/shopping-cart/delete`, params);
}

export interface IShoppingCartUpdateNum {
    /** 商品id */
    pid: number;
    /** 加购数量 */
    num: number;
}

/**
 * 更新 - 已加购商品数量
 * @param params 
 * @returns 
 */
export const shoppingCartUpdateNumService = (params: IShoppingCartUpdateNum): Promise<IResponse> => {
    return axios.patch(`/shopping-cart/update/num`, params);
}
