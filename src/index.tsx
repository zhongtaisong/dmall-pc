import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import App from './App';
// 国际化设置
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import ruRu from 'antd/es/locale/ru_RU';
import './i18n';
import 'moment/locale/zh-cn';
// less根样式
import './index.less';
import { eventBus, IEventBus } from '@utils/event-bus';
import { getCurrentLanguageInfoFn } from './i18n';

moment.locale('zh-cn');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const MainComponent: React.FC = () => {
  const [languageInfo, setLanguageInfo] = useState(getCurrentLanguageInfoFn());

  useEffect(() => {
    const onLanguageChange = (data: IEventBus['onLanguageChange']) => {
      if (!data?.key) return;

      setLanguageInfo(data);
    };
    eventBus.on('onLanguageChange', onLanguageChange);

    return () => {
      eventBus.off('onLanguageChange', onLanguageChange);
    };
  }, []);

  const getLocale = useMemo(() => {
    switch (languageInfo?.key) {
      case 'zh':
        return zhCN;
      case 'en':
        return enUS;
      case 'ru':
        return ruRu;
      default:
        return zhCN;
    }
  }, [languageInfo]);

  return (
    <ConfigProvider locale={getLocale}>
      <App />
    </ConfigProvider>
  );
};

root.render(<MainComponent />);
