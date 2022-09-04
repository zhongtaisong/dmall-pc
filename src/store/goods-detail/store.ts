import { makeAutoObservable, runInAction } from "mobx";
import { ISelectGoodsDetail, goodsDetailSelectService, goodsEvaluateSelectService } from './service';
import { IGoodsInfo } from './type';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 商品信息 */
    goodsInfo: IGoodsInfo = {};

    /** 商品评价列表 */
    evaluationList = [];

    /**
     * 查询 - 商品详情 - 操作
     * @param params 
     * @returns 
     */
    goodsDetailSelectServiceFn = async (params: ISelectGoodsDetail) => {
        if(!params || !Object.keys(params).length) return;

        const result = await goodsDetailSelectService(params);
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
    
};
