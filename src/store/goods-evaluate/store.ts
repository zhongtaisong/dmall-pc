import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import { 
    goodsEvaluateSelectService, 
} from './service';
import { IGoodsEvaluateAddService, IGoodsEvaluateUpdateService } from "@store/common/type";
// mobx数据
import store from '@store';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 商品列表 */
    dataSource: Array<{
        /**
         * 购买量
         */
        buyCount: number;
        /**
         * 商品描述
         */
        description: string;
        /**
         * 商品id
         */
        pid: number;
        /** 评价id */
        id: number;
        /** 评价内容 */
        content: string;
        /**
         * 商品主图url
         */
        mainPicture: string;
        /**
         * 商品价格
         */
        price: number;
        /**
         * 商品规格
         */
        spec: string;
    }> = [];

    /**
     * 查询 - 评价列表 - 操作
     * @param order_no 
     */
    goodsEvaluateSelectServiceFn = async (order_no?: string) => {
        order_no = this.goodsEvaluateMap?.order_no || order_no;
        if(!order_no) return;

        const result = await goodsEvaluateSelectService(order_no);
        runInAction(() => {
            this.dataSource = result?.data?.content || [];
        });
    }

    /** Modal是否可见 */
    isModalVisible = false;
    /** 表格行数据 */
    goodsEvaluateMap: {
        /** 商品id */
        pid?: number;
        /** 评价内容 */
        content?: string;
        /** 订单编号 */
        order_no?: string;
        [key: string]: any;
    } = {};

    /**
     * 添加、修改评价 - 操作
     * @param params 
     * @param callBack 
     */
    onGoodsEvaluateClick = (params, callBack?: Function) => {
        this.isModalVisible = true;
        this.goodsEvaluateMap = params;

        callBack?.();
    }

    /**
     * 添加评价 - 操作
     * @param params 
     */
    goodsEvaluateAddServiceFn = async (params: IGoodsEvaluateAddService) => {
        if(!params || !Object.keys(params).length) return;

        const result = await store.commonStore.goodsEvaluateAddServiceFn(params);
        if(!result) return;

        this.goodsEvaluateSelectServiceFn();
    }

    /**
     * 修改评价 - 操作
     * @param params 
     */
    goodsEvaluateUpdateServiceFn = async (params: IGoodsEvaluateUpdateService) => {
        if(!params || !Object.keys(params).length) return;

        const result = await store.commonStore.goodsEvaluateUpdateServiceFn(params)
        if(!result) return;
        
        this.goodsEvaluateSelectServiceFn();
    }

    /**
     * Modal - 确定操作
     * @param values 
     */
    onModalOkClick = (values, callBack: Function) => {
        const { pid, id, order_no, content, } = this.goodsEvaluateMap || {};
        if(!content) {
            this.goodsEvaluateAddServiceFn({
                pid,
                order_no,
                ...values,
            });
        }else {
            this.goodsEvaluateUpdateServiceFn({
                id,
                ...values,
            });
        }
        
        callBack?.();
    }

    /**
     * Modal - 取消操作
     */
    onModalCancelClick = () => {
        this.isModalVisible = false;
    }
};
