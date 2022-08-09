import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 热门推荐商品
 * @returns 
 */
export const selectHotRecommendations = (): Promise<IResponse> => {
    return axios.get("/public/hot-recommendations");
}
