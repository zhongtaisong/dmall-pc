import React from 'react';
import { Carousel } from 'antd';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
// url前缀
import { PUBLIC_URL } from '@config';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 大图推广
 */
@observer
class CarouselBox extends React.PureComponent<any, any> {
    render() {
        const { carouselBoxList } = store?.homeStore || {};
        
        return (
            <div className='common_width'>
                <div className='dm_CarouselBox'>
                    {
                        carouselBoxList?.length ? (
                            <Carousel autoplay effect="fade"
                                dots={{ className: "dm_CarouselBox__dots" }}
                            >
                                {
                                    carouselBoxList.map( item => {
                                        return (
                                            <Link key={ item.id } 
                                                to={'/views/goods-detail/' + item.id}
                                            >
                                                <img src={ `${ PUBLIC_URL }${ item.bannerPic }` } alt='' />
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