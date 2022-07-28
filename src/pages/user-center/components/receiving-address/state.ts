import { commonFn } from '@utils';
import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 当前数据id
    @observable id = null;
    @action setId = (data = null) => {
        this.id = data;
    }

    // 模态框 - 显示与隐藏
    @observable visible = false;
    @action setVisible = (data = false) => {
        this.visible = data;
    }

    // 收货地址 - 表格 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 模态框 - 数据
    @observable addressModalData = {};
    @action setAddressModalData = (data = {}) => {
        this.addressModalData = data;
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setId();
        this.setVisible();
        this.setDataSource();
        this.setAddressModalData();
    }

    // 添加收货地址 / 修改收货地址
    editAddressData = async (values = {}) => {
        let params = this.id ? {
            id: this.id
        } : {};
        const res: any = await service.editAddressData({
            uname: sessionStorage.getItem('uname'),
            ...values,
            ...params
        });
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询收货地址
    selAddressData = async () => {
        // 清除mobx数据
        this.clearMobxData();
        const res: any = await service.selAddressData({
            uname: commonFn.getUserInfo().uname
        });
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setDataSource(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除收货地址
    delAddressData = async (obj = {}) => {
        const res: any = await service.delAddressData(obj);
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();