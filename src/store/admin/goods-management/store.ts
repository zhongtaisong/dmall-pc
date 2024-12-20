import { makeAutoObservable, runInAction } from 'mobx';
import {
  adminGoodsSelectService,
  IAdminGoodsSelectParams,
  adminGoodsAddService,
  adminGoodsUpdateService,
  adminGoodsDeleteService,
  adminBrandsSelectAllService,
  IAdminGoodsUpdateStatusService,
  adminGoodsUpdateStatusService,
  adminGoodsUpdateRecommendService,
} from './service';
import { PAGE_SIZE, SUCCESS_CODE } from '@config';
import { IGoodsInfo } from './type';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 数据总数 */
  total = 0;

  /** 列表数据 */
  dataSource: Array<IGoodsInfo> = [];

  /** 查询 - 接口入参 */
  requestParams: Partial<IAdminGoodsSelectParams> = {
    current: 0,
    pageSize: PAGE_SIZE,
  };

  /**
   * 查询 - 商品列表
   * @param params
   */
  adminGoodsSelectServiceFn = async (params?: IAdminGoodsSelectParams) => {
    const requestParams = {
      ...this.requestParams,
      ...params,
    };

    const result = await adminGoodsSelectService(requestParams);

    const { dataSource, total } = result?.data?.context || {};
    if (Array.isArray(dataSource)) {
      dataSource.forEach((item) => {
        const banner_picture = item?.['banner_picture'];
        item['banner_picture'] = banner_picture
          ? [
              {
                uid: Date.now(),
                name: 'image.png',
                status: 'done',
                url: banner_picture,
              },
            ]
          : [];

        const main_picture = item?.['main_picture'];
        item['main_picture'] = main_picture
          ? [
              {
                uid: Date.now(),
                name: 'image.png',
                status: 'done',
                url: main_picture,
              },
            ]
          : [];

        const goods_picture = item?.['goods_picture'];
        if (Array.isArray(goods_picture)) {
          item['goods_picture'] = goods_picture
            .filter((item02) => item02)
            .map((item03, index) => {
              return {
                uid: Date.now() + index,
                name: 'image.png',
                status: 'done',
                url: item03,
              };
            });
        } else {
          item['goods_picture'] = [];
        }

        const detail_picture = item?.['detail_picture'];
        if (Array.isArray(detail_picture)) {
          item['detail_picture'] = detail_picture
            .filter((item02) => item02)
            .map((item03, index) => {
              return {
                uid: Date.now() + index,
                name: 'image.png',
                status: 'done',
                url: item03,
              };
            });
        } else {
          item['detail_picture'] = [];
        }
      });
    }

    runInAction(() => {
      this.dataSource = dataSource || [];
      this.total = total ?? 0;
      this.requestParams = requestParams;
    });
  };

  /**
   * 添加商品 - 操作
   * @param params
   */
  adminGoodsAddServiceFn = async (params: FormData) => {
    const result = await adminGoodsAddService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsSelectServiceFn();
    }

    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 更新商品 - 操作
   * @param params
   */
  adminGoodsUpdateServiceFn = async (params: FormData) => {
    const result = await adminGoodsUpdateService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsSelectServiceFn();
    }

    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 删除商品 - 操作
   * @param brand_id
   * @returns
   */
  adminGoodsDeleteServiceFn = async (brand_id: number) => {
    const result = await adminGoodsDeleteService(brand_id);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsSelectServiceFn();
    }
  };

  /** 品牌数据 */
  brandsDataSource: Array<{
    /** 品牌id */
    brand_id: number;
    /** 品牌名称 */
    brand_name: string;
  }> = [];

  /**
   * 查询 - 所有品牌 - 操作
   */
  adminBrandsSelectAllServiceFn = async () => {
    const result = await adminBrandsSelectAllService();

    const { dataSource } = result?.data?.context || {};
    runInAction(() => {
      this.brandsDataSource = dataSource || [];
    });
  };

  /**
   * 上下架 - 操作
   * @param params
   */
  adminGoodsUpdateStatusServiceFn = async (
    params: IAdminGoodsUpdateStatusService,
  ) => {
    const result = await adminGoodsUpdateStatusService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsSelectServiceFn();
    }
  };

  /**
   * 推广商品 - 操作
   * @param params
   */
  adminGoodsUpdateRecommendServiceFn = async (params: FormData) => {
    const result = await adminGoodsUpdateRecommendService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminGoodsSelectServiceFn();
    }

    return result?.data?.code === SUCCESS_CODE;
  };
}
