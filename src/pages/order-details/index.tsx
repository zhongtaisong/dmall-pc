import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { columns } from './data';
// mobx数据
import store from '@store';
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
     order_no: string;
}>, any> {

    componentDidMount() {
        const { order_no } = this.props?.match?.params || {};
        store.orderDetailsStore.orderSelectDetailServiceFn(order_no);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { order_no } = this.props?.match?.params || {};
        const prevOrdernum = prevProps?.match?.params?.id;
        if(order_no && prevOrdernum && order_no !== prevOrdernum) {
            store.orderDetailsStore.orderSelectDetailServiceFn(order_no);
        }
    }

    render() {
        const { dataSource, orderInfo, consignees, } = store?.orderDetailsStore || {};

        return (
            <div className="common_width dm_OrderDetails">
                <div className='dm_OrderDetails__title'>
                    <span>订单详情</span>
                    {
                        orderInfo?.order_no && (
                            <div>( 订单编号：<i>{ orderInfo?.order_no }</i> )</div>
                        )
                    }
                </div>

                <Table 
                    columns={ columns } 
                    dataSource={ dataSource }
                    pagination={ false }
                    bordered
                    rowKey="id"
                    footer={() => {
                        return (
                            <div className='dm_OrderDetails__bottom'>
                                <div className='dm_OrderDetails__bottom--title'>订单信息</div>
                                <div className='dm_OrderDetails__bottom--list'>
                                    <div className='dm_OrderDetails__bottom--list__item'>
                                        <div>
                                            <div>收货人：</div>
                                            <span>{ consignees?.name || '-' }</span>
                                        </div>
                                        <div>
                                            <div>联系电话：</div>
                                            <span>{ consignees?.phone || '-' }</span>
                                        </div>
                                        <div>
                                            <div>收货地址：</div>
                                            <span>{ consignees?.address || '-' }</span>
                                        </div>
                                    </div>

                                    <div className='dm_OrderDetails__bottom--list__item'>
                                        <div>
                                            <div>下单时间：</div>
                                            <span>{ orderInfo?.create_time || '-' }</span>
                                        </div>
                                        <div>
                                            <div>商品件数：</div>
                                            <span>共 { orderInfo?.total_num || 0 } 件</span>
                                        </div>
                                        <div>
                                            <div>合计：</div>
                                            <span 
                                                className='dm_OrderDetails__bottom--list__item--totalPrice'
                                            >￥{ Number?.(orderInfo?.total_price || 0)?.toFixed?.(2) || 0.00 }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default OrderDetails;