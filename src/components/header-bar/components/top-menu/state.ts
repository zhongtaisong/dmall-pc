// 接口服务
import { logoutData } from './service';
import { cacheKey } from '@utils';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 退出登录
     */
    logoutDataFn = async (callBack?: Function) => {
        const res = await logoutData();

        if(res?.data?.code === SUCCESS_CODE){
            localStorage.removeItem(cacheKey.USER_INFO);
            sessionStorage.removeItem(cacheKey.USER_INFO);
            callBack?.();
        }
    }
}

export default new State();