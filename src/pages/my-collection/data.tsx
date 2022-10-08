import React from 'react';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
// 全局设置
import { PUBLIC_URL } from '@config';
// mobx数据
import store from '@store';

export const columns: ColumnsType<any> = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text, record) => {
            if(!record?.goodsInfo?.mainPicture) return '-';

            return (
                <img 
                    style={{ width: '100%', }} 
                    src={ `${ PUBLIC_URL }${ record?.goodsInfo?.mainPicture }` } 
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
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '14%',
        render: (text, record) => {
            return (
                <div className='operation-btn'>
                    <Popconfirm
                        title="你确定要删除这条数据？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {
                            store.myCollectionStore.goodsCollectionDeleteServiceFn([record?.goodsInfo?.id]);
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <span>删除</span>
                    </Popconfirm>
                    <span onClick={() => {
                        store.myCollectionStore.shoppingCartAddServiceFn([{
                            pid: record?.pid,
                            num: 1,
                        }]);
                    }}>加入购物车</span>
                </div>
            );
        }
    }
];
