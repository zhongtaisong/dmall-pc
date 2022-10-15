import React from 'react';
import { observer } from 'mobx-react';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 热门推荐
 */
@observer
class HotThisWeek extends React.PureComponent<any, any> {
    render() {
        const { hotThisWeekList } = store?.homeStore || {};
        if(!hotThisWeekList?.length) return null;

        return (
            <div className='common_width dm_HotThisWeek'>
                <div className='dm_HotThisWeek__title'>热门推荐</div>
                <ul className='dm_HotThisWeek__content'>
                    {
                        hotThisWeekList.map(item => {
                            const price = !Number.isNaN(Number(item?.price)) ? Number(item.price).toFixed(2) : 0.00;
                            return (
                                <li 
                                    key={ item?.id }
                                    className='dm_HotThisWeek__content--item'
                                >
                                    <img src={ item?.main_picture } alt="商品图片" 
                                        onClick={() => window.open(`/views/goods-detail/${ item?.id }`)}
                                    />
                                    <div className='dm_HotThisWeek__content--item__text'>
                                        <div className='dm_HotThisWeek__content--item__text--title'>
                                            <span 
                                                className='single_line_ellipsis'
                                                onClick={() => window.open(`/views/goods-detail/${ item?.id }`)}
                                            >{ item?.goods_name }</span>
                                            <div className='two_line_ellipsis'>{ item.description }</div>
                                        </div>
                                        <div className='dm_HotThisWeek__content--item__text--price'>
                                            <span>￥</span>
                                            <p>{  price }</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default HotThisWeek;