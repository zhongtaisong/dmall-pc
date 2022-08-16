import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

const PAGE_SIZE = 8;
class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 商品筛选所有条件
    @observable filterMap = {};
    @action setFilterMap = (data = {}) => {
        this.filterMap = data;
    }

    // 当前页
    @observable current = 0;
    @action setCurrent = (data = 0) => {
        this.current = data;
    }

    // 一页多少条数据
    @observable pageSize = PAGE_SIZE;
    @action setPageSize = (data = PAGE_SIZE) => {
        this.pageSize = data;
    }

    // 数据总数
    @observable total = PAGE_SIZE;
    @action setTotal = (data = PAGE_SIZE) => {
        this.total = data;
    }

    // 列表 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    /**
     * 查询商品 - 接口入参
     */
    @observable requestParams = {};
    @action setRequestParams = (data = {}) => {
        this.requestParams = data;
    }

    /**
     * 查询 - 商品列表
     * @param params 
     */
    selectGoodsListFn = async (params = {}) => {
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
        const res = await service.selectGoodsList(requestParams);

        if(res?.data?.code === SUCCESS_CODE){
            const { dataSource, total } = res?.data?.content || {};

            this.setDataSource(dataSource);
            this.setTotal(total);
            this.setRequestParams(requestParams);
            this.setCurrent(requestParams?.current);
            this.setPageSize(requestParams?.pageSize);
        }
    }

    /**
     * 查询 - 商品过滤条件
     */
    selectGoodsListfilterParamsFn = async () => {
        const res = await service.selectGoodsListfilterParams();

        if(res?.data?.code === SUCCESS_CODE){
            this.setFilterMap(res?.data?.content || {});
        }
    }

}

export default new State();