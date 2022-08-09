import { observable, action } from 'mobx';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 详情图片 - 数据
    @observable pics = [];
    @action setPics = (data = []) => {
        this.pics = data;
    }

    // 详情图片 -发起请求
    introimgsData = async (lid) => {
        const res: any = await service.introimgsData({
            lid
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                let data = res.data.data.filter(item => lid == item.lid);
                this.setPics( data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();