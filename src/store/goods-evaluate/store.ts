import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import { 
    goodsEvaluateSelectService, 
    goodsEvaluateAddService,
    IGoodsEvaluateAddService,
    goodsEvaluateUpdateService,
    IGoodsEvaluateUpdateService,
} from './service';

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
     * @param ordernum 
     */
    goodsEvaluateSelectServiceFn = async (ordernum?: string) => {
        ordernum = this.goodsEvaluateMap?.ordernum || ordernum;
        if(!ordernum) return;

        const result = await goodsEvaluateSelectService(ordernum);
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
        ordernum?: string;
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

        const result = await goodsEvaluateAddService(params)
        if(result?.data?.code === SUCCESS_CODE) {
            this.goodsEvaluateSelectServiceFn();
        }
    }

    /**
     * 修改评价 - 操作
     * @param params 
     */
    goodsEvaluateUpdateServiceFn = async (params: IGoodsEvaluateUpdateService) => {
        if(!params || !Object.keys(params).length) return;

        const result = await goodsEvaluateUpdateService(params)
        if(result?.data?.code === SUCCESS_CODE) {
            this.goodsEvaluateSelectServiceFn();
        }
    }

    /**
     * Modal - 确定操作
     * @param values 
     */
    onModalOkClick = (values) => {
        const { pid, id, ordernum, content, } = this.goodsEvaluateMap || {};
        if(!content) {
            this.goodsEvaluateAddServiceFn({
                pid,
                ordernum,
                ...values,
            });
        }else {
            this.goodsEvaluateUpdateServiceFn({
                id,
                ...values,
            });
        }
        this.onModalCancelClick();
    }

    /**
     * Modal - 取消操作
     */
    onModalCancelClick = () => {
        this.isModalVisible = false;
    }
};
