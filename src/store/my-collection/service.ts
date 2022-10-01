import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 收藏列表
 * @returns 
 */
export const goodsCollectionSelectService = (): Promise<IResponse> => {
    return axios.get("/goods-collection/select");
}
