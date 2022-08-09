import { SUCCESS_CODE } from '@config';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 用户列表
    @observable usersList = [];
    @action setUsersList = (data = []) => {
        this.usersList = data;
    }

    // 所有商品编号
    @observable lidList = [];
    @action setLidList = (data = []) => {
        this.lidList = data;
    }

    /**
     * 查询 - 用户名
     */
    getUnameFn = async () => {
        const res = await service.getUname();
        if(res?.data?.code === SUCCESS_CODE){
            this.setUsersList(res?.data?.content || []);
        }
    }

    /**
     * 查询 - 商品pid
     */
    getPidFn = async () => {
        const res = await service.getPid();
        if(res?.data?.code === SUCCESS_CODE){
            this.setLidList(res?.data?.content || []);
        }
    }
    
}

export default new State();