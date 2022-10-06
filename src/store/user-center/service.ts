import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 用户信息
 * @returns 
 */
export const selectUserInformationService = (): Promise<IResponse<IUserInformation>> => {
    return axios.get("/user/select/user-information");
}

export interface IUserInformation {
    /** 用户id */
    id: number;
    /** 用户名 */
    uname: string;
    /** 手机号码 */
    phone: string;
    /** 性别 */
    gender: number;
    /** 生日 */
    birthday: string;
    /** 昵称 */
    nickName: string;
}

/**
 * 更新 - 用户信息
 * @returns 
 */
export const updateUserInformationService = (params: IUserInformation): Promise<IResponse> => {
    return axios.put("/user/update/user-information", params);
}

export interface IUpdateUserPassword {
    /** 旧密码 */
    oldPwd: string;
    /** 新密码 */
    newPwd?: string;
}

/**
 * 修改登录密码
 * @param params 
 * @returns 
 */
export const updateUserPasswordService = (params: IUpdateUserPassword): Promise<IResponse> => {
    return axios.patch("/user/update/password", params);
}

export interface IAddAddressService {
    /** 收件人 */
    name: string;
    /** 所在地区 */
    region: string;
    /** 详细地址 */
    detail: string;
    /** 联系电话 */
    phone: string;
    /** 是否为默认地址，0否，1是 */
    isDefault: 0 | 1;
}

/**
 * 添加 - 收货地址
 * @param params 
 * @returns 
 */
export const addAddressService = (params: IAddAddressService): Promise<IResponse> => {
    return axios.post("/address/add", params);
}

export interface IUpdateAddressService extends IAddAddressService {
    /** 收货地址id */
    id: number;
}

/**
 * 修改 - 收货地址
 * @param params 
 * @returns 
 */
export const updateAddressService = (params: IUpdateAddressService): Promise<IResponse> => {
    return axios.put("/address/update", params);
}

/**
 * 删除 - 收货地址
 * @param params 
 * @returns 
 */
export const deleteAddressService = (id: number | string): Promise<IResponse> => {
    return axios.delete(`/address/delete/${ id }`);
}
