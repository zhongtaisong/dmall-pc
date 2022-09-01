import React from 'react';
// 大图推广 - 组件
import CarouselBox from './components/carousel-box';
// 热门推荐 - 组件
import HotThisWeek from './components/hot-this-week';
// mobx数据
import store from '@store';
import './index.less';

/**
 * 首页
 */
export default class Home extends React.PureComponent<any, any> {

    componentDidMount(): void {
        store.homeStore.largeScalePromotionServiceFn();
        store.homeStore.hotRecommendationsServiceFn();
    }

    render() {
        return (
            <div className='dm_Home'>
                <CarouselBox />
                <HotThisWeek />
            </div>
        );
    }
};
