import { makeAutoObservable, runInAction } from "mobx";
import {
    adminOrderSelectService, 
    IAdminOrderSelectParams,
} from './service';
import { PAGE_SIZE, } from "@config";
import { IOrderInfo } from "./type";
import store from "@store";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 数据总数 */
    total = 0;

    /** 列表数据 */
    dataSource: Array<IOrderInfo> = [];

    /** 查询商品 - 接口入参 */
    requestParams: Partial<IAdminOrderSelectParams> = {
        current: 0,
        pageSize: PAGE_SIZE,
    };

    /**
     * 查询 - 订单列表
     * @param params 
     */
    adminOrderSelectServiceFn = async (params?: IAdminOrderSelectParams) => {
        const requestParams = {
            ...this.requestParams,
            ...params,
        };

        const result = await adminOrderSelectService(requestParams);

        const { dataSource, total, } = result?.data?.content || {};
        runInAction(() => {
            this.dataSource = dataSource || [];
            this.total = total ?? 0;
            this.requestParams = requestParams;
        });
    }

    /**
     * 删除 - 订单 - 操作
     * @param id 
     * @returns 
     */
    orderDeleteServiceFn = async (id) => {
        const result = await store.commonStore.orderDeleteServiceFn(id);
        if(!result) return;

        this.adminOrderSelectServiceFn();
    }
    
};
