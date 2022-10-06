import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction, } from "mobx";
import {
    goodsCollectionAddService,
    shoppingCartSelectNumService,
    shoppingCartAddService,
    goodsCollectionDeleteService,
    selectAddressListService,
} from './service';
import { IBuyGoodsInfo } from "./type";

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
    goodsCollectionAddServiceFn = async (pids: Array<number>, url?: string): Promise<Boolean> => {
        if(!Array.isArray(pids) || !pids.length) return false;

        const result = await goodsCollectionAddService({ pids, }, url);
        return result?.data?.code === SUCCESS_CODE;
    }

    /**
     * 删除收藏列表 / 取消加入收藏 - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionDeleteServiceFn = async (pids: Array<number>): Promise<Boolean> => {
        if(!Array.isArray(pids) || !pids.length) return;

        const result = await goodsCollectionDeleteService({ pids, });
        return result?.data?.code === SUCCESS_CODE;
    }

    /**
     * 加入购物车 - 操作
     * @param goodsInfo 
     * @param url 
     * @returns 
     */
    shoppingCartAddServiceFn = async (goodsInfo: Array<IBuyGoodsInfo>, url?: string): Promise<Boolean> => {
        if(!Array.isArray(goodsInfo) || !goodsInfo.length) return false;

        const result = await shoppingCartAddService(goodsInfo, url);

        this.shoppingCartSelectNumServiceFn();
        return result?.data?.code === SUCCESS_CODE;
    }

    /** 购物车已加购数量 */
    shoppingCartNum = 0;

    /**
     * 查询 - 已加购商品数量 - 操作
     */
    shoppingCartSelectNumServiceFn = async () => {
        const result = await shoppingCartSelectNumService();
        runInAction(() => {
            this.shoppingCartNum = result?.data?.content ?? 0;
        })
    };

    /**
     * 查询 - 收货地址 - 操作
     */
    selectAddressListServiceFn = async () => {
        const result = await selectAddressListService();
        return result?.data?.content || [];
    }
    
};
