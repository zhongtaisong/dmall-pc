import React from 'react';
import { Row, Col } from 'antd';
import { observer } from "mobx-react";
import Slider from "react-slick";
import { toJS } from 'mobx';
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 单品推广
@observer
class Recommend extends React.Component<any, any> {

    // 跳转到商品详情
    watchProductDetails = (id) => {
        id && this.props.history.push(`/views/products/detail/${id}`);
    }

    render() {
        const { productsList } = state;
        const settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToScroll: 1,
            slidesToShow: 3
        };
        if(!toJS(productsList).length) return null;

        return (
            <Row className='dm_recommend'>
                <Slider {...settings}>
                    {
                        toJS( productsList ).map( item => {
                            return (
                                <Col span={ 8 } key={ item.id } onClick={ this.watchProductDetails.bind(this, item.id) }>
                                    <img src={  PUBLIC_URL + item.mainPicture } draggable="false" />
                                    <div>
                                        <span className='title' title={ item.productName }>{ item.productName }</span>
                                        <span className='description' title={ item.description }>{ item.description }</span>
                                    </div>
                                </Col>
                            );
                        } )
                    }
                </Slider>
            </Row>
        );
    }
}

export default Recommend;