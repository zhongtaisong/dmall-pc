import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import App from './App';
// 国际化设置
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
// less根样式
import './index.less';

moment.locale('zh-cn');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
);
