import axios from '@axios';
import { IResponse } from '@types';
import { message } from 'antd';
// 忘记密码 - 信息验证
const forgetPwdUrl = 'users/vali/forgetPwd';
// 提交新密码
const newPwdUrl = 'users/update/upwd';

export interface ILogin {
    /**
     * 用户名
     */
    uname: string;
    /**
     * 密码
     */
    upwd: string;
}

/**
 * 登录
 * @param params 
 * @returns 
 */
export const login = (params: ILogin): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
        axios.post("/user/public/login", params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}


export const forgetPwdData = (req = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(forgetPwdUrl, req).then(res => {
            resolve(res);
        }).catch(err => {
            reject("操作失败！");
        });
    });
}

export const newPwdData = (req = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(newPwdUrl, req).then(res => {
            resolve(res);
        }).catch(err => {
            reject("操作失败！");
        });
    });
};
