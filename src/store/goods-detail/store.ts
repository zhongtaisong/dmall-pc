import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import { 
    ISelectGoodsDetail, 
    goodsDetailSelectService, 
    goodsEvaluateSelectService,
    goodsCollectionAddService,
    goodsCollectionSelectPidsService,
    goodsCollectionDeleteService,
} from './service';
import { IGoodsInfo } from './type';
// mobx数据
import store from '@store';
import { IBuyGoodsInfo } from "@store/common/type";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 初始化 - 操作
     * @param id 
     */
    init = (id: number) => {
        this.goodsDetailSelectServiceFn(id);
        this.goodsCollectionSelectPidsServiceFn([id]);
    }

    /** 商品信息 */
    goodsInfo: IGoodsInfo = {};

    /** 商品评价列表 */
    evaluationList = [];

    /**
     * 查询 - 商品详情 - 操作
     * @param id 
     * @returns 
     */
    goodsDetailSelectServiceFn = async (id: number) => {
        if(!id || typeof id !== 'number') return;

        const result = await goodsDetailSelectService({ id, });
        runInAction(() => {
            this.goodsInfo = result?.data?.content || {};
        });
    }

    /**
     * 查询 - 商品评价 - 操作
     * @param params 
     * @returns 
     */
    goodsEvaluateSelectServiceFn = async (params: ISelectGoodsDetail) => {
        if(!params || !Object.keys(params).length) return;

        const result = await goodsEvaluateSelectService(params);
        runInAction(() => {
            this.evaluationList = result?.data?.content || [];
        });
    }

    /** 是否已“加入收藏” */
    isGoodsCollection = false;

    /**
     * 根据pid查询是否被“加入收藏” - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionSelectPidsServiceFn = async (pids: Array<number>) => {
        if(!Array.isArray(pids) || !pids.length) return;

        const result = await goodsCollectionSelectPidsService({ pids, });
        runInAction(() => {
            this.isGoodsCollection = Boolean(Array.isArray(result?.data?.content) && result?.data?.content?.length);
        });
    }

    /**
     * 加入收藏 - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionAddServiceFn = async (pids: Array<number>) => {
        const result = await store.commonStore.goodsCollectionAddServiceFn(pids);
        if(!result) return;
        
        runInAction(() => {
            this.isGoodsCollection = true;
        });
    }

    /**
     * 取消加入收藏 - 操作
     * @param pids 
     * @returns 
     */
    goodsCollectionDeleteServiceFn = async (pids: Array<number>) => {
        if(!Array.isArray(pids) || !pids.length) return;

        const result = await goodsCollectionDeleteService({ pids, });
        if(result?.data?.code === SUCCESS_CODE) {
            runInAction(() => {
                this.isGoodsCollection = false;
            });
        }
    }

    /**
     * 加入购物车 - 操作
     * @param goodsInfo 
     * @returns 
     */
    shoppingCartAddServiceFn = async (goodsInfo: Array<IBuyGoodsInfo>, callBack?: Function) => {
        const result = await store.commonStore.shoppingCartAddServiceFn(goodsInfo);
        if(!result) return;

        callBack?.();
    }
    
};
