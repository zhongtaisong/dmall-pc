import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 热门推荐
 */
@observer
class HotThisWeek extends React.PureComponent<any, any> {

    componentDidMount(): void {
        state.selectHotRecommendationsFn();
    }

    render() {
        const { dataSource } = state;
        if(!dataSource.length) return null;

        return (
            <div className='common_width dm_HotThisWeek'>
                <div className='dm_HotThisWeek__title'>热门推荐</div>
                <ul className='dm_HotThisWeek__content'>
                    {
                        dataSource.map(item => {
                            const price = !Number.isNaN(Number(item?.price)) ? Number(item.price).toFixed(2) : 0.00;
                            return (
                                <li 
                                    key={ item?.id }
                                    className='dm_HotThisWeek__content--item'
                                >
                                    <img src={ `${ PUBLIC_URL }${ item.mainPicture }` } alt="商品图片" 
                                        onClick={() => this.props?.history?.push?.(`/views/goods-detail/${ item?.id }`)}
                                    />
                                    <div className='dm_HotThisWeek__content--item__text'>
                                        <div className='dm_HotThisWeek__content--item__text--title'>
                                            <Link to={`/views/goods-detail/${ item?.id }`}>{ item.productName }</Link>
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