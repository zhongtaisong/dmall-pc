import axios from "axios";
import { message } from 'antd';
import { commonFn } from "@utils";
import { validResponseCode } from "@utils/common-fn";
// 设置
import { PUBLIC_URL, BLACK_LIST_PATH } from '@config';
// 全局数据
import globalState from '@store';

const $axios = axios.create({
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
$axios.interceptors.request.use(
    config => {
        if(!requestNum) {
            // 开启loading
            globalState.setIsLoading(true);
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
        globalState.setIsLoading(false);

        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
$axios.interceptors.response.use(
    response => {
        // 接口请求次数减1
        requestNum--;
        if(requestNum <= 0) {
            // 关闭loading
            globalState.setIsLoading(false);
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
            globalState.setIsLoading(false);
        }

        return Promise.reject(error);
    }
);

export default $axios;