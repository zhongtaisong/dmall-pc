import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
// 用户菜单
import TopMenu from './components/top-menu';
// 搜索区域
import SearchArea from './components/search-area';
// less样式
import './index.less';

/**
 * 顶部导航
 */
@observer
class HeaderBar extends React.PureComponent<RouteComponentProps, any> {
  render() {
    return (
      <div className='dm_HeaderBar'>
        <div>
          <TopMenu {...this.props} />
          <SearchArea {...this.props} />
        </div>
      </div>
    );
  }
}

export default HeaderBar;
