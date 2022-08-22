// 接口服务
import service from './service';
import { makeAutoObservable } from "mobx";
import { SUCCESS_CODE } from '@config';

class State {

    constructor() {
        makeAutoObservable(this);
    }
}

export default new State();