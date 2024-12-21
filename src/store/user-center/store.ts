import { SUCCESS_CODE } from '@config';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  selectUserInformationService,
  updateUserInformationService,
} from './service';
// mobx数据
import store from '@store';
import { cacheKey } from '@utils';
import { getUserInfo } from '@utils/common-fn';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 查询 - 用户信息 - 操作
   * @param callBack
   */
  selectUserInformationServiceFn = async () => {
    const result = await selectUserInformationService();
    const context = result?.data?.context;
    return {
      ...context,
      avatar: context?.avatar
        ? [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: context?.avatar,
            },
          ]
        : [],
    };
  };

  /**
   * 更新 - 用户信息 - 操作
   * @param params
   */
  updateUserInformationServiceFn = async (params: FormData) => {
    const result = await updateUserInformationService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      const user_info = {
        ...getUserInfo(),
        ...params,
      };

      const avatar = user_info?.avatar;
      if (Array.isArray(avatar)) {
        Object.assign(user_info, {
          avatar: avatar?.[0] || '',
        });
      }

      const key = cacheKey.USER_INFO;
      const val = JSON.stringify(user_info || {});
      localStorage.setItem(key, val);
      sessionStorage.setItem(key, val);
      runInAction(() => {
        store.headerBarStore.setMobxStoreFn({
          key: 'welcomeObjectName',
          value: user_info?.nickname || user_info?.phone,
        });
      });
    }
  };
}
