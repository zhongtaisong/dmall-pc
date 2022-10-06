import CommonStore from './common/store';
import PagesStore from './pages/store';
import HeaderBarStore from './header-bar/store';
import HomeStore from './home/store';
import GoodsListStore from './goods-list/store';
import GoodsDetailStore from './goods-detail/store';
import MessageBoardStore from './message-board/store';
import LoginStore from './login/store';
import RegisterStore from './register/store';
import MyOrderStore from './my-order/store';
import OrderDetailsStore from './order-details/store';
import GoodsEvaluateStore from './goods-evaluate/store';
import UserCenterStore from './user-center/store';
import MyCollectionStore from './my-collection/store';
import ShoppingCartStore from './shopping-cart/store';
import ConfirmOrderStore from './confirm-order/store';

export default {
    commonStore: new CommonStore(),
    pagesStore: new PagesStore(),
    headerBarStore: new HeaderBarStore(),
    homeStore: new HomeStore(),
    goodsListStore: new GoodsListStore(),
    goodsDetailStore: new GoodsDetailStore(),
    messageBoardStore: new MessageBoardStore(),
    loginStore: new LoginStore(),
    registerStore: new RegisterStore(),
    myOrderStore: new MyOrderStore(),
    orderDetailsStore: new OrderDetailsStore(),
    goodsEvaluateStore: new GoodsEvaluateStore(),
    userCenterStore: new UserCenterStore(),
    myCollectionStore: new MyCollectionStore(),
    shoppingCartStore: new ShoppingCartStore(),
    confirmOrderStore: new ConfirmOrderStore(),
};
