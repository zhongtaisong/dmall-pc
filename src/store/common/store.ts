import { SUCCESS_CODE } from '@config';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  goodsCollectionAddService,
  goodsCollectionDeleteService,
  selectAddressListService,
  orderDeleteService,
  goodsEvaluateAddService,
  goodsEvaluateUpdateService,
} from './service';
import {
  IBuyGoodsInfo,
  IGoodsEvaluateAddService,
  IGoodsEvaluateUpdateService,
} from './type';

/**
 * 公共Store
 */
export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 加入收藏 - 操作
   * @param pids
   * @param url
   * @returns
   */
  goodsCollectionAddServiceFn = async (
    pids: Array<number>,
    url?: string,
  ): Promise<Boolean> => {
    if (!Array.isArray(pids) || !pids.length) return false;

    const result = await goodsCollectionAddService({ pids }, url);
    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 删除收藏列表 / 取消加入收藏 - 操作
   * @param pids
   * @returns
   */
  goodsCollectionDeleteServiceFn = async (
    pids: Array<number>,
  ): Promise<Boolean> => {
    if (!Array.isArray(pids) || !pids.length) return;

    const result = await goodsCollectionDeleteService({ pids });
    return result?.data?.code === SUCCESS_CODE;
  };

  /** 购物车已加购数量 */
  shoppingCartNum = 0;

  /**
   * 查询 - 收货地址 - 操作
   */
  selectAddressListServiceFn = async () => {
    const result = await selectAddressListService();
    return result?.data?.context || [];
  };

  /**
   * 删除 - 订单 - 操作
   * @param id
   * @returns
   */
  orderDeleteServiceFn = async (id) => {
    const result = await orderDeleteService(id);
    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 添加评价 - 操作
   * @param params
   */
  goodsEvaluateAddServiceFn = async (params: IGoodsEvaluateAddService) => {
    if (!params || !Object.keys(params).length) return false;

    const result = await goodsEvaluateAddService(params);
    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 修改评价 - 操作
   * @param params
   */
  goodsEvaluateUpdateServiceFn = async (
    params: IGoodsEvaluateUpdateService,
  ) => {
    if (!params || !Object.keys(params).length) return false;

    const result = await goodsEvaluateUpdateService(params);
    return result?.data?.code === SUCCESS_CODE;
  };
}
