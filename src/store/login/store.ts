import { SUCCESS_CODE } from '@config';
import { cacheKey, history } from '@utils';
import { makeAutoObservable } from 'mobx';
import { userLoginService, ILogin } from './service';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 登录 - 操作
   * @param params
   * @returns
   */
  userLoginServiceFn = async (params: ILogin) => {
    if (!params || !Object.keys(params).length) return;

    const { isRemember, ...restParams } = params;

    const result = await userLoginService(restParams);
    if (result?.data?.code === SUCCESS_CODE) {
      const key = cacheKey.USER_INFO;
      const val = JSON.stringify(result?.data?.context || {});
      if (isRemember) {
        localStorage.setItem('phone', restParams?.phone);
      } else {
        localStorage.removeItem('phone');
      }

      localStorage.setItem(key, val);

      history.replace('/');
    }
  };

  /**
   * 动态设置Mobx数据
   * @param params
   * @returns
   */
  setMobxStoreFn = (params) => {
    if (!params) return;

    // Object
    if (Object.keys(params).length) {
      const { key, value } = params;
      if (key in this) {
        this[key] = value;
      }
    }

    // Array
    if (Array.isArray(params)) {
      params.forEach((item) => {
        this.setMobxStoreFn(item);
      });
    }
  };

  /** 信息验证通过临时token */
  temporaryToken = null;
}
