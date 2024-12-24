import axios from 'axios';
import { message } from 'antd';
import { commonFn } from '@utils';
// 设置
import { AUTH_CODE, SERVICE_URL, SUCCESS_CODE } from '@config';
// 全局数据
import store from '@store';
import { onNavigateToLoginClick } from '@utils/common-fn';
import { getCurrentLanguageInfoFn } from '@i18n/index';

/** 创建axios实例 */
const axiosInstance = axios.create({
  baseURL: SERVICE_URL,
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
  (config) => {
    if (!requestNum) {
      // 开启loading
      store?.pagesStore?.setIsLoadingFn?.(true);
    }

    const headersParams = {};
    const { token } = commonFn?.getUserInfo() || {};
    if (token) {
      headersParams['Authorization'] = `Bearer ${token}`;
    }
    config.headers = {
      ...config.headers,
      ...headersParams,
      terminal: 'PC',
      lang: getCurrentLanguageInfoFn()?.key || '',
    };

    // 接口请求次数加1
    requestNum++;
    return config;
  },
  (error) => {
    // 关闭loading
    store?.pagesStore?.setIsLoadingFn?.(false);

    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
  (response) => {
    const url = response?.config?.url || '';

    // 接口请求次数减1
    requestNum--;
    if (requestNum <= 0) {
      // 关闭loading
      store?.pagesStore?.setIsLoadingFn?.(false);
    }

    // 统一处理提示
    if (response?.data && Object.keys(response?.data).length) {
      const { code } = response?.data || {};
      const msg = response?.data?.message;
      if (msg && !url.includes('msg=false')) {
        if (code === SUCCESS_CODE) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      }

      if (code !== SUCCESS_CODE) {
        switch (code) {
          case AUTH_CODE:
            onNavigateToLoginClick();
            break;
        }
      }
    }
    return response;
  },
  (error) => {
    // 接口请求次数减1
    requestNum--;

    if (requestNum <= 0) {
      // 关闭loading
      store?.pagesStore?.setIsLoadingFn?.(false);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
