import { SUCCESS_CODE } from '@config';
import { makeAutoObservable } from 'mobx';
import { userLoginService, ILogin } from './service';
import { cache } from '@utils/cache';
import { removeItem, setItem } from '@analytics/storage-utils';
import { dmHistory } from '@utils/history';

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
      if (isRemember) {
        setItem(cache.LOGIN_ACCOUNT, restParams?.phone);
      } else {
        removeItem(cache.LOGIN_ACCOUNT);
      }

      setItem(cache.LOGIN_INFO, result?.data?.context || {});

      dmHistory.replace('/');
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
