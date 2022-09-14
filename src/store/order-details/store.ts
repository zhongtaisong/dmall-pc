import { makeAutoObservable, runInAction } from "mobx";
import { 
    orderSelectDetailService,
} from './service';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 收货人信息 */
    consignees: {
        /**
         * 详细地址
         */
        detail?: string;
        /**
         * 收货人姓名
         */
        name?: string;
        /**
         * 收货人电话
         */
        phone?: "18312345678";
        /**
         * 收货人地区
         */
        region?: "上海浦东";
    } = {};

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
        id: number;
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

    /** 订单信息 */
    orderInfo: {
        /**
         * 订单购买量
         */
        num?: number;
        /**
         * 订单编号
         */
        ordernum?: string;
        /**
         * 创建订单时间
         */
        submitTime?: string;
        /**
         * 订单总金额
         */
        totalprice?: number;
    } = {};

    /**
     * 查询 - 订单详情 - 操作
     * @param ordernum 
     */
    orderSelectDetailServiceFn = async (ordernum: string) => {
        if(!ordernum) return;

        const result = await orderSelectDetailService(ordernum);

        const { addressInfos, orderInfos, goodsInfos } = result?.data?.content || {};
        runInAction(() => {
            this.consignees = addressInfos || {};
            this.dataSource = goodsInfos || [];
            this.orderInfo = orderInfos || {};
        });
    }
    
};
