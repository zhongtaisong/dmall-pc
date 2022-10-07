/**
 * 菜单
 */
export const MENU_LIST: Array<{
    name: string;
    pathname?: string;
}> = [
    {
        name: '我的订单',
        pathname: '/views/my-order'
    },
    {
        name: '我的收藏',
        pathname: '/views/my-collection'
    },
    {
        name: '用户中心',
        pathname: '/views/user-center'
    },
    {
        name: 'DemoMall管理后台',
        pathname: '/views/admin'
    },
];
