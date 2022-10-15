import { makeAutoObservable, runInAction } from "mobx";
import { 
    orderSelectDetailService,
} from './service';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 收货人信息 */
    consignees: Partial<{
        /**
         * 详细地址
         */
        detail: string;
        /**
         * 收货人姓名
         */
        name: string;
        /**
         * 收货人电话
         */
        phone: string;
        /**
         * 收货人地区
         */
        region: string;
        /** 完整地址 */
        address: string;
    }> = {};

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
        main_picture: string;
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
         * 订单购买总量
         */
        total_num?: number;
        /**
         * 订单编号
         */
        order_no?: string;
        /**
         * 创建订单时间
         */
        create_time?: string;
        /**
         * 订单总金额
         */
        total_price?: number;
    } = {};

    /**
     * 查询 - 订单详情 - 操作
     * @param order_no 
     */
    orderSelectDetailServiceFn = async (order_no: string) => {
        if(!order_no) return;

        const result = await orderSelectDetailService(order_no);

        const { addressInfos, orderInfos, goodsInfos } = result?.data?.content || {};
        runInAction(() => {
            if(addressInfos && Object.keys(addressInfos).length) {
                addressInfos['address'] = `${addressInfos?.region || ''}${addressInfos?.detail || ''}`;
            }
            this.consignees = addressInfos || {};
            this.dataSource = goodsInfos || [];
            this.orderInfo = orderInfos || {};
        });
    }
    
};
