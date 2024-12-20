import { makeAutoObservable, runInAction } from 'mobx';
import {
  adminGoodsEvaluateSelectService,
  IAdminGoodsEvaluateSelectParams,
  adminGoodsEvaluateDeleteService,
  adminGoodsSelectPidsService,
} from './service';
import { PAGE_SIZE, SUCCESS_CODE } from '@config';
import { IRecordInfo } from './type';
import {
  IGoodsEvaluateAddService,
  IGoodsEvaluateUpdateService,
} from '@store/common/type';
// mobx数据
import store from '@store';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 数据总数 */
  total = 0;

  /** 列表数据 */
  dataSource: Array<IRecordInfo> = [];

  /** 查询 - 接口入参 */
  requestParams: Partial<IAdminGoodsEvaluateSelectParams> = {
    current: 0,
    pageSize: PAGE_SIZE,
  };

  /**
   * 查询 - 评价列表
   * @param params
   */
  adminGoodsEvaluateSelectServiceFn = async (
    params?: IAdminGoodsEvaluateSelectParams,
  ) => {
    const requestParams = {
      ...this.requestParams,
      ...params,
    };

    const result = await adminGoodsEvaluateSelectService(requestParams);

    const { dataSource, total } = result?.data?.context || {};
    runInAction(() => {
      this.dataSource = dataSource || [];
      this.total = total ?? 0;
      this.requestParams = requestParams;
    });
  };

  /**
   * 添加评价 - 操作
   * @param params
   */
  goodsEvaluateAddServiceFn = async (params: IGoodsEvaluateAddService) => {
    if (!params || !Object.keys(params).length) return;

    const result = await store.commonStore.goodsEvaluateAddServiceFn(params);
    if (!result) return;

    this.adminGoodsEvaluateSelectServiceFn();
    return true;
  };

  /**
   * 修改评价 - 操作
   * @param params
   */
  goodsEvaluateUpdateServiceFn = async (
    params: IGoodsEvaluateUpdateService,
  ) => {
    if (!params || !Object.keys(params).length) return;

    const result = await store.commonStore.goodsEvaluateUpdateServiceFn(params);
    if (!result) return;

    this.adminGoodsEvaluateSelectServiceFn();
    return true;
  };

  /**
   * 删除评价 - 操作
   * @param id
   * @returns
   */
  adminGoodsEvaluateDeleteServiceFn = async (id: number) => {
    const result = await adminGoodsEvaluateDeleteService(id);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsEvaluateSelectServiceFn();
    }
  };

  /** 商品编号pid */
  pids = [];

  /**
   * 查询 - 商品编号pid - 操作
   */
  adminGoodsSelectPidsServiceFn = async () => {
    const result = await adminGoodsSelectPidsService();
    runInAction(() => {
      this.pids = result?.data?.context || [];
    });
  };
}
