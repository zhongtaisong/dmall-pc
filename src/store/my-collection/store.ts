import { makeAutoObservable, runInAction } from "mobx";
import { 
    goodsCollectionSelectService,
} from './service';
// mobx数据
import store from '@store';
import { IBuyGoodsInfo } from "@store/common/type";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 列表数据 */
    dataSource = [];

    /**
     * 查询 - 收藏列表 - 操作
     */
    goodsCollectionSelectServiceFn = async () => {
        const result = await goodsCollectionSelectService();
        runInAction(() => {
            this.dataSource = result?.data?.content || [];
        });
    }

    /** 选中行id */
    selectedRowKeys: Array<number> = [];

    /**
     * 监听 - 行变化
     * @param keys 
     */
    onRowSelectionChange = (keys = []) => {
        this.selectedRowKeys = keys;
    }

    /**
     * 公共回调函数
     * @param pids 
     * @returns 
     */
    commonCallBack = (pids: Array<number>) => {
        const selectedRowKeys = this.selectedRowKeys.filter(item => !pids.includes(item));
        this.onRowSelectionChange(selectedRowKeys);
        this.goodsCollectionSelectServiceFn();
    }

    /**
     * 删除 - 收藏列表 - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionDeleteServiceFn = async (pids: Array<number>) => {
        const result = await store.commonStore.goodsCollectionDeleteServiceFn(pids);
        if(!result) return;

        this.commonCallBack(pids);
    }

    /**
     * 加入购物车 - 操作
     * @param goodsInfo 
     * @returns 
     */
    shoppingCartAddServiceFn = async (goodsInfo: Array<IBuyGoodsInfo>) => {
        const result = await store.commonStore.shoppingCartAddServiceFn(goodsInfo, '/goods-collection');
        if(!result) return;
        
        const pids = goodsInfo.map(item => item?.pid) || [];
        this.commonCallBack(pids);
    }
    
};
