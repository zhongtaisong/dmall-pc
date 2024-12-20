import axios from '@axios';
import { IResponse } from '@types';

export interface ILogin {
  /** 手机号码 */
  phone: string;
  /** 密码 */
  upwd: string;
  /** 是否记住账号 */
  isRemember?: boolean;
}

/**
 * 登录
 * @param params
 * @returns
 */
export const userLoginService = (params: ILogin): Promise<IResponse> => {
  return axios.post('/user/public/login', params);
};

export interface IUserValidateService {
  /** 用户名 */
  uname: string;
  /** 邮箱 */
  email: string;
  /** 手机号码 */
  phone: string;
}

/**
 * 验证用户信息
 * @param params
 * @returns
 */
export const userValidateService = (
  params: IUserValidateService,
): Promise<IResponse> => {
  return axios.post('/user/public/validate', params);
};

export interface IUserUpdatePasswordService {
  /** 旧密码 */
  oldPwd: string;
  /** 新密码 */
  newPwd: string;
  /** 信息验证通过临时token */
  temporaryToken: string;
}

/**
 * 更新登录密码
 * @param params
 * @returns
 */
export const userUpdatePasswordService = (
  params: IUserUpdatePasswordService,
): Promise<IResponse> => {
  return axios.patch('/user/public/update/password', params);
};
