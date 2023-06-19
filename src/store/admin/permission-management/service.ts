import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminPermissionSelectParams {
  /** 第几页 */
  current: number;
  /** 一页几条 */
  pageSize: number;
}

/**
 * 查询 - 权限列表
 * @param params
 * @returns
 */
export const adminPermissionSelectService = (
  params: IAdminPermissionSelectParams,
): Promise<IResponse> => {
  return axios.post('/admin/permission/select', params);
};

export interface IPermissionService {
  /** 权限id */
  id: number;
  /** 角色 */
  role: string;
  /** 用户名 */
  uname: string;
  /** 品牌管理 */
  brand_management: string;
  /** 商品管理 */
  goods_management: string;
  /** 订单管理 */
  order_management: string;
  /** 用户管理 */
  user_management: string;
  /** 评价管理 */
  goods_evaluate_management: string;
  /** 权限管理 */
  permission_management: string;
}

/**
 * 添加权限
 * @param params
 * @returns
 */
export const adminPermissionAddService = (
  params: Partial<IPermissionService>,
): Promise<IResponse> => {
  return axios.post('/admin/permission/add', params);
};

/**
 * 更新权限
 * @param params
 * @returns
 */
export const adminPermissionUpdateService = (
  params: Partial<IPermissionService>,
): Promise<IResponse> => {
  return axios.put('/admin/permission/update', params);
};

/**
 * 删除权限
 * @param id
 * @returns
 */
export const adminPermissionDeleteService = (
  id: number,
): Promise<IResponse> => {
  return axios.delete(`/admin/permission/delete/${id}`);
};

/**
 * 查询用户
 * @returns
 */
export const adminPermissionSelectUnameService = (): Promise<IResponse> => {
  return axios.get('/admin/permission/select/role/uname');
};
