import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 大图推广商品
 * @returns 
 */
 export const largeScalePromotionService = (): Promise<IResponse> => {
    return axios.get("/home/public/large-scale-promotion");
}

/**
 * 查询 - 热门推荐商品
 * @returns 
 */
export const hotRecommendationsService = (): Promise<IResponse> => {
    return axios.get("/home/public/hot-recommendations");
}
