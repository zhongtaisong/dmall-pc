import { observable, action } from 'mobx';
import { message } from 'antd';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 路由对象
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 加入购物车 - 发起请求
    addcartData = async (list = []) => {
        const res: any = await service.addcartData({ 
            uname: sessionStorage.getItem('uname'), 
            list
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success('成功加入购物车！');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();