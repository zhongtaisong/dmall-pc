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

    @observable nums = [];
    @action setNums = (data = []) => {
        this.nums = data;
    }
    @action setNums02 = (index, key, value) => {
        this.nums[index][key] = value;
    }

    // 留言列表
    @observable messageList = [];
    @action setMessageList = (data = []) => {
        this.messageList = data;
    }

    // 查询留言 - 发起请求
    selmessagesData = async () => {
        const res: any = await service.selmessagesData();
        try{
            if(res?.data?.code === SUCCESS_CODE){
                const { data } = res.data || {};
                if(data){
                    this.setMessageList( res.data.data );
                    let nums = data.map(item => {
                        return ({
                            agree: item.agree,
                            disagree: item.disagree
                        });
                    });
                    this.setNums(nums);
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 喜欢 / 不喜欢 - 留言
    agreemessagesData = async (params = {}) => {
        const res: any = await service.agreemessagesData(params);
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 发表留言
    addMessagesData = async (params = {}) => {
        const res: any = await service.addMessagesData(params);
        try{
            if(res?.data?.code === SUCCESS_CODE){
                message.success(res.data.msg);
                this.selmessagesData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();