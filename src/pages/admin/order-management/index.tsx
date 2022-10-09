import React from 'react';
import { Table, Popconfirm } from 'antd';
import { observer } from 'mobx-react';
import { IOrderInfo } from '@store/admin/order-management/type';
// mobx数据
import store from '@store';

/**
 * 品牌管理
 */
@observer
class OrderManagement extends React.PureComponent<any, any> {

    componentDidMount() {
        store.orderManagementStore.adminOrderSelectServiceFn();
    }

    render() {
        const { dataSource, total, } = store?.orderManagementStore || {};

        return (
            <div className='common_width'>
                <Table 
                    dataSource={ dataSource }
                    bordered
                    rowKey='order_id'
                    pagination={{
                        showSizeChanger: true,
                        total,
                        onChange: (page: number, pageSize: number) => {
                            store.orderManagementStore.adminOrderSelectServiceFn({
                                current: page - 1,
                                pageSize,
                            });
                        },
                        showTotal: total => `共 ${total} 条`,
                    }}
                >
                    <Table.Column 
                        title="序号" 
                        dataIndex="index" 
                        key="index" 
                        align='center'
                        width='6%'
                        render={(text, record, index) => `${index+1}`}
                    />

                    <Table.Column 
                        title="用户名" 
                        dataIndex="uname" 
                        key="uname" 
                        align='center'
                    />

                    <Table.Column 
                        title="订单编号" 
                        dataIndex="order_no" 
                        key="order_no" 
                        align='center'
                        width='18%'
                    />

                    <Table.Column 
                        title="购买数量" 
                        dataIndex="num" 
                        key="num" 
                        align='center'
                        width='10%'
                    />

                    <Table.Column 
                        title="合计" 
                        dataIndex="total_price" 
                        key="total_price" 
                        align='center'
                        width='16%'
                        render={text => {
                            return `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`;
                        }}
                    />

                    <Table.Column 
                        title="生成订单时间" 
                        dataIndex="create_time" 
                        key="create_time" 
                        align='center'
                        width='18%'
                    />

                    <Table.Column 
                        title="操作" 
                        dataIndex="operation" 
                        key="operation" 
                        align='center'
                        width='12%'
                        render={(text, record: IOrderInfo, index) => {
                            return (
                                <div className='operation-btn'>
                                    <span
                                        onClick={() => {
                                            window.open(`/views/order-details/${ record?.order_no }`);
                                        }}
                                    >详情</span>
                                    <Popconfirm title="你确定要删除？"
                                        onConfirm={() => {
                                            store.orderManagementStore.orderDeleteServiceFn(record?.order_id);
                                        }}
                                    >
                                        <span>删除</span>
                                    </Popconfirm>
                                </div>
                            );
                        }}
                    />
                </Table>
            </div>
        );
    }
}

export default OrderManagement;