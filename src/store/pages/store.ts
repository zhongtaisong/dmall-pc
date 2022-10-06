import { makeAutoObservable, runInAction } from "mobx";

/**
 * 全局共享数据
 */
export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 是否显示loading
     */
    isLoading: boolean = false;
    /**
     * 开启、关闭 - loading
     * @param value 
     */
    setIsLoadingFn = (value: boolean) => {
        if(!value) {
            setTimeout(() => {
                runInAction(() => {
                    this.isLoading = false;
                });
            }, 500);
        }else {
            this.isLoading = true;
        }
    }

    /**
     * 动态设置Mobx数据
     * @param params 
     * @returns 
     */
    setMobxStoreFn = (params) => {
        if(!params) return;

        // Object
        if(Object.keys(params).length) {
            const { key, value, } = params;
            if( key in this) {
                this[key] = value;
            }
        }

        // Array
        if(Array.isArray(params)) {
            params.forEach(item => {
                this.setMobxStoreFn(item);
            });
        }
        
    }

};
