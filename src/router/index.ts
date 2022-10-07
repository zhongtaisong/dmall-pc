import Index from '@pages';
import Login from '@pages/login';
import Register from '@pages/register';

import Home from '@pages/home';
import GoodsList from '@pages/goods-list';
import GoodsDetail from '@pages/goods-detail';
import ShoppingCart from '@pages/shopping-cart';
import ConfirmOrder from '@pages/confirm-order';
import OrderDetails from '@pages/order-details';
import MyCollection from '@pages/my-collection';
import GoodsEvaluate from '@pages/goods-evaluate';
import MyOrder from '@pages/my-order';
import WebsiteDescription from '@pages/website-description';
import UserCenter from '@pages/user-center';
import MessageBoard from '@pages/message-board';
import BrandManagement from '@pages/admin/brand-management';
import ProductList from '@pages/admin/goods-manage/goods-list';
import OrderManagement from '@pages/admin/order-management';
import UsersManageList from '@pages/admin/users-manage/user-list';
import CommentsManageList from '@pages/admin/comments-manage/comment-list';
import AdminList from '@pages/admin/admin-list';

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
        title: '杂货铺',
        isOpen: true,
    },
    { 
        pathname: '/views/web',
        component: WebsiteDescription,
        title: '网站说明',
        isOpen: true,
    },
    { 
        pathname: '/views/message-board',
        component: MessageBoard,
        title: '留言板',
        isOpen: true,
    },
    { 
        pathname: '/views/shopping-cart',
        component: ShoppingCart,
        title: '购物车',
        isOpen: false,
    },
    { 
        pathname: '/views/my-order',
        component: MyOrder,
        title: '我的订单',
        isOpen: false,
    },
    { 
        pathname: '/views/my-collection',
        component: MyCollection,
        title: '我的收藏',
        isOpen: false,
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
    { 
        pathname: '/views/confirm-order',
        component: ConfirmOrder,
        title: '确认订单',
        isOpen: false,
    },
    { 
        pathname: '/views/order-details/:order_no',
        component: OrderDetails,
        title: '订单详情',
        isOpen: false,
    },
    { 
        pathname: '/views/goods-evaluate/:order_no',
        component: GoodsEvaluate,
        title: '商品评价中心',
        isOpen: false,
    },
    { 
        pathname: '/views/admin',
        redirect: '/views/admin/brand-management',
        title: 'DemoMall管理后台',
        isOpen: false,
    },
    {
        pathname: '/views/admin/brand-management',
        component: BrandManagement,
        title: '品牌管理',
        isOpen: false,
    },
    {
        pathname: '/views/admin/product',
        component: ProductList,
        title: '商品管理-商品',
        isOpen: false,
    },
    {
        pathname: '/views/admin/order-management',
        component: OrderManagement,
        title: '订单管理',
        isOpen: false,
    },
    {
        pathname: '/views/admin/user',
        component: UsersManageList,
        title: '用户管理-用户',
        isOpen: false,
    },
    {
        pathname: '/views/admin/comment',
        component: CommentsManageList,
        title: '评论管理-评论',
        isOpen: false,
    },
    {
        pathname: '/views/admin/admin',
        component: AdminList,
        title: '管理员列表',
        isOpen: false,
    }
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
