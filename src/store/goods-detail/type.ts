/**
 * 商品信息
 */
export interface IGoodsInfo {
    /**
     * 主图列表
     */
    images?: Array<string>;
    /**
     * 商品描述
     */
    description?: string;
    /**
     * 文案
     */
    copywriting?: string;
    /**
     * 商品价格
     */
    price?: number;
    /**
     * 规格列表
     */
    specs?: Array<{
        /**
         * 商品id
         */
        id: number;
        /**
         * 规格项
         */
        spec: string;
    }>;
    /**
     * 商品详情图片列表
     */
    detailImgs?: Array<string>;
    [key: string]: any;
};
