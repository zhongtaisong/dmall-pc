import React from 'react';
import { Carousel } from 'antd';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { toJS } from 'mobx';
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 大图推广
 */
@observer
class CarouselBox extends React.PureComponent<any, any> {

    componentDidMount() {
        state.selectLargeScalePromotionFn();
    }

    render() {
        const { dataSource } = state;
        
        return (
            <div className='common_width'>
                <div className='dm_CarouselBox'>
                    {
                        dataSource.length ? (
                            <Carousel autoplay effect="fade"
                                dots={{ className: "dm_CarouselBox__dots" }}
                            >
                                {
                                    dataSource.map( item => {
                                        return (
                                            <Link key={ item.id } 
                                                to={'/views/goods-detail/' + item.id}
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
            </div>
        );
    }
}

export default CarouselBox;