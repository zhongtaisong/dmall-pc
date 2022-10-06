import axios from '@axios';
import { IResponse } from '@types';

/**
 * 根据指定商品id查询 - 购物车
 * @returns 
 */
export const shoppingCartSelectPidsService = (pids: Array<number>): Promise<IResponse> => {
    return axios.post("/shopping-cart/select/pids", { pids, });
}

export interface IOrderAdd {
    /** 地址id */
    addressId: number;
    /** 订单信息 */
    orderInfos: Array<{
        /** 商品id */
        pid: number;
        /** 购买数量 */
        num: number;
        /** 单价 */
        price: number;
    }>;
}

/**
 * 生成订单
 * @param params 
 * @returns 
 */
export const orderAddService = (params: IOrderAdd): Promise<IResponse> => {
    return axios.post("/order/add", params);
}
