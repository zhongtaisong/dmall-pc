/**
 * 前台菜单
 */
export const MENU_LIST_FRONT = [
  {
    name: '首 页',
    pathname: '/views/home',
  },
  {
    name: '杂货铺',
    pathname: '/views/goods-list',
  },
  {
    name: '网站说明',
    pathname: '/views/web',
  },
  {
    name: '留言板',
    pathname: '/views/message-board',
  },
];

/**
 * 后台菜单
 */
export const MENU_LIST_BACK = [
  {
    name: '品牌管理',
    pathname: '/views/admin/brand-management',
    authKey: 'brandMenu',
  },
  {
    name: '商品管理',
    pathname: '/views/admin/goods-management',
    authKey: 'productMenu',
  },
  {
    name: '订单管理',
    pathname: '/views/admin/order-management',
    authKey: 'orderMenu',
  },
  {
    name: '用户管理',
    pathname: '/views/admin/user-management',
    authKey: 'userMenu',
  },
  {
    name: '评价管理',
    pathname: '/views/admin/goods-evaluate-management',
    authKey: 'commentMenu',
  },
  {
    name: '权限管理',
    pathname: '/views/admin/permission-management',
    authKey: 'adminMenu',
  },
];
