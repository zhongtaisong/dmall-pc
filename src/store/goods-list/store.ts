import { makeAutoObservable, runInAction } from "mobx";
import { goodsListSelectService, goodsListSelectFilterService } from './service';
// mobx数据
import store from '@store';
import { IBuyGoodsInfo } from "@store/common/type";

const PAGE_SIZE = 8;
export default class Store {

    constructor() {
        makeAutoObservable(this);
    }
    
    /** 商品筛选所有条件 */
    filterMap = {};

    /** 当前页 */
    current = 0;

    /** 一页多少条数据 */
    pageSize = PAGE_SIZE;

    /** 数据总数 */
    total = 0;

    /** 列表数据 */
    dataSource = [];

    /** 查询商品 - 接口入参 */
    requestParams = {};

    /**
     * 查询 - 商品列表
     * @param params 
     */
    goodsListSelectServiceFn = async (params = {}) => {
        const requestParams: {
            current?: number;
            filterParams?: {
                [key: string]: string | number;
            };
            pageSize?: number;
        } = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const result = await goodsListSelectService(requestParams);

        const { dataSource, total } = result?.data?.content || {};
        runInAction(() => {
            this.dataSource = dataSource || [];
            this.total = total || 0;
            this.requestParams = requestParams || {};
            this.current = requestParams?.current || 0;
            this.pageSize = requestParams?.pageSize || PAGE_SIZE;
        });
    }

    /**
     * 查询 - 商品过滤条件
     */
    goodsListSelectFilterServiceFn = async () => {
        const result = await goodsListSelectFilterService();
        runInAction(() => {
            this.filterMap = result?.data?.content || {};
        });
    }

    /**
     * 加入购物车 - 操作
     * @param goodsInfo 
     * @returns 
     */
    shoppingCartAddServiceFn = async (goodsInfo: Array<IBuyGoodsInfo>) => {
        store.commonStore.shoppingCartAddServiceFn(goodsInfo);
    }
    
};
