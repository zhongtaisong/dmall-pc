import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction, } from "mobx";
import { 
    shoppingCartSelectPidsService,
    orderAddService,
    IOrderAdd,
} from './service';
// mobx数据
import store from '@store';
import { IAddressInfo } from "./type";
import { history } from "@utils";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 收货地址 - 列表数据 */
    addressDataSource: Array<IAddressInfo> = [];

    /** 当前收货地址 */
    currentAddress: Partial<IAddressInfo> = {};

    /**
     * 查询 - 收货地址 - 操作
     */
    selectAddressListServiceFn = async () => {
        const result = await store.commonStore.selectAddressListServiceFn();
        runInAction(() => {
            let addressDataSource = result;
            let currentAddress = {};
            if(Array.isArray(addressDataSource)) {
                addressDataSource = addressDataSource.map(item => ({
                    ...item,
                    address: `${item?.name || ''} ${item?.phone || ''} ${item?.region || ''}${item?.detail || ''}`,
                })) || [];
                currentAddress = addressDataSource?.find?.(item => item?.isDefault) || addressDataSource?.[0] || {};
            }
            this.addressDataSource = addressDataSource;
            this.currentAddress = currentAddress;
        });
    }

    /**
     * 监听 - 表单变化
     * @param changedValues 
     * @param values 
     */
    onValuesChange = (changedValues, values) => {
        this.currentAddress = this.addressDataSource.find(item => item?.id === changedValues?.addressId) || {};
    }

    /** 商品列表 - 数据 */
    goodsDataSource: Array<{
        /** 商品id */
        pid: number;
        /** 购买量 */
        num: number;
        /** 总金额 */
        totalprice: number;
        /** 商品信息 */
        goodsInfo: {
            /** 单价 */
            price: number;
        };
    }> = [];
    /** 共几件商品 */
    buyTotalNum = 0;
    /** 合计 */
    totalPrice = 0;

    /**
     * 根据指定商品id查询 - 购物车
     * @param pids 
     */
    shoppingCartSelectPidsServiceFn = async (pids: Array<number>) => {
        if(!Array.isArray(pids) || !pids.length) return;

        const result = await shoppingCartSelectPidsService(pids);
        runInAction(() => {
            const goodsDataSource = result?.data?.content || [];
            let buyTotalNum = 0;
            let totalPrice = 0;
            if(Array.isArray(goodsDataSource)) {
                goodsDataSource.forEach(item => {
                    buyTotalNum += item?.num;
                    totalPrice += item?.totalprice;
                });
            }
            
            this.goodsDataSource = goodsDataSource;
            this.buyTotalNum = buyTotalNum;
            this.totalPrice = totalPrice;
        })
    }

    /**
     * 生成订单 - 操作
     * @param params 
     */
    orderAddServiceFn = async (params: IOrderAdd) => {
        if(!params || !Object.keys(params).length) return;

        const result = await orderAddService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            history.push(`/views/order-details/${result?.data?.content}`);
        }else {
            history.push("/views/shopping-cart");
        }
    }
    
};
