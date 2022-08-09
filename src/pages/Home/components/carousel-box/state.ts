import { SUCCESS_CODE } from '@config';
import { action, observable, makeAutoObservable } from 'mobx';
import { selectLargeScalePromotion } from './service';

class State {

    constructor() {
        makeAutoObservable(this);
    }

    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    /**
     * 查询 - 大图推广商品 - 操作
     */
    selectLargeScalePromotionFn = async () => {
        const res = await selectLargeScalePromotion();
        if(res?.data?.code === SUCCESS_CODE ){
            this.setDataSource(res?.data?.content || []);
        }
    }

}

export default new State();