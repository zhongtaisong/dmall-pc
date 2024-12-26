import { SUCCESS_CODE } from '@config';
import { makeAutoObservable } from 'mobx';
import { userRegisterService, IRegister } from './service';
import { setItem } from '@analytics/storage-utils';
import { cache } from '@utils/cache';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 注册 - 操作
   * @param params
   * @param callBack
   * @returns
   */
  userRegisterServiceFn = async (params: IRegister, callBack: Function) => {
    if (!params || !Object.keys(params).length) return;

    const result = await userRegisterService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      setItem(cache.LOGIN_ACCOUNT, params?.phone);
      callBack?.();
    }
  };
}
