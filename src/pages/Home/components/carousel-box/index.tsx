import React from 'react';
import { Carousel } from 'antd';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { toJS } from 'mobx';
// url前缀
import { PUBLIC_URL } from '@config';
// 首页推荐
import Recommend from '../recommend';
// 数据
import state from './state';
// less样式
import './index.less';

// 走马灯区域 + 首页推荐
@observer
class CarouselBox extends React.PureComponent<any, any> {

    componentDidMount() {
        state.imgCarouselData();
    }

    render() {
        const { carouselList } = state;
        
        return (
            <div className='common_width'>
                <div className='dm_CarouselBox'>
                    {
                        carouselList.length ? (
                            <Carousel autoplay effect="fade">
                                {
                                    carouselList.map( item => {
                                        return (
                                            <Link key={ item.id } 
                                                to={'/views/products/detail/' + item.id}
                                            >
                                                <img src={ `${ PUBLIC_URL }${ item.bannerPic }` } alt='' title={ item.description } />
                                            </Link>
                                        );
                                    } )
                                }
                            </Carousel>
                        ) : null
                    }
                </div>
                <Recommend {...this.props} />
            </div>
        );
    }
}

export default CarouselBox;