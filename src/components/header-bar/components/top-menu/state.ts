// 接口服务
import service from './service';
// 全局数据
import $state from '@store';
// 全局设置
import { indexState } from '@config';
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
    logoutData = async (callBack?: Function) => {
        const res: any = await service.logoutData();
        try{
            if(res?.data?.code === SUCCESS_CODE){
                localStorage.removeItem(cacheKey.USER_INFO);
                sessionStorage.removeItem(cacheKey.USER_INFO);
                callBack?.();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();