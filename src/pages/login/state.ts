import { message } from 'antd';
import { observable, action } from 'mobx';
import { cacheKey } from '@utils';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import { ILogin, login, forgetPwdData, newPwdData, } from './service';
// 全局数据
import $state from '@store';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 提交新密码所需参数
    @observable upwdObj = {};
    @action setUpwdObj = (data = {}) => {
        this.upwdObj = data;
    }

    /**
     * 登录 - 操作
     * @param params 
     * @returns 
     */
    loginFn = async (params: ILogin, callBack: Function) => {
        if(!params || !Object.keys(params).length) return;

        const res = await login(params);
        if(res?.data?.code === SUCCESS_CODE){
            message.success("登录成功!");
            callBack?.(res?.data?.content || {});
        }
    }

    // 忘记密码 - 信息验证 - 下一步
    forgetPwdData = async ( values ) => {
        const res: any = await forgetPwdData(values);
        try{
            if(res?.data?.code === SUCCESS_CODE){
                const { data={} } = res.data || {};
                if(data) {
                    this.setUpwdObj(data);
                }
                message.success(res.data.msg);
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 提交新密码
    newPwdData = async ( values = {} ) => {
        const res: any = await newPwdData({
            ...values,
            isForgetPwd: true,
            ...this.upwdObj
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success('新密码提交成功！');
                res.data.data && localStorage.setItem('uname', res.data.data);      
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setUpwdObj();
    }
}

export default new State();