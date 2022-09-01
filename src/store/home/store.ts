import { makeAutoObservable, runInAction } from "mobx";
import { SUCCESS_CODE } from "@config";
import { largeScalePromotionService, hotRecommendationsService } from './service';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 大图推广 - 列表数据
     */
    carouselBoxList: Array<{
        /** 大图 */
        bannerPic: string;
        /** 商品描述 */
        description: string;
        /** 主键id */
        id: number;
    }> = [];

    /**
     * 查询 - 大图推广商品 - 操作
     */
    largeScalePromotionServiceFn = async () => {
        const res = await largeScalePromotionService();
        runInAction(() => {
            this.carouselBoxList = res?.data?.content || [];
        });
    }

    /**
     * 热门推荐商品 - 列表数据
     */
    hotThisWeekList: Array<{
        /** 商品描述 */
        description: string;
        /** 主键id */
        id: 17;
        /** 主图 */
        mainPicture: string;
        /** 商品价格 */
        price: number;
        /** 商品名称 */
        productName: string;
    }> = [];

    /**
     * 查询 - 热门推荐商品 - 操作
     */
    hotRecommendationsServiceFn = async () => {
        const res = await hotRecommendationsService();
        runInAction(() => {
            this.hotThisWeekList = res?.data?.content || [];
        });
    }
    
};
