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
        width: '12%',
        render: (text, record, index) => <img width='100%' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
            return (
                <Link 
                    className='dm_OrderDetails__description' 
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
        width: '15%',
        align: 'center',
        render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
    },
    {
        title: '数量',
        dataIndex: 'buyCount',
        key: 'buyCount',
        width: '15%',
        align: 'center',
        render: (text, record, index) => `x ${text}`
    },
];