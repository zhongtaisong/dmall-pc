import React from 'react';
import { observer } from 'mobx-react';
import { InputNumber, Button, Image, } from 'antd';
import { HeartFilled, HeartOutlined, } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { history } from '@utils';
// 设置
import { PUBLIC_URL } from '@config';
// mobx数据
import store from '@store';
// less样式
import './index.less';

interface IComponentState {
    /** 大主图索引 */
    imageIndex: number;
    /** 购买数量 */
    buyCount: number;
}

/**
 * 主图、商品规格
 */
@observer
class CommoditySpecification extends React.PureComponent<RouteComponentProps<{
    /** 商品id */
    id: string;
}>, IComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
            buyCount: 1,
        };
    }

    render() {
        const { 
            goodsInfo, isGoodsCollection, 
            shoppingCartAddServiceFn, 
        } = store?.goodsDetailStore || {};
        const { imageIndex, buyCount, } = this.state;
        const { id } = this.props?.match?.params || {};
        const _id = Number(id);
        const bigImgUrl = goodsInfo?.images?.[imageIndex];

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
                                                    className={ `single_line_ellipsis${ item?.id === _id ? ' dm_commoditySpecification__right--row__specs--item' : '' }` }
                                                    onClick={() => history.push(`/views/goods-detail/${ item?.id }`)}
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
                            value={ buyCount } 
                            precision={ 0 }
                            onChange={(val) => this.setState({ buyCount: val, })}
                        />
                    </div>

                    <div className='dm_commoditySpecification__right--row'>
                        <span></span>
                        <div className='dm_commoditySpecification__right--row__btn'>
                            <Button 
                                type="primary" 
                                size='large' 
                            >立即购买</Button>
                            <Button 
                                type="primary" 
                                size='large' 
                                ghost 
                                onClick={() => shoppingCartAddServiceFn?.([{
                                    pid: _id,
                                    num: buyCount,
                                }])}
                            >加入购物车</Button>
                        </div>
                        <div className='dm_commoditySpecification__right--row__collection'
                            onClick={() => this.onGoodsCollectionClick([_id])}
                        >
                            { isGoodsCollection ? <HeartFilled style={{ color: "var(--dm-main-color)", }} /> : <HeartOutlined /> }
                            <div>{ isGoodsCollection ? '已' : '' }收藏</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 加入收藏、取消收藏 - 操作
     * @param pids 
     * @returns 
     */
    onGoodsCollectionClick = (pids: Array<number>) => {
        if(!Array.isArray(pids) || !pids.length) return;

        const { isGoodsCollection, } = store?.goodsDetailStore || {};
        if(!isGoodsCollection) {
            store.goodsDetailStore.goodsCollectionAddServiceFn(pids)
        }else {
            store.goodsDetailStore.goodsCollectionDeleteServiceFn(pids)
        }
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

export default withRouter(CommoditySpecification);