import React from 'react';
import { Row, Col, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '@store';
// less样式
import './index.less';
import { history } from '@utils';
import { getURLSearchParamsFn } from '@utils/common-fn';

/**
 * 搜索区域
 */
@observer
class SearchArea extends React.PureComponent<
  Partial<RouteComponentProps>,
  any
> {
  render() {
    const { keyword } = getURLSearchParamsFn();

    return (
      <>
        <div className='dm_SearchArea'>
          <Row className='common_width dm_SearchArea__content'>
            <Col
              span={4}
              className='dm_SearchArea__content--logo'
              onClick={() => history.push('/')}
            >
              <svg className='icon-font' aria-hidden='true'>
                <use xlinkHref='#icon-logo'></use>
              </svg>
            </Col>

            <Col
              span={18}
              offset={2}
              className='dm_SearchArea__content--search'
            >
              <Input.Search
                className='dm_SearchArea__content--search__input'
                placeholder='搜索商品'
                enterButton
                defaultValue={keyword || ''}
                onSearch={this.getSearchKws}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }

  /**
   * 获取搜索关键字
   * @param value 关键字
   * @returns
   */
  getSearchKws = (value: string) => {
    const { pathname } = this.props?.location || {};
    const { keyword } = getURLSearchParamsFn();
    const { isLoading } = store?.pagesStore || {};
    if (pathname !== '/') {
      history.push(`/?keyword=${value || ''}`);
    } else {
      if (isLoading || keyword === value) return;

      window.history.pushState({}, '', `/?keyword=${value || ''}`);
      store.goodsListStore.goodsListSelectServiceFn({
        pageNum: 0,
        goods_name: value || '',
      });
    }
  };
}

export default SearchArea;
