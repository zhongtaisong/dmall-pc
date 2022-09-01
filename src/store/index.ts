import PagesStore from './pages/store';
import HeaderBarStore from './header-bar/store';
import HomeStore from './home/store';
import GoodsListStore from './goods-list/store';

export default {
    pagesStore: new PagesStore(),
    headerBarStore: new HeaderBarStore(),
    homeStore: new HomeStore(),
    goodsListStore: new GoodsListStore(),
};
