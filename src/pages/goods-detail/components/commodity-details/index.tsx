import React from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
// 商品信息 - 组件
import GoodsInfo from '../goods-info';
// 商品评价 - 组件
import CommodityEvaluation from '../commodity-evaluation';
// 页面组件 - 数据
import pageState from './../../state';
// less样式
import './index.less';
const { TabPane } = Tabs;


/**
 * 商品介绍、商品评价
 */
@observer
class CommodityDetails extends React.PureComponent<Partial<RouteComponentProps<{
    /**
     * 商品id
     */
    id: string;
}>>, any> {

    render() {
        // const { params, detailsPic } = this.props;
        // const { key } = this.state;
        const { id } = this.props?.match?.params || {};

        return (
            <div className='commodity_details'>
                <Tabs 
                    type="card"
                    className='commodity_details__tabs'
                    onChange={ this.onTabsChange }
                >
                    <TabPane 
                        tab="商品信息" 
                        key="1"
                    >
                        {/* 商品信息 - 组件 */}
                        <GoodsInfo />
                    </TabPane>
                    <TabPane 
                        tab="评价" 
                        key="2"
                    >
                        {/* 商品评价 - 组件 */}
                        <CommodityEvaluation />
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    /**
     * 监听 - Tabs变化
     * @param activeKey 
     */
    onTabsChange = (activeKey) => {
        if(activeKey === "2") {
            const { id } = this.props?.match?.params || {};
            pageState.selectGoodsEvaluateFn({ id });
        }
    }

}

export default CommodityDetails;