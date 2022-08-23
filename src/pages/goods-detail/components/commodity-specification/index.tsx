import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, InputNumber, Button, Tooltip, Image, } from 'antd';
// 设置
import { PUBLIC_URL } from '@config';
// 页面组件 - 数据
import pageState from './../../state';
// 当前组件数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';
const { Title, Paragraph } = Typography;

interface IComponentState {
    /**
     * 大主图索引
     */
    imageIndex: number;
}

/**
 * 主图、商品规格
 */
@observer
class CommoditySpecification extends React.PureComponent<Partial<RouteComponentProps<{
    /**
     * 商品id
     */
    id: string;
}>>, IComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
        };
    }

    // 选择预览图片
    // handleTogglePic = (index) => {
    //     this.setState(() => ({
    //         actionIndex: index
    //     }));
    // }

    // // 选择规格
    // handleToggleSpecs = (id) => {
    //     if( id ){
    //         this.props.history.push(`/views/goods-detail/${id}`);
    //         this.setState(() => ({
    //             num: 1,
    //             actionIndex: 0
    //         }));
    //     }
    // }

    // // 数量
    // watchNumber = (value) => {
    //     this.setState(() => ({
    //         num: value
    //     }));
    // }

    // // 加入购物车
    // handleAddCart = () => {
    //     const { basicInfo } = this.props;
    //     if( basicInfo ){
    //         state.addcartData([{
    //             pid: basicInfo.id,
    //             num: this.state.num,
    //             totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
    //         }]);
    //     }
    // }

    // // 立即购买
    // immediatePurchase = () => {
    //     let { basicInfo={} } = this.props;
    //     const { id } = basicInfo;
    //     id && this.props.history.push({
    //         pathname: '/views/goods/cart/settlement',
    //         state: {
    //             id: [id],
    //             num: this.state.num,
    //             type: 'detail'
    //         }
    //     });
    // }

    render() {
        const { goodsInfo } = pageState;
        const { imageIndex } = this.state;
        const { id } = this.props?.match?.params || {};
        const { oauthCode } = $state;
        const bigImgUrl = goodsInfo?.images?.[imageIndex];
        console.log('7777777', id)

        return (
            <div className='dm_commoditySpecification'>
                <div className='dm_commoditySpecification__left'>
                    {
                        bigImgUrl ? (
                            <Image 
                                className='dm_commoditySpecification__left--bigImg'
                                src={ `${ PUBLIC_URL }${ bigImgUrl}` } 
                                alt="大主图" 
                            />
                        ) : null
                    }
                    <div className='dm_commoditySpecification__left--smallImg'>
                        {
                            goodsInfo?.images?.map?.((item, index) => {
                                return (
                                    <Image 
                                        key={ item }
                                        rootClassName={ imageIndex === index  ? 'dm_commoditySpecification__left--smallImg__item' : '' }
                                        preview={ false } 
                                        src={ `${ PUBLIC_URL }${ item}` } 
                                        alt="小主图" 
                                        onClick={() => this.onPreviewClick(index)}
                                    />
                                );
                            })
                        }
                    </div>
                </div>

                <div className='dm_commoditySpecification__right'>
                    {
                        goodsInfo?.description ? (
                            <div className='dm_commoditySpecification__right--title'>{ goodsInfo?.description }</div>
                        ) : null
                    }
                    {
                        goodsInfo?.copywriting ? (
                            <div className='dm_commoditySpecification__right--subTitle'>{ goodsInfo?.copywriting }</div>
                        ) : null
                    }

                    <div className='dm_commoditySpecification__right--row'>
                        <span>售价：</span>
                        <div className='dm_commoditySpecification__right--row__price'>
                            <span>￥</span>
                            <p>{ Number?.(goodsInfo?.price)?.toFixed?.(2) || "0.00" }</p>
                        </div>
                    </div>

                    {
                        goodsInfo?.specs?.length ? (
                            <div className='dm_commoditySpecification__right--row'>
                                <span>规格：</span>
                                <div className='dm_commoditySpecification__right--row__specs'>
                                    {
                                        goodsInfo?.specs?.map?.(item => {
                                            return (
                                                <span 
                                                    key={ item?.id }
                                                    className={ `single_line_ellipsis${ item?.id === Number(id) ? ' dm_commoditySpecification__right--row__specs--item' : '' }` }
                                                    onClick={() => this.props.history.push(`/views/goods-detail/${ item?.id }`)}
                                                >{ item?.spec }</span>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        ) : null
                    }

                    <div className='dm_commoditySpecification__right--row'>
                        <span>数量：</span>
                        <InputNumber 
                            className='dm_commoditySpecification__right--row__number'
                            min={ 1 } 
                            max={ 99 } 
                            value={ 1 } 
                            precision={ 0 } 
                            // onChange={ this.watchNumber } 
                        />
                    </div>

                    <div className='dm_commoditySpecification__right--row'>
                        <span></span>
                        <div className='dm_commoditySpecification__right--row__btn'>
                            <Button 
                                type="primary" 
                                size='large' 
                                // onClick={ this.immediatePurchase }
                            >立即购买</Button>
                            <Button 
                                type="primary" 
                                size='large' 
                                ghost 
                                // onClick={ this.handleAddCart }
                            >加入购物车</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 选择将要预览的小主图 - 操作
     * @param index 
     */
    onPreviewClick = (index: number) => {
        if(typeof index !== 'number') return;
        this.setState({ imageIndex: index, });
    }
}

export default CommoditySpecification;