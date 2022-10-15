import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
// 规格
import CommoditySpecification from './components/commodity-specification';
// 详情
import CommodityDetails from './components/commodity-details';
// mobx数据
import store from '@store';
// 样式
import './index.less';

/**
 * 商品详情
 */
@observer
class ProductsDetail extends React.PureComponent<RouteComponentProps<{
    /** 商品id */
    id: string;
}>, any> {

    componentDidMount() {
        const { id } = this.props?.match?.params || {};
        store.goodsDetailStore.init(Number(id));
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps<{ id: string; }, StaticContext, unknown>>): void {
        const { id } = this.props?.match?.params || {};
        const prevId = prevProps?.match?.params?.id;
        if(id && prevId && id != prevId) {
            store.goodsDetailStore.init(Number(id));
        }
    }

    render() {
        const { goodsInfo } = store?.goodsDetailStore || {};
        if(!goodsInfo || !Object.keys(goodsInfo)) return null;

        return (
            <div className='dm_ProductsDetail'>
                <div className='common_width'>
                    <CommoditySpecification />
                    <CommodityDetails />
                </div>
            </div>
        );
    }
}

export default ProductsDetail;