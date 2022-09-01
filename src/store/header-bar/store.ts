import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from "@config";
import { cacheKey } from '@utils';
import { logoutService } from './service';

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 退出登录 - 操作
     */
    logoutServiceFn = async (callBack?: Function) => {
        const result = await logoutService();
        if(result?.data?.code === SUCCESS_CODE) {
            localStorage.removeItem(cacheKey.USER_INFO);
            sessionStorage.removeItem(cacheKey.USER_INFO);
            callBack?.();
        }
    };
    
};
