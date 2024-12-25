import React from 'react';
const Login = React.lazy(
  () => import(/* webpackChunkName: "login" */ '@pages/login'),
);
const Register = React.lazy(
  () => import(/* webpackChunkName: "register" */ '@pages/register'),
);
const GoodsList = React.lazy(
  () => import(/* webpackChunkName: "goods-list" */ '@pages/goods-list'),
);
const UserCenter = React.lazy(
  () => import(/* webpackChunkName: "user-center" */ '@pages/user-center'),
);
const I18nPage = React.lazy(
  () => import(/* webpackChunkName: "i18n-page" */ '@pages/i18n-page'),
);

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
