import service from './service';
import { message } from 'antd';
import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    @observable history: any = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    registerData = async ( values ) => {
        const res: any = await service.registerData(values);
        try{
            if(res?.data?.code === SUCCESS_CODE){
                const { data } = res.data || {};
                message.success('恭喜你，注册成功！');
                data && localStorage.setItem('uname', data); 
                this.history.push('/login');
            }else if( res.data.code === 201 ){
                message.error(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();