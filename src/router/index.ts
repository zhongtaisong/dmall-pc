import Login from '@pages/login';
import Register from '@pages/register';
import GoodsList from '@pages/goods-list';
import UserCenter from '@pages/user-center';
import I18nPage from '@pages/i18n-page';

export const ROUTE_LIST = [
  {
    pathname: '/',
    component: GoodsList,
    title: '首页',
    exact: true,
  },
  {
    pathname: '/user-center',
    component: UserCenter,
    title: '用户中心',
    exact: true,
  },
  {
    pathname: '/i18n-page',
    component: I18nPage,
    title: '多语言维护',
    exact: true,
  },
];

export const ROUTE_LIST_PUBLIC = [
  {
    pathname: '/login',
    component: Login,
    title: '登录',
    exact: true,
  },
  {
    pathname: '/register',
    component: Register,
    title: '注册',
    exact: true,
  },
];
