import Index from '@pages';
import Login from '@pages/login';
import Register from '@pages/register';

import Home from '@pages/home';
import GoodsList from '@pages/goods-list';
import GoodsDetail from '@pages/goods-detail';
import UserCenter from '@pages/user-center';

/**
 * 核心页面路由
 *
 * isOpen - 是否有权限访问
 */
export const PAGE_ROUTER = [
  {
    pathname: '/views',
    redirect: '/views/home',
    title: '首页',
    isOpen: true,
  },
  {
    pathname: '/views/home',
    component: Home,
    title: '首页',
    isOpen: true,
  },
  {
    pathname: '/views/goods-list/:keyword?',
    component: GoodsList,
    title: '商品列表',
    isOpen: true,
  },
  {
    pathname: '/views/user-center',
    component: UserCenter,
    title: '用户中心',
    isOpen: false,
  },
  {
    pathname: '/views/goods-detail/:id',
    component: GoodsDetail,
    title: '商品详情',
    isOpen: true,
  },
];

/**
 * 根路由
 */
export const ROOT_ROUTER = [
  {
    pathname: '/',
    redirect: '/views',
    title: '首页',
  },
  {
    pathname: '/views',
    component: Index,
    title: '首页',
  },
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
