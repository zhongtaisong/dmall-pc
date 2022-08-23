import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
import { selectGoodsDetail, ISelectGoodsDetail, selectGoodsEvaluate, } from './service';
import { IGoodsInfo } from './type';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 商品信息
    @observable goodsInfo: IGoodsInfo = {};
    @action setGoodsInfo = (data = {}) => {
        this.goodsInfo = data;
    }

    /**
     * 查询 - 商品详情 - 操作
     * @param params 
     * @returns 
     */
    selectGoodsDetailFn = async (params: ISelectGoodsDetail) => {
        if(!params || !Object.keys(params).length) return;

        const res = await selectGoodsDetail(params);
        if(res?.data?.code === SUCCESS_CODE ){
            this.setGoodsInfo(res?.data?.content || {});
        }
    }

    // 商品评价列表
    @observable evaluationList = [];
    @action setEvaluationList = (data = []) => {
        this.evaluationList = data;
    }

    /**
     * 查询 - 商品评价 - 操作
     * @param params 
     * @returns 
     */
    selectGoodsEvaluateFn = async (params: ISelectGoodsDetail) => {
        if(!params || !Object.keys(params).length) return;

        const res = await selectGoodsEvaluate(params);
        if(res?.data?.code === SUCCESS_CODE ){
            this.setEvaluationList(res?.data?.content || []);
        }
    }

}

export default new State();