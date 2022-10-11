import axios from '@axios';
import { IResponse } from '@types';

export interface IAdminUserSelectParams {
    /** 第几页 */
    current: number;
    /** 一页几条 */
    pageSize: number;
}

/**
 * 查询 - 用户列表
 * @param params 
 * @returns 
 */
export const adminUserSelectService = (params: IAdminUserSelectParams): Promise<IResponse> => {
    return axios.post("/admin/user/select", params);
};

export interface IAdminUserAddParams {
    /** 密码 */
    upwd: string;
    /** 确认密码 */
    confirmUpwd: string;
    /** 用户名 */
    uname: string;
    /** 手机号码 */
    phone: string;
    /** 邮箱 */
    email: string;
}

/**
 * 添加用户
 * @param params 
 * @returns 
 */
export const adminUserAddService = (params: IAdminUserAddParams): Promise<IResponse> => {
    return axios.post("/admin/user/add", params);
};

export interface IAdminUserUpateParams {
    /** 用户id */
    id: number;
    /** 用户名 */
    uname: string;
    /** 手机号码 */
    phone: string;
    /** 邮箱 */
    email: string;
}

/**
 * 更新用户
 * @param params 
 * @returns 
 */
export const adminUserUpdateService = (params: IAdminUserUpateParams): Promise<IResponse> => {
    return axios.patch("/admin/user/update", params);
};

/**
 * 删除用户
 * @param id 
 * @returns 
 */
export const adminUserDeleteService = (uname: string, id: number): Promise<IResponse> => {
    return axios.delete(`/admin/user/delete/${ uname }/${ id }`);
};

export interface IAdminUserResetPasswordParams {
    /** 用户id */
    id: number;
    /** 用户名 */
    uname: string;
}

/**
 * 重置用户密码
 * @param params 
 * @returns 
 */
export const adminUserResetPasswordService = (params: IAdminUserResetPasswordParams): Promise<IResponse> => {
    return axios.patch("/admin/user/update/reset-password", params);
};
