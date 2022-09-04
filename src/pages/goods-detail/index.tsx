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

interface IComponentProps {
    /**
     * 商品id
     */
    id: string;
}

/**
 * 商品详情
 */
@observer
class ProductsDetail extends React.PureComponent<Partial<RouteComponentProps<IComponentProps>>, any> {

    componentDidMount() {
        const { id } = this.props?.match?.params || {};
        store.goodsDetailStore.goodsDetailSelectServiceFn({ id, });
    }

    componentDidUpdate(prevProps: Readonly<Partial<RouteComponentProps<IComponentProps, StaticContext, unknown>>>, prevState: Readonly<any>, snapshot?: any): void {
        const { id } = this.props?.match?.params || {};
        const prevId = prevProps?.match?.params?.id;
        if(id && prevId && id != prevId) {
            store.goodsDetailStore.goodsDetailSelectServiceFn({ id, });
        }
    }

    render() {
        const { goodsInfo } = store?.goodsDetailStore || {};
        const { id } = this.props?.match?.params || {};
        if(!goodsInfo || !Object.keys(goodsInfo)) return null;

        return (
            <div className='dm_ProductsDetail'>
                <div className='common_width'>
                    <CommoditySpecification id={ id } />
                    <CommodityDetails id={ id } />
                </div>
            </div>
        );
    }
}

export default ProductsDetail;