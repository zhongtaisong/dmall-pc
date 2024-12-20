import { makeAutoObservable, runInAction } from 'mobx';
import {
  adminUserSelectService,
  IAdminUserSelectParams,
  adminUserAddService,
  adminUserUpdateService,
  adminUserDeleteService,
  IAdminUserAddParams,
  IAdminUserUpateParams,
  adminUserResetPasswordService,
  IAdminUserResetPasswordParams,
} from './service';
import { PAGE_SIZE, SUCCESS_CODE } from '@config';
import { IRecordInfo } from './type';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 数据总数 */
  total = 0;

  /** 列表数据 */
  dataSource: Array<IRecordInfo> = [];

  /** 查询 - 接口入参 */
  requestParams: Partial<IAdminUserSelectParams> = {
    current: 0,
    pageSize: PAGE_SIZE,
  };

  /**
   * 查询 - 用户列表
   * @param params
   */
  adminUserSelectServiceFn = async (params?: IAdminUserSelectParams) => {
    const requestParams = {
      ...this.requestParams,
      ...params,
    };

    const result = await adminUserSelectService(requestParams);

    const { dataSource, total } = result?.data?.context || {};
    runInAction(() => {
      this.dataSource = dataSource || [];
      this.total = total ?? 0;
      this.requestParams = requestParams;
    });
  };

  /**
   * 添加用户 - 操作
   * @param params
   */
  adminUserAddServiceFn = async (params: IAdminUserAddParams) => {
    if (!params || !Object.keys(params).length) return;

    const result = await adminUserAddService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminUserSelectServiceFn();
    }

    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 修改用户 - 操作
   * @param params
   */
  adminUserUpdateServiceFn = async (params: IAdminUserUpateParams) => {
    if (!params || !Object.keys(params).length) return;

    const result = await adminUserUpdateService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminUserSelectServiceFn();
    }

    return result?.data?.code === SUCCESS_CODE;
  };

  /**
   * 删除用户 - 操作
   * @param uname
   * @param id
   * @returns
   */
  adminUserDeleteServiceFn = async (uname: string, id: number) => {
    const result = await adminUserDeleteService(uname, id);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminUserSelectServiceFn();
    }
  };

  /**
   * 重置用户密码 - 操作
   * @param params
   * @returns
   */
  adminUserResetPasswordServiceFn = async (
    params: IAdminUserResetPasswordParams,
    callBack?: Function,
  ) => {
    if (!params || !Object.keys(params).length) return;

    const result = await adminUserResetPasswordService(params);
    if (result?.data?.code === SUCCESS_CODE) {
      callBack?.(result?.data?.context);
    }
  };
}
