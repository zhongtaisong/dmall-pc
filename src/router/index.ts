import Home from '@pages/home';
import GoodsList from '@pages/goods-list';
import GoodsDetail from '@pages/goods-detail';
import ShoppingCart from '@pages/shopping-cart';
import SettlementPage from '@pages/settlement-page';
import OrderDetails from '@pages/order-details';
import MyCollection from '@pages/my-collection';
import MyEvaluation from '@pages/my-evaluation';
import MyOrder from '@pages/my-order';
import WebsiteDescription from '@pages/website-description';
import UserCenter from '@pages/user-center';
import MessageBoard from '@pages/message-board';
import BrandList from '@pages/admin/goods-manage/brand-list';
import ProductList from '@pages/admin/goods-manage/goods-list';
import OrdersList from '@pages/admin/orders-manage/order-list';
import UsersManageList from '@pages/admin/users-manage/user-list';
import CommentsManageList from '@pages/admin/comments-manage/comment-list';
import AdminList from '@pages/admin/admin-list';

/**
 * 核心页面路由
 * 
 * isOpen - 是否有权限访问
 */
export default [
    { 
        id: 1,
        pathname: '/views',
        redirect: '/views/home',
        title: '首页',
        isOpen: true,
    },
    { 
        id: 2,
        pathname: '/views/home',
        name: 'Home',
        component: Home,
        title: '首页',
        isOpen: true,
    },
    { 
        id: 3,
        pathname: '/views/goods-list/:keyword?',
        name: 'GoodsList',
        component: GoodsList,
        title: '杂货铺',
        isOpen: true,
    },
    { 
        id: 4,
        pathname: '/views/web',
        name: 'WebsiteDescription',
        component: WebsiteDescription,
        title: '网站说明',
        isOpen: true,
    },
    { 
        id: 5,
        pathname: '/views/message-board',
        name: 'MessageBoard',
        component: MessageBoard,
        title: '留言板',
        isOpen: true,
    },
    { 
        id: 6,
        pathname: '/views/shopping-cart',
        name: 'ShoppingCart',
        component: ShoppingCart,
        title: '我的购物车',
        isOpen: false,
    },
    { 
        id: 7,
        pathname: '/views/order',
        name: 'MyOrder',
        component: MyOrder,
        title: '我的订单',
        isOpen: false,
    },
    { 
        id: 8,
        pathname: '/views/collection',
        name: 'MyCollection',
        component: MyCollection,
        title: '我的收藏',
        isOpen: false,
    },
    { 
        id: 9,
        pathname: '/views/user',
        name: 'UserCenter',
        component: UserCenter,
        title: '用户中心',
        isOpen: false,
    },
    { 
        id: 10,
        pathname: '/views/goods-detail/:id',
        name: 'GoodsDetail',
        component: GoodsDetail,
        title: '商品详情',
        isOpen: true,
    },
    { 
        id: 11,
        pathname: '/views/goods/cart/settlement',
        name: 'SettlementPage',
        component: SettlementPage,
        title: '结算页',
        isOpen: false,
    },
    { 
        id: 12,
        pathname: '/views/order-details/:ordernum',
        name: 'OrderDetails',
        component: OrderDetails,
        title: '订单详情',
        isOpen: false,
    },
    { 
        id: 13,
        pathname: '/views/goods/cart/evaluate',
        name: 'MyEvaluation',
        component: MyEvaluation,
        title: '我的评价',
        isOpen: false,
    },
    { 
        id: 14,
        pathname: '/views/admin',
        redirect: '/views/admin/brand',
        title: '商城后台',
        isOpen: false,
    },
    {
        id: 15,
        pathname: '/views/admin/brand',
        name: 'BrandList',
        component: BrandList,
        title: '商品管理-品牌',
        isOpen: false,
    },
    {
        id: 16,
        pathname: '/views/admin/product',
        name: 'ProductList',
        component: ProductList,
        title: '商品管理-商品',
        isOpen: false,
    },
    {
        id: 17,
        pathname: '/views/admin/order',
        name: 'OrdersList',
        component: OrdersList,
        title: '订单管理-订单',
        isOpen: false,
    },
    {
        id: 18,
        pathname: '/views/admin/user',
        name: 'UsersManageList',
        component: UsersManageList,
        title: '用户管理-用户',
        isOpen: false,
    },
    {
        id: 19,
        pathname: '/views/admin/comment',
        name: 'CommentsManageList',
        component: CommentsManageList,
        title: '评论管理-评论',
        isOpen: false,
    },
    {
        id: 20,
        pathname: '/views/admin/admin',
        name: 'AdminList',
        component: AdminList,
        title: '管理员列表',
        isOpen: false,
    }
];
