import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh_i18n_json from './language/zh-i18n-pc.json';
import en_i18n_json from './language/en-i18n-pc.json';
import ru_i18n_json from './language/ru-i18n-pc.json';
import { getItem } from '@analytics/storage-utils';
import { cache } from '@utils/cache';
import { LANGUAGE_LIST } from '@config';

export const getCurrentLanguageInfoFn = () => {
  let result = getItem(cache.LANGUAGE_INFO, {
    storage: 'localStorage',
  });

  if (!result || !Object.keys(result).length) {
    result = LANGUAGE_LIST?.[0] || {};
  }

  return result as Partial<{
    key: string;
    label: string;
  }>;
};

export const isZhCNFn = () => getCurrentLanguageInfoFn()?.key === 'zh';

// 定义翻译资源
const resources = {
  zh: {
    translation: { ...zh_i18n_json },
  },
  en: {
    translation: { ...en_i18n_json },
  },
  ru: {
    translation: { ...ru_i18n_json },
  },
};

// 初始化 i18next
i18n.use(initReactI18next).init({
  resources,
  lng: getCurrentLanguageInfoFn()?.key, // 默认语言
  interpolation: {
    escapeValue: false, // React 默认已经安全处理
  },
});

export const dmI18n = i18n;
