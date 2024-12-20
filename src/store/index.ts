import CommonStore from './common/store';
import PagesStore from './pages/store';
import HeaderBarStore from './header-bar/store';
import GoodsListStore from './goods-list/store';
import LoginStore from './login/store';
import RegisterStore from './register/store';
import UserCenterStore from './user-center/store';

export default {
  commonStore: new CommonStore(),
  pagesStore: new PagesStore(),
  headerBarStore: new HeaderBarStore(),
  goodsListStore: new GoodsListStore(),
  loginStore: new LoginStore(),
  registerStore: new RegisterStore(),
  userCenterStore: new UserCenterStore(),
};
