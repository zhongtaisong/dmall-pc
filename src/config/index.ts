// url前缀
export const PUBLIC_URL = 'http://127.0.0.1:8000/api/';
// 加密key
export const PWD_KEY = 'fjreqjklnvmsn9u9084931jj雨色轻风意柔情怜花殇12612132212';
// 路由黑名单
export const BLACK_LIST_PATH = [
    // 我的购物车
    '/views/goods/cart', 
    // 我的订单
    '/views/goods/order', 
    // 我的收藏
    '/views/goods/collection',
    // 用户中心
    '/views/user-center',
    // 结算页
    '/views/confirm-order',
    // 订单详情
    '/views/goods/cart/orderDetails'
];
// 路由白名单
export const WHITE_LIST_PATH = [
    // 首页
    '/views/home',
    // 杂货铺
    '/views/goods-list',
    // 网站说明
    '/views/web',
    // 留言
    '/views/message',
    // 商品详情
    '/views/goods-detail'
];

/**
 * 表格 - 每页条数
 */
export const PAGE_SIZE = 10;

/**
 * 初始密码
 */
export const INIT_PWD = Math.random().toString().slice(2, 8);

/**
 * 接口请求成功code
 */
export const SUCCESS_CODE = "DM-000000";

/** 
 * 管理后台页面 - 主页路由
 */
export const ADMIN_PATH_NAME = "/views/admin";
    