/**
 * 菜单
 */
export const MENU_LIST: Array<{
    key: number;
    name: string;
    pathName?: string;
}> = [
    {
        key: 3,
        name: '我的订单',
        pathName: '/views/my-order'
    },
    {
        key: 4,
        name: '我的收藏',
        pathName: '/views/my-collection'
    },
    {
        key: 5,
        name: '用户中心',
        pathName: '/views/user-center'
    },
    {
        key: 6,
        name: '后台管理',
        pathName: '/views/admin'
    },
];
