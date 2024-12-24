import type { RcFile } from 'antd/es/upload/interface';
import lodash from 'lodash';
import { removeItem } from '@analytics/storage-utils';
import { cache } from './cache';
import { dmHistory } from './history';

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = (): {
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户联系电话
   */
  phone: string;
  /**
   * 登录凭证
   */
  token: string;
  role: string;
} => {
  let user_info;
  try {
    user_info = JSON.parse(
      sessionStorage.getItem(cache.LOGIN_INFO) ||
        localStorage.getItem(cache.LOGIN_INFO),
    );
  } catch (error) {
    console.log(error);
  }
  return user_info || {};
};

/**
 * 是否已登录
 */
export const isLogin = (): boolean => {
  return Boolean(window?.token || getUserInfo?.()?.token);
};

/**
 * file图片数据转为base64
 * @param file
 * @returns
 */
export const fileToBase64 = (file: RcFile) => {
  if (!file || !Object.keys(file).length) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * 校验图片尺寸 - 操作
 * @param file
 * @returns
 */
export const checkSize = (
  file,
  width: Array<number>,
  height: Array<number>,
): Promise<string | boolean> => {
  if (!Array.isArray(width) || !width.length) return Promise.resolve(false);
  if (!Array.isArray(height) || !height.length) return Promise.resolve(false);

  return new Promise((resolve) => {
    const _URL = window?.URL || window?.webkitURL;
    const img = new Image();
    img.src = _URL.createObjectURL(file?.originFileObj || file);
    img.onload = () => {
      if (!width.includes(img.width)) {
        return resolve(`图片尺寸不对，宽度为${width.join(' 或 ')}！`);
      }

      if (!height.includes(img.height)) {
        return resolve(`图片尺寸不对，高度为${height.join(' 或 ')}！`);
      }

      resolve(false);
    };
  });
};

/**
 * 校验 - 手机号码
 * @param value
 * @returns
 */
export const validatePhone = (value: string, t: (text: string) => string) => {
  if (!value?.trim?.()) {
    return Promise.reject(t(`请输入手机号码`));
  }

  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(value)) {
    return Promise.reject(t(`请输入正确的手机号码`));
  }

  return Promise.resolve();
};

/**
 * 校验 - 用户名
 * @param value
 * @returns
 */
export const validateUname = (value) => {
  value = value?.trim?.();
  if (!value) {
    return Promise.reject('请输入用户名');
  }

  const reg = /[A-Za-z0-9]{2,64}/;
  if (!reg.test(value)) {
    if (value?.length >= 2 && value?.length <= 64) {
      return Promise.reject('用户名仅支持输入大小写英文、数字及其组合');
    }

    return Promise.reject('用户名限制在2到64个字符');
  }

  return Promise.resolve();
};

/**
 * 商品价格 - 格式化操作
 * @param val
 * @param precision
 * @returns
 */
export const formatPriceFn = (val: number | string, precision = 2) => {
  const val_new = Number(val) || 0;
  if (!precision || typeof precision !== 'number') {
    precision = 2;
  }

  return val_new?.toFixed?.(precision) || '0.00';
};

/**
 * 获取url后参数 - 操作
 * 如：location.search 为 "?from=&code=123&state=666"
 * @returns
 */
export const getURLSearchParamsFn = (): IObject => {
  const search_val = window.location.search;
  const params = {};

  if (!search_val) return params;

  const searchParams = new URLSearchParams(search_val);
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};

export const handleListFn = <T extends IObject>(
  list: Array<T>,
  key: keyof T,
  t: (val: string) => void,
) => {
  if (!Array.isArray(list) || !list.length || !key || typeof t !== 'function')
    return [];

  const data = lodash.cloneDeep(list);
  data.forEach((item) => {
    if (item && Object.keys(data).length) {
      Object.assign(item, {
        [key]: t(item?.[key] || ''),
      });
    }
  });

  return data;
};

/**
 * 跳转登录页 - 操作
 * @returns
 */
export const onNavigateToLoginClick = () => {
  const pathname = window?.location?.pathname;

  const login_path = '/login';
  if (pathname === login_path) return;

  removeItem(cache.LOGIN_INFO);
  dmHistory.push('/login');
};
