import { SUCCESS_CODE } from '@config';
import { history } from '@utils';
import { makeAutoObservable } from 'mobx';
import { userRegisterService, IRegister } from './service';

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
      localStorage.setItem('phone', params?.phone);
      callBack?.();
    }
  };
}
