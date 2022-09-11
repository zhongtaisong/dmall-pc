import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import { PAGE_SIZE } from "@config";
import { 
    orderSelectService, IOrderSelectService,
    orderDeleteService,
} from './service';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 动态设置Mobx数据
     * @param params 
     * @returns 
     */
    setMobxStoreFn = (params) => {
        if(!params) return;

        // Object
        if(Object.keys(params).length) {
            const { key, value, } = params;
            if( key in this) {
                this[key] = value;
            }
        }

        // Array
        if(Array.isArray(params)) {
            params.forEach(item => {
                this.setMobxStoreFn(item);
            });
        }
        
    }

    /** 一页多少条数据 */
    pageSize = PAGE_SIZE;

    /** 数据总数 */
    total = 0;

    /** 列表数据 */
    dataSource = [];

    /** 查询商品 - 接口入参 */
    requestParams = {};

    /**
     * 查询 - 订单列表 - 操作
     * @param params 
     */
    orderSelectServiceFn = async (params?: Partial<IOrderSelectService>) => {
        const requestParams = {
            ...this.requestParams,
            pageSize: PAGE_SIZE,
            ...params,
        };
        const result = await orderSelectService(requestParams);

        const { dataSource, total } = result?.data?.content || {};
        runInAction(() => {
            this.dataSource = dataSource || [];
            this.total = total || 0;
            this.requestParams = requestParams || {};
            this.pageSize = requestParams?.pageSize || PAGE_SIZE;
        });
    }

    /**
     * 删除 - 订单
     * @param id 
     * @returns 
     */
    orderDeleteServiceFn = async (id) => {
        const res = await orderDeleteService(id);
        if(res?.data?.code === SUCCESS_CODE){
            this.orderSelectServiceFn();
        }
    }
    
};
