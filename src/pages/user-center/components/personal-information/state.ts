import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // -------------------- 上传图片 -------------------------- //
        // 上传图片 - 数据
        @observable fileListArr = [];
        @action setFileListArr = (data = []) => {
            this.fileListArr = data;
        }
    
        // 存储被删图片 - 数据
        @observable delList = [];
        @action setDelList = (data = []) => {
            this.delList = data;
        }
    // -------------------- 上传图片 -------------------------- //

    // 修改 - 个人资料
    updateUserInfoData = async (values = {}) => {
        const res: any = await service.updateUserInfoData(values);
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();