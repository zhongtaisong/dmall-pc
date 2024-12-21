import { makeAutoObservable, runInAction } from 'mobx';
import { goodsListSelectService } from './service';
// mobx数据
import store from '@store';
import { IBuyGoodsInfo } from '@store/common/type';
import { PAGE_SIZE } from '@config';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 数据总数 */
  total = 0;

  /** 列表数据 */
  dataSource = [];

  /** 查询 - 接口入参 */
  requestParams = {
    pageNum: 0,
    pageSize: PAGE_SIZE,
  };

  /**
   * 查询 - 商品列表
   * @param params
   */
  goodsListSelectServiceFn = async (params = {}) => {
    const params_new = {
      ...this.requestParams,
      ...params,
    };
    const result = await goodsListSelectService(params_new);

    const { content, total } = result?.data?.context || {};
    runInAction(() => {
      this.dataSource = content || [];
      this.total = total || 0;
      this.requestParams = params_new;
    });
  };
}
