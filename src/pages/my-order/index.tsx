import React from 'react';
import { observer } from 'mobx-react';
import { Table, Popconfirm, Pagination } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
// 各种表头
import { columns } from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 我的订单
 */
@observer
class MyOrder extends React.PureComponent<any, any> {

    componentDidMount() {
        store.myOrderStore.orderSelectServiceFn({
            current: 0,
        });
    }
    
    render() {
        const { dataSource, total, } = store?.myOrderStore || {};

        return (
            <div className='common_width dm_MyOrder'>
                <div className='dm_MyOrder__title'>
                    <span>我的订单</span>
                    <div>( 共有 <i>{ total }</i> 笔订单 )</div>
                </div>

                {/* 表头 */}
                <Table 
                    className={ dataSource?.length ? 'dm_MyOrder__columns' : '' }
                    columns={ columns() } 
                    dataSource={[]} 
                    pagination={ false }
                    bordered
                    size='middle'
                />
                {
                    dataSource.map(item => {
                        return (
                            <div 
                                key={ item?.order_id }
                                style={{ marginBottom: '20px' }} 
                            >
                                <Table 
                                    columns={ columns(item?.goods_infos?.length ?? 0) } 
                                    dataSource={ item?.goods_infos || [] } 
                                    pagination={ false }
                                    showHeader={ false }
                                    bordered
                                    size='middle'
                                    title={() => {
                                        return (
                                            <div className='dm_MyOrder__table'>
                                                <div className='dm_MyOrder__table--left'>
                                                    <span>订单编号：{ item?.order_no }</span>
                                                    <span>下单时间：{ item?.create_time }</span>
                                                </div>

                                                <div className='dm_MyOrder__table--right'>
                                                    <Popconfirm
                                                        title="你确定要删除这条数据？"
                                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                        onConfirm={() => store.myOrderStore.orderDeleteServiceFn(item?.id)}
                                                        okText="是"
                                                        cancelText="否"
                                                    >
                                                        <DeleteOutlined />
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        );
                                    }}
                                    rowKey="id"
                                />
                            </div>
                        );
                    })
                }

                {
                    dataSource?.length ? (
                        <div className='dm_MyOrder__pagination'>
                            <Pagination
                                showSizeChanger
                                total={ total }
                                showTotal={total => `共 ${ total } 条`}
                                onChange={
                                    (current, pageSize) => {
                                        store.myOrderStore.orderSelectServiceFn({
                                            current: current - 1,
                                            pageSize,
                                        });
                                    }
                                }
                            />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default MyOrder;