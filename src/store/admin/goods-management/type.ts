import type { UploadFile, } from 'antd/es/upload/interface';

/**
 * 商品信息
 */
export interface IGoodsInfo {
    /** 商品id */
    id: number;
    /** 商品名称 */
    goods_name: string;
    /** 商品主图 */
    main_picture: string;
    /** 商品小图 */
    goods_picture: Array<UploadFile>;
    /** 商品详情图片 */
    detail_picture: Array<UploadFile>;
    /** 商品状态 */
    status: 0 | 1;
}
