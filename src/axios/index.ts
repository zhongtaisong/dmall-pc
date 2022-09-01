import axios from "axios";
import { message } from 'antd';
import { commonFn } from "@utils";
import { validResponseCode } from "@utils/common-fn";
// 设置
import { PUBLIC_URL, SUCCESS_CODE, } from '@config';
// 全局数据
import store from '@store';

/** 创建axios实例 */
const axiosInstance = axios.create({
    baseURL: PUBLIC_URL,
    // 30s
    timeout: 30 * 1000,
    withCredentials: true,
});

// 累计接口请求次数
let requestNum = 0;

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
    config => {
        if(!requestNum) {
            // 开启loading
            store?.pagesStore?.setIsLoadingFn?.(true);
        }

        const headersParams = {};
        const { token, uname } = commonFn?.getUserInfo() || {};
        if(token) {
            headersParams['Authorization'] = token;
        }
        if(uname) {
            headersParams['uname'] = uname;
        }
        config.headers = {
            ...config.headers,
            ...headersParams,
        };

        // 接口请求次数加1
        requestNum++;
        return config;
    }, 
    error => {
        // 关闭loading
        store?.pagesStore?.setIsLoadingFn?.(false);

        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
    response => {
        // 接口请求次数减1
        requestNum--;
        if(requestNum <= 0) {
            // 关闭loading
            store?.pagesStore?.setIsLoadingFn?.(false);
        }
        
        // 统一处理提示
        if(response?.data && Object.keys(response?.data).length) {
            const { code, msg, } = response?.data || {};
            if(code === SUCCESS_CODE) {
                msg && message.success(msg);
            }else {
                msg && message.error(msg);
            }
        }
        return response;
    }, 
    error => {
        // 校验 - 接口响应内容
        const msg = validResponseCode(error);
        if(msg) {
            message.error(msg);
        }
        
        // 接口请求次数减1
        requestNum--;
        if(requestNum <= 0) {
            // 关闭loading
            store?.pagesStore?.setIsLoadingFn?.(false);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;