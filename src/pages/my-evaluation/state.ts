import { observable, action, toJS } from "mobx";
import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 路由
    @observable history: any = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 商品
    @observable goods: any = {};
    @action setProducts = (data = {}) => {
        this.goods = data;
    }

    // 查询商品
    productsData = async (values = {}) => {
        const res: any = await service.productsData(values);
        try{
            if(res?.data?.code === SUCCESS_CODE){
                res.data.data && this.setProducts(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价 - 发起请求
    addcommentsData = async (values = {}) => {
        const res: any = await service.addcommentsData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success(res.data.msg);
                this.history.goBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();