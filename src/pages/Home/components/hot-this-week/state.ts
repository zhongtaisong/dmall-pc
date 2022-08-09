import { SUCCESS_CODE } from '@config';
import { action, observable, makeAutoObservable } from 'mobx';
import { selectHotRecommendations } from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    /**
     * 查询 - 热门推荐商品 - 操作
     */
    selectHotRecommendationsFn = async () => {
        const res = await selectHotRecommendations();
        if(res?.data?.code === SUCCESS_CODE ){
            this.setDataSource(res?.data?.content || []);
        }
    }
    
}

export default new State();