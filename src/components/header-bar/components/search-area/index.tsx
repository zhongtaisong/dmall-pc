import React from 'react';
import { Row, Col, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '@store';
// less样式
import './index.less';

/**
 * 搜索区域
 */
@observer
class SearchArea extends React.PureComponent<
  Partial<RouteComponentProps>,
  any
> {
  render() {
    const { history, location } = this.props;
    const keyword = location.pathname.split('/')?.[3] || '';

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
                defaultValue={keyword}
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
    const { isLoading } = store?.pagesStore || {};
    if (isLoading) return;

    store.goodsListStore.goodsListSelectServiceFn({
      pageNum: 0,
      goods_name: value || '',
    });
  };
}

export default SearchArea;
