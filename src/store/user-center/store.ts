import { SUCCESS_CODE } from "@config";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import { 
    selectUserInformationService, 
    updateUserInformationService, 
    IUserInformation,
    updateUserPasswordService,
    IUpdateUserPassword,
    selectAddressListService,
    IAddAddressService,
    addAddressService,
    IUpdateAddressService,
    updateAddressService,
    deleteAddressService,
} from './service';

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
        });
    }

    /**
     * 更新 - 用户信息 - 操作
     * @param params 
     */
    updateUserInformationServiceFn = async (params: IUserInformation) => {
        await updateUserInformationService(params);
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
        const result = await selectAddressListService();
        runInAction(() => {
            this.dataSource = result?.data?.content || [];
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
