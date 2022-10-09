/**
 * 前台菜单
 */
export const MENU_LIST_FRONT = [
    {
        key: 1,
        name: "首 页",
        pathname: "/views/home",
    },
    {
        key: 2,
        name: "杂货铺",
        pathname: "/views/goods-list",
    },
    {
        key: 3,
        name: "网站说明",
        pathname: "/views/web",
    },
    {
        key: 4,
        name: "留言板",
        pathname: "/views/message-board",
    },
];

/**
 * 后台菜单
 */
 export const MENU_LIST_BACK = [
    {
        key: 1,
        name: "品牌管理",
        pathname: "/views/admin/brand-management",
        authKey: "brandMenu",
    },
    {
        key: 2,
        name: "商品管理",
        pathname: "/views/admin/product",
        authKey: "productMenu",
    },
    {
        key: 3,
        name: "订单管理",
        pathname: "/views/admin/order-management",
        authKey: "orderMenu",
    },
    {
        key: 4,
        name: "用户管理",
        pathname: "/views/admin/user",
        authKey: "userMenu",
    },
    {
        key: 5,
        name: "评价管理",
        pathname: "/views/admin/goods-evaluate-management",
        authKey: "commentMenu",
    },
    {
        key: 6,
        name: "权限管理",
        pathname: "/views/admin/adminList",
        authKey: "adminMenu",
    },
];
