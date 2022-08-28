import React from 'react';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';

export const columns: ColumnsType<any> = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text) => <img style={{ width: '100%', }} src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品详情',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        render: (text, record) => {
            return (
                <Link 
                    className='dm_MyOrder__columns--description' 
                    to={ `/views/goods-detail/${ record?.id }` }
                >
                    <span className='two_line_ellipsis' title={ text }>{ text }</span>
                    <span className='single_line_ellipsis'>规格：{ record?.spec }</span>
                </Link>
            );
        }
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '16%',
        render: (text) => `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '148px',
        render: (text, record) => {
            return (
                <div className='operation-btn'>
                    <Popconfirm
                        title="你确定要删除这条数据？"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {
                            state.delcartData( [record.id] );
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <span>删除</span>
                    </Popconfirm>
                    <span onClick={() => {
                        state.addcolsData( [ record.id ]);
                    }}>加入购物车</span>
                </div>
            );
        }
    }
];
