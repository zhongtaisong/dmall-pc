import Login from '@pages/login';
import Register from '@pages/register';
import GoodsList from '@pages/goods-list';
import UserCenter from '@pages/user-center';

export const ROUTE_LIST = [
  {
    pathname: '/',
    component: GoodsList,
    title: '首页',
  },
  {
    pathname: '/user-center',
    component: UserCenter,
    title: '用户中心',
    isOpen: false,
  },
];

export const ROUTE_LIST_PUBLIC = [
  {
    pathname: '/login',
    component: Login,
    title: '登录',
  },
  {
    pathname: '/register',
    component: Register,
    title: '注册',
  },
];
