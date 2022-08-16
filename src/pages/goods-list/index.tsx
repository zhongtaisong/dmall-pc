import React from 'react';
import { Button, InputNumber, Pagination, Tag, Empty } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// 样式
import './index.less';
import { StaticContext } from 'react-router';

interface IComponentPros {
    /**
     * 搜索关键字
     */
    keyword?: string;
}

interface IComponentState {
    /**
     * 当前选中的筛选条件
     */
    filterParams: {
        [key: string]: string | number;
    };

    [key: string]: any;
}

/**
 * 杂货铺
 */
@observer
class GoodsList extends React.PureComponent<RouteComponentProps<IComponentPros>, IComponentState> {

    constructor(props: RouteComponentProps<IComponentPros>) {
        super(props);
        this.state = {
            filterParams: {},
            numObj: {},
        };
    }

    componentDidMount() {
        const { keyword } = this.props?.match?.params || {};
        const { filterParams } = this.state;

        state.selectGoodsListFn({
            current: 0,
            keyword: keyword?.trim?.(),
            filterParams,
        });
        state.selectGoodsListfilterParamsFn();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ keyword?: string; }, StaticContext, unknown>>): void {
        const { keyword } = this.props?.match?.params || {};
        if(keyword !== prevProps?.match?.params?.keyword) {
            state.selectGoodsListFn({
                current: 0,
                keyword: keyword?.trim?.(),
            });
        }
    }

    // 加入购物车
    handleAddCart = (item, key) => {
        if( Object.keys(item).length ){
            let num = !this.state.numObj[key] ? 1 : this.state.numObj[key];
            // commoditySpecificationState.addcartData([{
            //     pid: item.id,
            //     num,
            //     totalprice: Number(item.price) * num
            // }]);
        }
    }

    // 数量
    watchNumber = (key, value) => {
        let { numObj } = this.state;
        numObj[key] = value;
        this.setState({
            numObj
        });
    }

    render() {
        const { current, pageSize, total, filterMap, } = state;
        const { numObj, filterParams, } = this.state;
        const { oauthCode } = $state;

        return (
            <div className='dm_Products'>
                <div className='common_width dm_Products__content'>
                    <div className='dm_Products__content--title'>商品筛选</div>

                    {/* 筛选条件 */}
                    <div className='dm_Products__content--filterList'>
                        {
                            Object.entries(filterMap).map(([key, value]: any) => {
                                key = key === 'brands' ? 'brandId' : key;
                                const filterParams_item = filterParams[key]

                                return (
                                    <div 
                                        className='dm_Products__content--filterList__item'
                                        key={ key }
                                    >
                                        <div className='dm_Products__content--filterList__item--label'>{ 
                                            {
                                                brandId: "品牌",
                                                cpu: "处理器",
                                                disk: "硬盘容量",
                                                memory: "内存容量",
                                                screenSize: "屏幕尺寸",
                                                systems: "系统",
                                                thickness: "厚度",
                                            }[key] 
                                        }: </div>
                                        <div className='dm_Products__content--filterList__item--tag'>
                                            {
                                                value?.map?.(item => {
                                                    const val = item?.id || item;
                                                    return (
                                                        <Tag.CheckableTag 
                                                            key={ val }
                                                            checked={ filterParams_item === val }
                                                            onChange={() => this.onCheckableTagChange(key, val)}
                                                        >{ item?.brandName || item }</Tag.CheckableTag>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div className='dm_Products__content--filterList__item' >
                            <div className='dm_Products__content--filterList__item--label'>价格: </div>
                            <div className='dm_Products__content--filterList__item--tag'>
                                {
                                    [
                                        "0-3999", "4000-4499", "4500-4999", 
                                        "5000-5499", "5500-5999", "6000-6999", 
                                        "7000以上",
                                    ].map(item => {
                                        const filterParams_item = filterParams['price']
                                        return (
                                            <Tag.CheckableTag 
                                                key={ item }
                                                checked={ filterParams_item === item }
                                                onChange={() => this.onCheckableTagChange('price', item)}
                                            >{ item }</Tag.CheckableTag>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* 商品列表 */}
                    { this.renderGoodsList() }

                    <Pagination 
                        current={ current + 1 }
                        pageSize={ pageSize }
                        total={ total } 
                        pageSizeOptions={[8, 16, 32, 64, 100]}
                        onChange={(page, pageSize) => {
                            state.selectGoodsListFn({
                                current: page - 1,
                                pageSize,
                            });
                        }} 
                        showTotal={ total => `共 ${total} 条` }
                    />
                </div>
            </div>
        );
    }

    /**
     * 监听 - CheckableTag变化
     * @param key 
     * @param value 
     */
    onCheckableTagChange = (key: string, value: string) => {
        let { filterParams } = this.state;
        if(!filterParams || !Object.keys(filterParams).length) {
            filterParams = {};
        }

        if(filterParams[key] === value) {
            delete filterParams[key];
        }else {
            filterParams[key] = value;
        }

        this.setState({ filterParams }, () => {
            state.selectGoodsListFn({
                current: 0,
                filterParams,
            });
        });
    }

    /**
     * 渲染 - 商品列表 - 组件
     * @returns 
     */
    renderGoodsList = () => {
        const { dataSource } = state;
        if(!Array.isArray(dataSource) || !dataSource?.length) {
            return (
                <div className='dm_Products__content--empty'>
                    <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
                </div>
            );
        }

        return (
            <ul className='dm_Products__content--goodsList'>
                {
                    dataSource.map(item => {
                        const price = !Number.isNaN(Number(item?.price)) ? Number(item.price).toFixed(2) : 0.00;
                        return (
                            <li 
                                key={ item?.id }
                                className='dm_Products__content--goodsList__item'
                            >
                                <img src={ `${ PUBLIC_URL }${ item.mainPicture }` } alt="商品图片" 
                                    onClick={() => this.props?.history?.push?.(`/views/goods/detail/${ item?.id }`)}
                                />
                                <div className='dm_Products__content--goodsList__item--text'>
                                    <div className='dm_Products__content--goodsList__item--text__title'>
                                        <Link to={`/views/goods/detail/${ item?.id }`}>{ item.productName }</Link>
                                        <div className='two_line_ellipsis'>{ item.description }</div>
                                    </div>
                                    <div className='dm_Products__content--goodsList__item--text__price'>
                                        <span>￥</span>
                                        <p>{  price }</p>
                                    </div>
                                    <div className='dm_Products__content--goodsList__item--text__add'>
                                        <Button 
                                            type="primary"
                                            size="small"
                                            ghost
                                        >+采购</Button>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

}

export default GoodsList;