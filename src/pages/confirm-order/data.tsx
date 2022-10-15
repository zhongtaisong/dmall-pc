import React from 'react';
import type { ColumnsType } from 'antd/lib/table';

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
        width: '10%',
        render: (text) => `x ${text}`
    }
];