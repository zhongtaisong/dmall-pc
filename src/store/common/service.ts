import axios from '@axios';
import { IResponse } from '@types';
import { commonFn, history } from '@utils';
import {
  IBuyGoodsInfo,
  IGoodsEvaluateAddService,
  IGoodsEvaluateUpdateService,
} from './type';

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
export const goodsCollectionAddService = (
  params: IPids,
  url: string,
): Promise<IResponse> => {
  return axios.post(`/goods-collection/add${url || ''}`, params);
};

/**
 * 删除收藏列表 / 取消加入收藏
 * @param params
 * @returns
 */
export const goodsCollectionDeleteService = (
  params: IPids,
): Promise<IResponse> => {
  return axios.put(`/goods-collection/delete`, params);
};

/**
 * 加入购物车
 * @param params
 * @param url
 * @returns
 */
export const shoppingCartAddService = (
  goodsInfo: Array<IBuyGoodsInfo>,
  url: string,
): Promise<IResponse> => {
  const isLogin = commonFn.isLogin();
  if (!isLogin) {
    history.push('/login');
    return;
  }

  return axios.post(`/shopping-cart/add${url || ''}`, { goodsInfo });
};

/**
 * 查询 - 收货地址
 * @returns
 */
export const selectAddressListService = (): Promise<IResponse> => {
  return axios.get('/address/select');
};

/**
 * 删除 - 订单
 * @param id
 * @returns
 */
export const orderDeleteService = (id: number | string): Promise<IResponse> => {
  return axios.delete(`/order/delete/${id}`);
};

/**
 * 添加评价
 * @param params
 * @returns
 */
export const goodsEvaluateAddService = (
  params: IGoodsEvaluateAddService,
): Promise<IResponse> => {
  return axios.post('/goods-evaluate/add', params);
};

/**
 * 修改评价
 * @param params
 * @returns
 */
export const goodsEvaluateUpdateService = (
  params: IGoodsEvaluateUpdateService,
): Promise<IResponse> => {
  return axios.put('/goods-evaluate/update', params);
};
