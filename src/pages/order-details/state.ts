import { observable, action } from "mobx";
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 收货人信息
     */
    @observable consignees: {
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
    @action setConsignees = (data = {}) => {
        this.consignees = data;
    }

    /**
     * 商品列表
     */
    @observable dataSource: Array<{
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
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 付款信息
    @observable paymentInfo = {};
    @action setPaymentInfo = (data = {}) => {
        this.paymentInfo = data;
    }

    /**
     * 订单信息
     */
    @observable orderInfo: {
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
    @action setOrderInfo = (data = {}) => {
        this.orderInfo = data;
    }

    /**
     * 查询 - 订单详情 - 操作
     * @param ordernum 
     */
    detailOrdersDataFn = async (ordernum: string) => {
        const res = await service.detailOrdersData(ordernum);
        const { addressInfos, orderInfos, goodsInfos } = res?.data?.content || {};

        this.setConsignees(addressInfos || {});
        this.setOrderInfo(orderInfos || {});
        this.setDataSource(goodsInfos || []);
    }

}

export default new State();