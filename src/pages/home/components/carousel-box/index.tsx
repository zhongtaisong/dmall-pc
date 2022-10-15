import React from 'react';
import { Carousel, } from 'antd';
import { observer } from "mobx-react";
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
                            <Carousel 
                                autoplay
                                effect="fade"
                                dots={{ className: "dm_CarouselBox__dots" }}
                            >
                                {
                                    carouselBoxList.map( item => {
                                        if(!item?.banner_picture) return null;
                                        
                                        return (
                                            <img 
                                                key={ item.id }
                                                onClick={() => window.open(`/views/goods-detail/${ item?.id }`)}
                                                src={ item?.banner_picture } 
                                                alt='大图png' 
                                            />
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