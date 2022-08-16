import axios from '@axios';
import { IResponse } from '@types';

/**
 * 退出登录
 * @returns 
 */
export const logoutData = (): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
        axios.patch("users/logout").then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
};
