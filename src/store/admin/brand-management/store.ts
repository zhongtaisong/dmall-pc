import { makeAutoObservable, runInAction } from "mobx";
import {
    adminBrandsSelectService, 
    IAdminBrandsSelectParams,
    adminBrandsAddService,
    adminBrandsUpdateService,
    IAdminBrandsUpateParams,
    adminBrandsDeleteService,
} from './service';
import { PAGE_SIZE, SUCCESS_CODE } from "@config";
import { IBrandInfo } from "./type";

export default class Store {

    constructor() {
        makeAutoObservable(this);
    }

    /** 数据总数 */
    total = 0;

    /** 列表数据 */
    dataSource: Array<IBrandInfo> = [];

    /** 查询 - 接口入参 */
    requestParams: Partial<IAdminBrandsSelectParams> = {
        current: 0,
        pageSize: PAGE_SIZE,
    };

    /**
     * 查询 - 品牌列表
     * @param params 
     */
    adminBrandsSelectServiceFn = async (params?: IAdminBrandsSelectParams) => {
        const requestParams = {
            ...this.requestParams,
            ...params,
        };

        const result = await adminBrandsSelectService(requestParams);

        const { dataSource, total, } = result?.data?.content || {};
        runInAction(() => {
            this.dataSource = dataSource || [];
            this.total = total ?? 0;
            this.requestParams = requestParams;
        });
    }

    /**
     * 添加品牌 - 操作
     * @param params 
     */
    adminBrandsAddServiceFn = async (params: {
        /** 品牌名称 */
        brand_name: string;
    }) => {
        const result = await adminBrandsAddService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            this.adminBrandsSelectServiceFn();
        }

        return result?.data?.code === SUCCESS_CODE;
    }

    /**
     * 更新品牌 - 操作
     * @param params 
     */
    adminBrandsUpdateServiceFn = async (params: IAdminBrandsUpateParams) => {
        const result = await adminBrandsUpdateService(params);
        if(result?.data?.code === SUCCESS_CODE) {
            this.adminBrandsSelectServiceFn();
        }

        return result?.data?.code === SUCCESS_CODE;
    }

    /**
     * 删除品牌 - 操作
     * @param brand_id 
     * @returns 
     */
    adminBrandsDeleteServiceFn = async (brand_id: number) => {
        const result = await adminBrandsDeleteService(brand_id);
        if(result?.data?.code === SUCCESS_CODE) {
            this.adminBrandsSelectServiceFn();
        }
    }
    
};
