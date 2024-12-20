import { makeAutoObservable, runInAction } from 'mobx';
import {
  adminPermissionSelectService,
  IAdminPermissionSelectParams,
  adminPermissionDeleteService,
  adminPermissionSelectUnameService,
  IPermissionService,
  adminPermissionAddService,
  adminPermissionUpdateService,
} from './service';
import { PAGE_SIZE, SUCCESS_CODE } from '@config';
import { IRecordInfo } from './type';
// mobx数据
import store from '@store';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  /** 数据总数 */
  total = 0;

  /** 列表数据 */
  dataSource: Array<IRecordInfo> = [];

  /** 查询 - 接口入参 */
  requestParams: Partial<IAdminPermissionSelectParams> = {
    current: 0,
    pageSize: PAGE_SIZE,
  };

  /**
   * 查询 - 权限列表
   * @param params
   */
  adminPermissionSelectServiceFn = async (
    params?: IAdminPermissionSelectParams,
  ) => {
    const requestParams = {
      ...this.requestParams,
      ...params,
    };

    const result = await adminPermissionSelectService(requestParams);

    const { dataSource, total } = result?.data?.context || {};
    runInAction(() => {
      this.dataSource = dataSource || [];
      this.total = total ?? 0;
      this.requestParams = requestParams;
    });
  };

  /**
   * 添加权限 - 操作
   * @param params
   */
  adminPermissionAddServiceFn = async (params: Partial<IPermissionService>) => {
    if (!params || !Object.keys(params).length) return;

    const result = await adminPermissionAddService(params);
    if (!result) return;

    this.adminPermissionSelectServiceFn();
    return true;
  };

  /**
   * 修改权限 - 操作
   * @param params
   */
  adminPermissionUpdateServiceFn = async (
    params: Partial<IPermissionService>,
  ) => {
    if (!params || !Object.keys(params).length) return;

    const result = await adminPermissionUpdateService(params);
    if (!result) return;

    this.adminPermissionSelectServiceFn();
    return true;
  };

  /**
   * 删除权限 - 操作
   * @param id
   * @returns
   */
  adminPermissionDeleteServiceFn = async (id: number) => {
    const result = await adminPermissionDeleteService(id);
    if (result?.data?.code === SUCCESS_CODE) {
      this.adminPermissionSelectServiceFn();
    }
  };

  /** 查询用户 */
  unameList = [];

  /**
   * 查询 - 查询用户 - 操作
   */
  adminPermissionSelectUnameServiceFn = async () => {
    const result = await adminPermissionSelectUnameService();
    runInAction(() => {
      this.unameList = result?.data?.context || [];
    });
  };
}
