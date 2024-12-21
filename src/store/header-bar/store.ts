import { makeAutoObservable } from 'mobx';
import { SUCCESS_CODE } from '@config';
import { cacheKey } from '@utils';
import { logoutService } from './service';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 退出登录 - 操作
   */
  logoutServiceFn = async () => {
    const result = await logoutService();
    if (result) {
      localStorage.removeItem(cacheKey.USER_INFO);
      sessionStorage.removeItem(cacheKey.USER_INFO);
    }

    return result;
  };

  /** 欢迎您 */
  welcomeObjectName = null;

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
}
