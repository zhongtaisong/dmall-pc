import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 商品列表
 * @param params
 * @returns
 */
export const goodsListSelectService = (params = {}): Promise<IResponse> => {
  return axios.post('/goods/public/list?msg=false', params);
};
