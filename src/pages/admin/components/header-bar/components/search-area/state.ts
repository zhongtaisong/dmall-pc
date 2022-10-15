import { observable, action, toJS } from "mobx";
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';
// 接口服务
import service from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    // 商品数量
    @observable productNum = 0;
    @action setProductNum = (data = 0) => {
        this.productNum = data;
    }

    // 获取购物车列表数据 - 发起请求
    productNumData = async () => {
        let uname;
        if( sessionStorage.getItem('uname') ){
            uname = sessionStorage.getItem('uname');
        }else{
            if( localStorage.getItem('uname') ){
                uname = localStorage.getItem('uname');
            }else{
                return;
            }
        }
        const res: any = await service.productNumData({
            uname,
            isCount: true
        });
        try{
            if(res?.data?.code === SUCCESS_CODE){
                this.setProductNum( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 是否展示搜索框
    @observable isShowSearchInput = false;
    @action setIsShowSearchInput = (data = false) => {
        this.isShowSearchInput = data;
    }
    @action setIsShowSearchInput02 = () => {
        this.isShowSearchInput = !toJS( this.isShowSearchInput );
    }

    // 搜索结果
    @observable searchResultList = [];
    @action setSearchResultList = (data = []) => {
        this.searchResultList = data;
    }

}

export default new State();