import React from 'react';
// 大图推广 - 组件
import CarouselBox from './components/carousel-box';
// 热门推荐 - 组件
import HotThisWeek from './components/hot-this-week';
import './index.less';

/**
 * 首页
 */
class Home extends React.PureComponent<any, any> {
    render() {
        return (
            <div className='dm_Home'>
                <CarouselBox {...this.props} />
                <HotThisWeek {...this.props} />
            </div>
        );
    }
}

export default Home;