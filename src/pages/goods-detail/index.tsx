import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
// 规格
import CommoditySpecification from './components/commodity-specification';
// 详情
import CommodityDetails from './components/commodity-details';
// 数据
import state from './state';
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
        state.selectGoodsDetailFn({ id, });
    }

    componentDidUpdate(prevProps: Readonly<Partial<RouteComponentProps<IComponentProps, StaticContext, unknown>>>, prevState: Readonly<any>, snapshot?: any): void {
        const { id } = this.props?.match?.params || {};
        const prevId = prevProps?.match?.params?.id;
        if(id && prevId && id != prevId) {
            state.selectGoodsDetailFn({ id, });
        }
    }

    render() {
        const { goodsInfo } = state;
        if(!goodsInfo || !Object.keys(goodsInfo)) return null;

        return (
            <div className='dm_ProductsDetail'>
                <div className='common_width'>
                    <CommoditySpecification {...this.props} />
                    <CommodityDetails {...this.props} />
                </div>
            </div>
        );
    }
}

export default ProductsDetail;