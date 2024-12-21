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
