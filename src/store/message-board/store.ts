import { SUCCESS_CODE } from '@config';
import { makeAutoObservable, runInAction } from 'mobx';
import { messageBoardSelectService, messageBoardAddService } from './service';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 留言板 - 列表数据 */
  messageBoardList = [];

  /**
   * 查询用户留言 - 操作
   */
  messageBoardSelectServiceFn = async () => {
    const result = await messageBoardSelectService();
    runInAction(() => {
      this.messageBoardList = result?.data?.context || [];
    });
  };

  /**
   * 发表留言 - 操作
   * @param params
   * @param callBack
   * @returns
   */
  messageBoardAddServiceFn = async (params = {}, callBack?: Function) => {
    if (!params || !Object.keys(params).length) return;

    const result = await messageBoardAddService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      callBack?.();
      this.messageBoardSelectServiceFn();
    }
  };
}
