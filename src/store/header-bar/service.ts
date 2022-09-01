import axios from '@axios';
import { IResponse } from '@types';

/**
 * 退出登录
 * @returns 
 */
export const logoutService = (): Promise<IResponse> => {
    return axios.get("/user/public/logout");
};
