import React from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
// 商品信息 - 组件
import GoodsInfo from '../goods-info';
// 商品评价 - 组件
import CommodityEvaluation from '../commodity-evaluation';
// mobx数据
import store from '@store';
// less样式
import './index.less';


/**
 * 商品介绍、商品评价
 */
@observer
class CommodityDetails extends React.PureComponent<{
    /**
     * 商品id
     */
    id: string;
}, any> {

    render() {
        return (
            <div className='commodity_details'>
                <Tabs 
                    type="card"
                    className='commodity_details__tabs'
                    onChange={ this.onTabsChange }
                >
                    <Tabs.TabPane 
                        tab="商品信息" 
                        key="1"
                    >
                        {/* 商品信息 - 组件 */}
                        <GoodsInfo />
                    </Tabs.TabPane>
                    <Tabs.TabPane 
                        tab="评价" 
                        key="2"
                    >
                        {/* 商品评价 - 组件 */}
                        <CommodityEvaluation />
                    </Tabs.TabPane>
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
            const { id } = this.props || {};
            store.goodsDetailStore.goodsEvaluateSelectServiceFn({ id });
        }
    }

}

export default CommodityDetails;