import React from 'react';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/lib/table';
// 全局设置
import { PUBLIC_URL } from '@config';

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
                <Link 
                    className='dm_MyCollection__columns--description' 
                    to={ `/views/goods-detail/${ record?.goodsInfo?.id }` }
                >
                    <span className='two_line_ellipsis'>{ record?.goodsInfo?.description }</span>
                    <span className='single_line_ellipsis'>规格：{ record?.goodsInfo?.spec }</span>
                </Link>
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
        width: '10%',
        render: (text) => `x ${text}`
    }
];