import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction, } from "mobx";
import lodash from 'lodash';
import { 
    shoppingCartSelectService, 
    shoppingCartDeleteService,
    shoppingCartUpdateNumService,
    IShoppingCartUpdateNum,
} from './service';
import { IShoppingCartInfo } from "./type";
// mobx数据
import store from '@store';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 列表数据 */
    dataSource:  Array<IShoppingCartInfo> = [];
    /** 加购商品总数量 */
    totalNum = 0;

    /**
     * 查询 - 购物车列表 - 操作
     */
    shoppingCartSelectServiceFn = async () => {
        const result = await shoppingCartSelectService();
        const { dataSource, totalNum, } = result?.data?.content || {};
        runInAction(() => {
            this.dataSource = dataSource || [];
            this.totalNum = totalNum ?? 0;
        });
    }

    /** 选中行id */
    selectedRowKeys: Array<number> = [];

    /** 选中行数据 */
    selectedRows: Array<IShoppingCartInfo> = [];

    /** 商品购买总价 */
    buyTotalPrice = 0;

    /**
     * 监听 - 行变化
     * @param keys 
     * @param rows 
     */
    onRowSelectionChange = (keys = [], rows: Array<IShoppingCartInfo>) => {
        this.selectedRowKeys = keys;
        this.selectedRows = rows;

        if(Array.isArray(rows)) {
            this.buyTotalPrice = rows.reduce((total, item) => {
                return total += (item?.goodsInfo?.price ?? 0);
            }, 0);
        }else {
            this.buyTotalPrice = 0;
        }
    }

    /**
     * 公共回调函数
     * @param pids 
     * @returns 
     */
    commonCallBack = (pids: Array<number>) => {
        const selectedRowKeys = this.selectedRowKeys.filter(item => !pids.includes(item));
        const selectedRows = this.selectedRows.filter(item => !pids.includes(item?.pid));
        this.onRowSelectionChange(selectedRowKeys, selectedRows);
        this.shoppingCartSelectServiceFn();
        store.commonStore.shoppingCartSelectNumServiceFn();
    }

    /**
     * 删除 - 购物车列表 - 操作
     * @param pids 
     * @returns 
     */
    shoppingCartDeleteServiceFn = async (pids: Array<number>) => {
        if(!Array.isArray(pids) || !pids.length) return;

        const result = await shoppingCartDeleteService({ pids, });
        if(result?.data?.code === SUCCESS_CODE) {
            this.commonCallBack(pids);
        }
    }

    /**
     * 加入收藏 - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionAddServiceFn = async (pids: Array<number>) => {
        const result = await store.commonStore.goodsCollectionAddServiceFn(pids, '/shopping-cart');
        if(!result) return;
        
        this.commonCallBack(pids);
    }

    /**
     * 更新 - 已加购商品数量 - 操作
     * @param params 
     * @returns 
     */
    shoppingCartUpdateNumServiceFn = async (params: IShoppingCartUpdateNum) => {
        if(!params || !Object.keys(params).length) return;

        const result = await shoppingCartUpdateNumService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            store.commonStore.shoppingCartSelectNumServiceFn()
        }
    }

    /**
     * 监听 - InputNumber变化
     * @param val 
     * @param index 
     */
    onInputNumberChange = (val: number, index: number) => {
        if(!val) return;
        const val_new = Math.round(val);

        const dataSource = lodash.cloneDeep(this.dataSource);
        const dataSourceItem = dataSource?.[index];
        if(!dataSourceItem || !Object.keys(dataSourceItem).length) return;

        const { num, pid, } = dataSourceItem;
        if(num === val_new) return;
        dataSource[index]['num'] = val_new;
        this.dataSource = dataSource;
        this.shoppingCartUpdateNumServiceFn({
            pid,
            num: val_new,
        });
    }
    
};
