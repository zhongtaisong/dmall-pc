import { observable, action, toJS } from "mobx";
import { makeAutoObservable } from "mobx";
import { message } from 'antd';
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';
// 全局设置
import { searchAreaState } from '@config';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 我的收藏数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 选中数据key
    @observable selectedRowKeys = [];
    @action setSelectedRowKeys = (data = []) => {
        this.selectedRowKeys = data;
    }

    // 获取我的收藏列表数据 - 发起请求
    cartLisData = async () => {
        const res: any = await service.cartLisData({
            uname: sessionStorage.getItem('uname'),
            collection: 1
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                if( res.data.data ){
                    this.setDataSource( res.data.data );
                }
                searchAreaState.productNumData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 取消收藏指定id数据
    delcartData = async (ids = []) => {
        const res: any = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success(res.data.msg);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入购物车
    addcolsData = async (cartId = []) => {
        const res: any = await service.addcolsData({ 
            uname: sessionStorage.getItem('uname'), 
            ids: cartId,
            collection: 0
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success(res.data.msg);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();