import React from 'react';
import { InputNumber, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import lodash from 'lodash';
// mobx数据
import store from '@store';

export const columns: ColumnsType<any> = [
    {
        title: '图片',
        dataIndex: 'main_picture',
        key: 'main_picture',
        align: 'center',
        width: '10%',
        render: (text, record) => {
            if(!record?.goodsInfo?.main_picture) return '-';

            return (
                <img 
                    style={{ width: '100%', }} 
                    src={ record?.goodsInfo?.main_picture } 
                    alt="图片"
                />
            );
        },
    },
    {
        title: '商品详情',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        render: (text, record) => {
            return (
                <div 
                    className='dm_MyCollection__columns--description' 
                    onClick={() => window.open(`/views/goods-detail/${ record?.goodsInfo?.id }`)}
                >
                    <span 
                        className='two_line_ellipsis'
                        style={{ 
                            color: 'var(--dm-main-color)',
                            cursor: 'pointer',
                        }}
                    >{ record?.goodsInfo?.description }</span>
                    <span className='single_line_ellipsis'>规格：{ record?.goodsInfo?.spec }</span>
                </div>
            );
        }
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '10%',
        render: (text, record) => {
            return `￥${ Number(record?.goodsInfo?.price || 0)?.toFixed?.(2) || "0.00" }`;
        },
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        width: '14%',
        render: (text, record, index) => {
            if(typeof text !== 'number') return null;

            return (
                <InputNumber 
                    key={ record?.update_time }
                    min={ 1 } 
                    max={ 99 } 
                    defaultValue={ text }
                    precision={ 0 }
                    onChange={lodash.debounce((val) => store.shoppingCartStore.onInputNumberChange(val, index), 360)}
                />
            );
        }
    },
    {
        title: '小计',
        dataIndex: 'totalprice',
        key: 'totalprice',
        align: 'center',
        width: '14%',
        render: (text, record) => {
            return `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`;
        },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '14%',
        render: (text, record, index) => {
            return (              
                <div className='operation-btn'>
                    <Popconfirm
                        title="你确定要删除这条数据？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {
                            store.shoppingCartStore.shoppingCartDeleteServiceFn([record?.goodsInfo?.id]);
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <span>删除</span>
                    </Popconfirm>
                    <span onClick={() => {
                        store.shoppingCartStore.goodsCollectionAddServiceFn([record?.goodsInfo?.id]);
                    }}>加入收藏</span>
                </div>
            );
        }
    }
];