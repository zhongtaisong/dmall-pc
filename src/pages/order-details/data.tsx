import React from 'react';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
// 全局设置
import { PUBLIC_URL } from '@config';

export const columns: ColumnsType<any> = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text, record, index) => <img width='100%' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品详情',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        render: (text, record) => {
            return (
                <div 
                    className='dm_OrderDetails__description' 
                    onClick={() => window.open(`/views/goods-detail/${ record?.id }`)}
                >
                    <span 
                        className='two_line_ellipsis'
                        style={{ 
                            color: 'var(--dm-main-color)',
                            cursor: 'pointer',
                        }}
                    >{ text }</span>
                    <span className='single_line_ellipsis'>规格：{ record?.spec }</span>
                </div>
            );
        }
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        align: 'center',
        render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        width: '10%',
        align: 'center',
        render: (text, record, index) => `x ${text}`
    },
];