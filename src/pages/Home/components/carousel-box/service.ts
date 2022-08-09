import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 大图推广商品
 * @returns 
 */
export const selectLargeScalePromotion = (): Promise<IResponse> => {
    return axios.get("/public/large-scale-promotion");
}
