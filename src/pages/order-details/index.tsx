import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 订单详情
 */
@observer
class OrderDetails extends React.PureComponent<RouteComponentProps<{
    /**
     * 订单编号
     */
     ordernum: string;
}>, any> {

    componentDidMount() {
        const { ordernum } = this.props?.match?.params || {};
        state.detailOrdersDataFn(ordernum);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { ordernum } = this.props?.match?.params || {};
        const prevOrdernum = prevProps?.match?.params?.id;
        if(ordernum && prevOrdernum && ordernum !== prevOrdernum) {
            state.detailOrdersDataFn(ordernum);
        }
    }

    render() {
        const { dataSource, orderInfo, consignees, } = state;

        return (
            <div className="common_width dm_OrderDetails">
                <div className='dm_OrderDetails__title'>
                    <span>订单详情</span>
                    {
                        orderInfo?.ordernum && (
                            <div>( 订单编号：<i>{ orderInfo?.ordernum }</i> )</div>
                        )
                    }
                </div>

                <Table 
                    columns={ columns } 
                    dataSource={ dataSource }
                    showHeader={ false }
                    pagination={ false }
                    rowKey="id"
                />
                    
                <div className='dm_OrderDetails__bottom'>
                    <div className='dm_OrderDetails__bottom--title'>订单信息</div>
                    <div className='dm_OrderDetails__bottom--list'>
                        <div className='dm_OrderDetails__bottom--list__item'>
                            <div>收货地址：</div>
                            <ul>
                                <li>{ consignees?.name }</li>
                                <li>{ consignees?.phone }</li>
                                <li>{ consignees?.region }{ consignees?.detail }</li>
                            </ul>
                        </div>
                        <div className='dm_OrderDetails__bottom--list__item'>
                            <div>付款时间：</div>
                            <span>{ orderInfo?.submitTime || '-' }</span>
                        </div>
                        <div className='dm_OrderDetails__bottom--list__item'>
                            <div>商品总数：</div>
                            <span>{ orderInfo?.num || 0 }</span>
                        </div>
                        <div className='dm_OrderDetails__bottom--list__item'>
                            <div>商品总额：</div>
                            <span>￥{ Number?.(orderInfo?.totalprice || 0)?.toFixed?.(2) || 0.00 }</span>
                        </div>
                        <div className='dm_OrderDetails__bottom--list__item'>
                            <div>支付金额：</div>
                            <span>￥{ Number?.(orderInfo?.totalprice || 0)?.toFixed?.(2) || 0.00 }</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetails;