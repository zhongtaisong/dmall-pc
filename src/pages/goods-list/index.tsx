import React from 'react';
import { Pagination, Empty } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { formatPriceFn, getURLSearchParamsFn } from '@utils/common-fn';
// mobx数据
import store from '@store';
// 样式
import './index.less';

interface IComponentPros {
  /**
   * 搜索关键字
   */
  keyword?: string;
}

interface IComponentState {
  /**
   * 当前选中的筛选条件
   */
  filterParams: {
    [key: string]: string | number;
  };
}

/**
 * 商品列表
 */
@observer
class GoodsList extends React.PureComponent<
  RouteComponentProps<IComponentPros>,
  IComponentState
> {
  componentDidMount() {
    const { keyword } = getURLSearchParamsFn();

    // 查询商品列表
    this.goodsListSelectServiceFn({
      goods_name: keyword || '',
    });
  }

  render() {
    const { requestParams, total } = store?.goodsListStore || {};

    return (
      <div className='dm_Products'>
        <div className='common_width dm_Products__content'>
          {/* 商品列表 */}
          {this.renderGoodsList()}

          {total ? (
            <Pagination
              current={requestParams?.pageNum + 1}
              pageSize={requestParams?.pageSize}
              total={total}
              onChange={(page, pageSize) => {
                this.goodsListSelectServiceFn({
                  pageNum: page - 1,
                  pageSize,
                });
              }}
              showTotal={(total) => `共 ${total} 条`}
            />
          ) : null}
        </div>
      </div>
    );
  }

  /**
   * 查询 - 商品列表
   * @param params
   */
  goodsListSelectServiceFn = (params?: IObject) => {
    store.goodsListStore.goodsListSelectServiceFn({ ...params });
  };

  /**
   * 渲染 - 商品列表 - 组件
   * @returns
   */
  renderGoodsList = () => {
    const { dataSource } = store?.goodsListStore || {};
    if (!Array.isArray(dataSource) || !dataSource?.length) {
      return (
        <div className='dm_Products__content--empty'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      );
    }

    return (
      <ul className='dm_Products__content--goodsList'>
        {dataSource.map((item) => {
          if (!item || !Object.keys(item).length) return null;

          return (
            <li
              key={item?.id}
              className='dm_Products__content--goodsList__item'
            >
              <img src={item?.goods_imgs?.[0] || ''} alt='商品图片' />
              <div className='dm_Products__content--goodsList__item--text'>
                <div className='dm_Products__content--goodsList__item--text__title'>
                  <span>{item.goods_name}</span>
                  <div>{item.goods_subtitle}</div>
                </div>
                <div className='dm_Products__content--goodsList__item--text__price'>
                  <span>￥</span>
                  <p>{formatPriceFn(item?.goods_price)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
}

export default GoodsList;
