import axios from '@axios';
import { IResponse } from '@types';

/**
 * 查询 - 用户信息
 * @returns
 */
export const selectUserInformationService = (): Promise<
  IResponse<IUserInformation>
> => {
  return axios.get('user/info?msg=false');
};

export interface IUserInformation {
  /** 用户id */
  id: number;
  /** 手机号码 */
  phone: string;
  /** 昵称 */
  nickname: string;
  /** 用户头像 */
  avatar: string;
}

/**
 * 更新 - 用户信息
 * @returns
 */
export const updateUserInformationService = (
  params: IObject,
): Promise<IResponse> => {
  return axios.post('/user/info/update', params);
};
