import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import moment from 'moment';
import { message } from 'antd';
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';
// url前缀
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 个人资料 - 头像
    @observable fileListArr = [];
    @action setFileListArr = (data = []) => {
        this.fileListArr = data;
    }

    /**
     * 查询 - 个人资料 - 操作
     * @returns 
     */
    selectUserInfoData = async () => {
        const res = await service.fetchSelectUserInfoData();

        if(res?.data?.code === SUCCESS_CODE){
            let { content } = res?.data || {};
            if(!content || !Object.keys(content).length) {
                content = {};
            };

            this.setFileListArr([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${ PUBLIC_URL }${ content?.avatar }`,
            }]);
            return {
                ...content,
                birthday: moment(content?.['birthday']),
            }
        }
    }

    /**
     * 更新 - 个人资料 - 操作
     * @param params 
     */
    updateUserInfoData = async (params = {}) => {
        const res = await service.fetchUpdateUserInfoData(params);
        if(res?.data?.code === SUCCESS_CODE){
            message.success(res.data.msg);
        }else {
            message.error("操作失败！");
        }
    }

    /**
     * 更新 - 登录密码 - 操作
     * @param params 
     * @returns 
     */
    updateUpwdData = async (params = {}) => {
        const res = await service.fetchUpdateUpwdData({ ...params });
        if( res?.data?.code === SUCCESS_CODE ){
            message.success(res.data.msg);
            return true;
        }else {
            message.error("操作失败！");
        }
    }

    // 登录密码
    @observable loginPassword = {};
    @action setLoginPassword01 = (data = {}) => {
        this.loginPassword = data;
    }
    @action setLoginPassword02 = (key, value) => {
        this.loginPassword[key] = value;
    }
}

export default new State();