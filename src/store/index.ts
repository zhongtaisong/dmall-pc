import PagesStore from './pages/store';
import HeaderBarStore from './header-bar/store';
import HomeStore from './home/store';
import GoodsListStore from './goods-list/store';
import GoodsDetailStore from './goods-detail/store';
import MessageBoardStore from './message-board/store';
import LoginStore from './login/store';

export default {
    pagesStore: new PagesStore(),
    headerBarStore: new HeaderBarStore(),
    homeStore: new HomeStore(),
    goodsListStore: new GoodsListStore(),
    goodsDetailStore: new GoodsDetailStore(),
    messageBoardStore: new MessageBoardStore(),
    loginStore: new LoginStore(),
};
