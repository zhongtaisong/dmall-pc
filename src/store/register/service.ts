import axios from '@axios';
import { IResponse } from '@types';

export interface IRegister {
    /** 用户名 */
    uname: string;
    /** 密码 */
    upwd: string;
    /** 确认密码 */
    confirmUpwd: string;
    /** 邮箱 */
    email: string;
    /** 手机号码 */
    phone: string;
}

/**
 * 注册
 * @param params 
 * @returns 
 */
export const userRegisterService = (params: IRegister): Promise<IResponse> => {
    return axios.post("/user/public/register", params);
}
