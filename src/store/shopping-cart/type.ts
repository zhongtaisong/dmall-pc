/**
 * 购物车信息
 */
export interface IShoppingCartInfo {
    /** 商品id */
    pid: number;
    /** 单笔总价 */
    totalprice: number;
    /** 商品信息 */
    goodsInfo: {
        /** 商品单价 */
        price: number;
        [key: string]: any;
    };
    /** 加购数量 */
    num: number;
    [key: string]: any;
};
