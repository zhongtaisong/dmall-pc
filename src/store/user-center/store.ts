import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import { 
    selectUserInformationService, 
    updateUserInformationService, 
    updateUserPasswordService,
    IUpdateUserPassword,
    IAddAddressService,
    addAddressService,
    IUpdateAddressService,
    updateAddressService,
    deleteAddressService,
} from './service';
// mobx数据
import store from '@store';
import { cacheKey } from "@utils";
import { getUserInfo } from "@utils/common-fn";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 查询 - 用户信息 - 操作
     * @param callBack 
     */
    selectUserInformationServiceFn = async (callBack: Function) => {
        const result = await selectUserInformationService();
        const personalInformation = result?.data?.content;
        callBack?.({
            ...personalInformation,
            birthday: personalInformation?.birthday ? moment(personalInformation?.birthday) : null,
            avatar: [{
                uid: Date.now(),
                name: 'image.png',
                status: 'done',
                url: personalInformation?.avatar,
            }],
        });
    }

    /**
     * 更新 - 用户信息 - 操作
     * @param params 
     */
    updateUserInformationServiceFn = async (params: FormData) => {
        const result = await updateUserInformationService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            const user_info = {
                ...getUserInfo(),
                ...result?.data?.content,
            };
            
            const key = cacheKey.USER_INFO;
            const val = JSON.stringify(user_info || {});
            localStorage.setItem(key, val);
            sessionStorage.setItem(key, val);
            runInAction(() => {
                store.headerBarStore.setMobxStoreFn({
                    key: 'welcomeObjectName',
                    value: user_info?.nickName || user_info?.uname,
                });
            })
        }
    }

    /**
     * 修改登录密码 - 操作
     * @param params 
     */
    updateUserPasswordServiceFn = (params: IUpdateUserPassword) => {
        return updateUserPasswordService(params);
    }

    /** 收货地址 - 列表数据 */
    dataSource = [];

    /**
     * 查询 - 收货地址 - 操作
     */
    selectAddressListServiceFn = async () => {
        const result = await store.commonStore.selectAddressListServiceFn();
        runInAction(() => {
            this.dataSource = result;
        });
    }

    /**
     * 添加 - 收货地址 - 操作
     * @param params 
     * @param callBack 
     */
    addAddressServiceFn = async (params: IAddAddressService, callBack: Function) => {
        const result = await addAddressService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            this.selectAddressListServiceFn();
            callBack?.();
        }
    }

    /**
     * 更新 - 收货地址 - 操作
     * @param params 
     * @param callBack 
     */
    updateAddressServiceFn = async (params: IUpdateAddressService, callBack: Function) => {
        const result = await  updateAddressService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            this.selectAddressListServiceFn();
            callBack?.();
        }
    }

    /**
     * 删除 - 收货地址 - 操作
     * @param id 
     */
    deleteAddressServiceFn = async (id: number | string) => {
        const result = await deleteAddressService(id);
        if(result?.data?.code === SUCCESS_CODE) {
            this.selectAddressListServiceFn();
        }
    }

    /** 是否显示 - 收货地址弹窗 */
    isAddressModal = false;

    /** 收货地址 - 行数据 */
    addressItem: Partial<IUpdateAddressService> = {};

    /**
     * 打开、关闭 - 收货地址弹窗
     * @param bol 
     * @param params 
     */
    onToggleAddressModalClick = (bol: boolean, params = {}) => {
        this.isAddressModal = bol;
        this.addressItem = params;
    }
    
};
