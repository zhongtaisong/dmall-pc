import { makeAutoObservable, runInAction } from "mobx";
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
        banner_picture: string;
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
        main_picture: string;
        /** 商品价格 */
        price: number;
        /** 商品名称 */
        goods_name: string;
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
