/** 商品加购信息 */
export interface IBuyGoodsInfo {
    /** 商品id */
    pid: number;
    /** 加购数量 */
    num: number;
}

/**
 * 添加评价 - 接口入参类型定义
 */
export interface IGoodsEvaluateAddService {
    /** 商品id */
    pid,
    /** 订单编号 */
    order_no,
    /** 评价内容 */
    content,
}

/**
 * 修改评价 - 接口入参类型定义
 */
export interface IGoodsEvaluateUpdateService {
    /** 评价id */
    id,
    /** 评价内容 */
    content,
}
